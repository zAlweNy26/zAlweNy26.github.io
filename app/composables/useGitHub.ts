export const GITHUB_USERNAME = 'zAlweNy26'

export interface GitHubProfile {
  name: string
  email: string
  location: string
  created_at: string
  followers: number
  following: number
}

export interface GitHubRepository {
  name: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  updated_at: string | null
  languages_url: string
  languages: string[]
}

export interface ContributionSummary {
  repoFullName: string
  repoUrl: string
  prCount: number
  lastPrUpdatedAt: string
  stars: number
  recentPrs: {
    title: string
    url: string
    updated_at: string
  }[]
}

/**
 * The site is prerendered, so these requests run once at build time and the
 * results ship in the page payload. In CI, NUXT_GITHUB_TOKEN lifts the rate limit.
 */
function useGitHubFetch() {
  // The token is server-only config: on the client the data comes from the payload and the key doesn't exist
  const githubToken = import.meta.server ? useRuntimeConfig().githubToken : undefined
  return $fetch.create({
    baseURL: 'https://api.github.com',
    headers: {
      Accept: 'application/vnd.github+json',
      ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
    },
  })
}

const fallbackProfile: GitHubProfile = {
  name: 'Daniele Nicosia',
  email: 'work@danyalwe.me',
  location: 'Cremona, Italy',
  created_at: '2018-07-15T14:43:19Z',
  followers: 0,
  following: 0,
}

export function useGitHubProfile() {
  const github = useGitHubFetch()
  return useAsyncData('profile', async () => {
    const data = await github<Partial<GitHubProfile>>(`/users/${GITHUB_USERNAME}`)
    return {
      ...fallbackProfile,
      created_at: data.created_at || fallbackProfile.created_at,
      followers: data.followers ?? 0,
      following: data.following ?? 0,
      name: data.name || fallbackProfile.name,
      email: data.email || fallbackProfile.email,
      location: data.location || fallbackProfile.location,
    }
  }, {
    default: () => fallbackProfile,
  })
}

export function useGitHubRepos(limit = 6) {
  const github = useGitHubFetch()
  return useAsyncData('repos', async () => {
    const repos = await github<Omit<GitHubRepository, 'languages'>[]>(`/users/${GITHUB_USERNAME}/repos`, {
      query: { type: 'owner', per_page: 100 },
    })
    const top = repos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, limit)
    return Promise.all(top.map(async (repo) => {
      const languages = await github<Record<string, number>>(repo.languages_url)
      return {
        name: repo.name,
        html_url: repo.html_url,
        homepage: repo.homepage,
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
        languages_url: repo.languages_url,
        languages: Object.entries(languages).sort(([, a], [, b]) => b - a).map(([lang]) => lang),
      } satisfies GitHubRepository
    }))
  }, {
    default: () => [] as GitHubRepository[],
  })
}

interface SearchIssueItem {
  number: number
  title: string
  html_url: string
  repository_url: string
  updated_at?: string
  closed_at?: string | null
  created_at?: string
}

/**
 * Star counts for many repos with as few requests as possible: the search API ORs `repo:` qualifiers,
 * so one call covers a whole batch (and it has its own quota, separate from the core API).
 * Errors are not swallowed: a failed lookup fails the build instead of showing 0 stars.
 */
async function getStars(github: ReturnType<typeof useGitHubFetch>, repoFullNames: string[]) {
  // Search queries are capped at 256 characters
  const batches: string[][] = []
  for (const name of repoFullNames) {
    const last = batches.at(-1)
    if (last && [...last, name].map(n => `repo:${n}`).join(' ').length <= 256) last.push(name)
    else batches.push([name])
  }

  const stars = new Map<string, number>()
  await Promise.all(batches.map(async (batch) => {
    const res = await github<{ items: { full_name: string, stargazers_count: number }[] }>('/search/repositories', {
      query: { q: batch.map(n => `repo:${n}`).join(' '), per_page: 100 },
    })
    for (const repo of res.items) stars.set(repo.full_name.toLowerCase(), repo.stargazers_count)
  }))
  return stars
}

export function useGitHubContributions(limit = 6) {
  const github = useGitHubFetch()
  return useAsyncData('contributions', async () => {
    const res = await github<{ items: SearchIssueItem[] }>('/search/issues', {
      query: {
        q: `is:pr is:merged is:public author:${GITHUB_USERNAME}`,
        per_page: 100,
        sort: 'updated',
        order: 'desc',
      },
    })

    const summaryMap = new Map<string, ContributionSummary>()

    for (const item of res.items) {
      const repoFullName = item.repository_url.replace('https://api.github.com/repos/', '')
      const [owner] = repoFullName.split('/')
      if (owner?.toLowerCase() === GITHUB_USERNAME.toLowerCase()) continue

      const updatedAt = item.updated_at || item.closed_at || item.created_at || new Date().toISOString()
      const summary: ContributionSummary = summaryMap.get(repoFullName) || {
        repoFullName,
        repoUrl: `https://github.com/${repoFullName}`,
        prCount: 0,
        stars: 0,
        lastPrUpdatedAt: updatedAt,
        recentPrs: [],
      }

      summary.prCount += 1
      if (new Date(updatedAt).getTime() > new Date(summary.lastPrUpdatedAt).getTime())
        summary.lastPrUpdatedAt = updatedAt

      if (summary.recentPrs.length < 2) {
        summary.recentPrs.push({
          title: item.title || `PR #${item.number}`,
          url: item.html_url,
          updated_at: updatedAt,
        })
      }

      summaryMap.set(repoFullName, summary)
    }

    const byActivity = (a: ContributionSummary, b: ContributionSummary) =>
      b.prCount - a.prCount || new Date(b.lastPrUpdatedAt).getTime() - new Date(a.lastPrUpdatedAt).getTime()

    const candidates = Array.from(summaryMap.values()).sort(byActivity).slice(0, limit * 2)

    const stars = await getStars(github, candidates.map(c => c.repoFullName))
    const enriched = candidates.map(summary => ({ ...summary, stars: stars.get(summary.repoFullName.toLowerCase()) ?? 0 }))

    return enriched
      .sort((a, b) => b.prCount - a.prCount || b.stars - a.stars || byActivity(a, b))
      .slice(0, limit)
  }, {
    default: () => [] as ContributionSummary[],
  })
}
