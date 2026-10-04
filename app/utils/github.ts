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

export interface SearchIssueItem {
  number: number
  title: string
  html_url: string
  repository_url: string
  updated_at?: string
  closed_at?: string | null
  created_at?: string
}

function byActivity(a: ContributionSummary, b: ContributionSummary) {
  return b.prCount - a.prCount || new Date(b.lastPrUpdatedAt).getTime() - new Date(a.lastPrUpdatedAt).getTime()
}

/** Groups merged PRs by repository, skipping the user's own repos, most active first */
export function summarizeContributions(items: SearchIssueItem[], username: string) {
  const summaryMap = new Map<string, ContributionSummary>()

  for (const item of items) {
    const repoFullName = item.repository_url.replace('https://api.github.com/repos/', '')
    const [owner] = repoFullName.split('/')
    if (owner?.toLowerCase() === username.toLowerCase()) continue

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

  return Array.from(summaryMap.values()).sort(byActivity)
}

/** Final order once star counts are known: PRs, then stars, then recency */
export function rankContributions(summaries: ContributionSummary[], stars: Map<string, number>, limit: number) {
  return summaries
    .map(summary => ({ ...summary, stars: stars.get(summary.repoFullName.toLowerCase()) ?? 0 }))
    .sort((a, b) => b.prCount - a.prCount || b.stars - a.stars || byActivity(a, b))
    .slice(0, limit)
}

/** Search queries are capped at 256 characters, so `repo:` qualifiers are split into batches that fit */
export function batchRepoQueries(repoFullNames: string[], maxLength = 256) {
  const batches: string[][] = []
  for (const name of repoFullNames) {
    const last = batches.at(-1)
    if (last && [...last, name].map(n => `repo:${n}`).join(' ').length <= maxLength) last.push(name)
    else batches.push([name])
  }
  return batches.map(batch => batch.map(n => `repo:${n}`).join(' '))
}

export type ContributionLevel = 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'

export interface ContributionDay {
  date: string
  contributionCount: number
  contributionLevel: ContributionLevel
}

export interface RepositoryLanguages {
  languages: {
    edges: { size: number, node: { name: string, color: string | null } }[]
  }
}

/** Name of the bucket for the smaller languages, translated where it's shown */
export const OTHER_LANGUAGES = 'Other'

export interface LanguageShare {
  name: string
  color: string
  percent: number
}

/** Longest and current run of days with at least one contribution, days sorted oldest first */
export function getStreaks(days: ContributionDay[]) {
  let longest = 0
  let run = 0
  for (const day of days) {
    run = day.contributionCount > 0 ? run + 1 : 0
    longest = Math.max(longest, run)
  }
  // The build runs early in the morning: an empty today doesn't break the streak yet
  const past = days.at(-1)?.contributionCount === 0 ? days.slice(0, -1) : days
  const lastEmpty = past.findLastIndex(day => day.contributionCount === 0)
  return { longest, current: past.length - lastEmpty - 1 }
}

/**
 * Bytes of code per language summed over all repositories, as rounded percentages.
 * Past `limit` languages the rest is grouped as "Other", so the bar stays readable.
 */
export function aggregateLanguages(repos: RepositoryLanguages[], limit = 7, otherName = OTHER_LANGUAGES): LanguageShare[] {
  const totals = new Map<string, { size: number, color: string }>()
  for (const { node, size } of repos.flatMap(repo => repo.languages.edges)) {
    const entry = totals.get(node.name) ?? { size: 0, color: node.color ?? '#8b8b8b' }
    entry.size += size
    totals.set(node.name, entry)
  }

  const sorted = [...totals.entries()].sort(([, a], [, b]) => b.size - a.size)
  const total = sorted.reduce((sum, [, { size }]) => sum + size, 0)
  if (total === 0) return []

  const shares = sorted.slice(0, limit).map(([name, { size, color }]) => ({ name, color, size }))
  const otherSize = sorted.slice(limit).reduce((sum, [, { size }]) => sum + size, 0)
  if (otherSize > 0) shares.push({ name: otherName, color: '#8b8b8b', size: otherSize })

  return shares.map(({ name, color, size }) => ({ name, color, percent: Math.round(size / total * 1000) / 10 }))
}
