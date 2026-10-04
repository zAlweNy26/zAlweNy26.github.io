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
