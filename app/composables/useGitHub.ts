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

/**
 * Star counts for many repos with as few requests as possible: the search API ORs `repo:` qualifiers,
 * so one call covers a whole batch (and it has its own quota, separate from the core API).
 * Errors are not swallowed: a failed lookup fails the build instead of showing 0 stars.
 */
async function getStars(github: ReturnType<typeof useGitHubFetch>, repoFullNames: string[]) {
  const stars = new Map<string, number>()
  await Promise.all(batchRepoQueries(repoFullNames).map(async (q) => {
    const res = await github<{ items: { full_name: string, stargazers_count: number }[] }>('/search/repositories', {
      query: { q, per_page: 100 },
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

    const candidates = summarizeContributions(res.items, GITHUB_USERNAME).slice(0, limit * 2)
    const stars = await getStars(github, candidates.map(c => c.repoFullName))
    return rankContributions(candidates, stars, limit)
  }, {
    default: () => [] as ContributionSummary[],
  })
}

const activityQuery = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC, first: 100) {
      nodes { languages(first: 10, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name color } } } }
    }
  }
}`

interface ActivityResponse {
  data?: {
    user: {
      contributionsCollection: { contributionCalendar: { totalContributions: number, weeks: { contributionDays: ContributionDay[] }[] } }
      repositories: { nodes: RepositoryLanguages[] }
    }
  }
  errors?: { message: string }[]
}

export interface GitHubActivity {
  totalContributions: number
  weeks: ContributionDay[][]
  streaks: { longest: number, current: number }
  languages: LanguageShare[]
}

/**
 * Contribution calendar and language breakdown from a single GraphQL request. GraphQL has no
 * anonymous access: without a token (e.g. a local build) the section is left out instead of failing.
 */
export function useGitHubActivity() {
  const github = useGitHubFetch()
  const hasToken = import.meta.server && !!useRuntimeConfig().githubToken
  return useAsyncData('activity', async (): Promise<GitHubActivity | null> => {
    if (!hasToken) return null
    const res = await github<ActivityResponse>('/graphql', {
      method: 'POST',
      body: { query: activityQuery, variables: { login: GITHUB_USERNAME } },
    })
    // GraphQL reports errors with a 200 status
    if (!res.data || res.errors?.length) throw new Error(res.errors?.map(e => e.message).join('; ') || 'Empty GraphQL response')

    const { contributionCalendar } = res.data.user.contributionsCollection
    const weeks = contributionCalendar.weeks.map(week => week.contributionDays)
    return {
      totalContributions: contributionCalendar.totalContributions,
      weeks,
      streaks: getStreaks(weeks.flat()),
      languages: aggregateLanguages(res.data.user.repositories.nodes, 7, OTHER_LANGUAGES),
    }
  }, {
    default: () => null,
  })
}
