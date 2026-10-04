import type { ContributionDay, RepositoryLanguages, SearchIssueItem } from '../../app/utils/github'
import { describe, expect, it } from 'vitest'
import { aggregateLanguages, batchRepoQueries, getStreaks, rankContributions, summarizeContributions } from '../../app/utils/github'

function pr(repo: string, number: number, updated_at: string): SearchIssueItem {
  return {
    number,
    title: `PR ${number}`,
    html_url: `https://github.com/${repo}/pull/${number}`,
    repository_url: `https://api.github.com/repos/${repo}`,
    updated_at,
  }
}

describe('summarizeContributions', () => {
  const items = [
    pr('nuxt/ui', 1, '2026-05-01T00:00:00Z'),
    pr('zAlweNy26/own-repo', 2, '2026-06-01T00:00:00Z'),
    pr('nuxt/ui', 3, '2026-04-01T00:00:00Z'),
    pr('nuxt/ui', 4, '2026-03-01T00:00:00Z'),
    pr('vuejs/core', 5, '2026-07-01T00:00:00Z'),
  ]

  it('skips the user\'s own repositories, case-insensitively', () => {
    const repos = summarizeContributions(items, 'zalweny26').map(s => s.repoFullName)
    expect(repos).not.toContain('zAlweNy26/own-repo')
  })

  it('groups PRs per repository and keeps the two most recent', () => {
    const ui = summarizeContributions(items, 'zAlweNy26').find(s => s.repoFullName === 'nuxt/ui')!
    expect(ui.prCount).toBe(3)
    expect(ui.recentPrs.map(p => p.title)).toEqual(['PR 1', 'PR 3'])
    expect(ui.lastPrUpdatedAt).toBe('2026-05-01T00:00:00Z')
  })

  it('sorts by PR count, then by recency', () => {
    expect(summarizeContributions(items, 'zAlweNy26').map(s => s.repoFullName)).toEqual(['nuxt/ui', 'vuejs/core'])
  })
})

describe('rankContributions', () => {
  const summaries = summarizeContributions([
    pr('a/one', 1, '2026-01-01T00:00:00Z'),
    pr('b/two', 2, '2026-02-01T00:00:00Z'),
    pr('c/three', 3, '2026-03-01T00:00:00Z'),
  ], 'me')

  it('breaks PR count ties by stars, matching repo names case-insensitively', () => {
    const stars = new Map([['a/one', 50], ['b/two', 900], ['c/three', 10]])
    const ranked = rankContributions(summaries, stars, 3)
    expect(ranked.map(r => [r.repoFullName, r.stars])).toEqual([['b/two', 900], ['a/one', 50], ['c/three', 10]])
  })

  it('applies the limit', () => {
    expect(rankContributions(summaries, new Map(), 2)).toHaveLength(2)
  })
})

describe('batchRepoQueries', () => {
  const names = Array.from({ length: 12 }, (_, i) => `some-organization-${i}/a-fairly-long-repository-name`)

  it('keeps every query within the 256 character limit', () => {
    const queries = batchRepoQueries(names)
    expect(queries.length).toBeGreaterThan(1)
    for (const q of queries) expect(q.length).toBeLessThanOrEqual(256)
  })

  it('includes every repository exactly once', () => {
    const repos = batchRepoQueries(names).flatMap(q => q.split(' ')).map(q => q.replace('repo:', ''))
    expect(repos).toEqual(names)
  })
})

function days(counts: number[]): ContributionDay[] {
  return counts.map((contributionCount, i) => ({
    date: `2026-01-${String(i + 1).padStart(2, '0')}`,
    contributionCount,
    contributionLevel: contributionCount ? 'FIRST_QUARTILE' : 'NONE',
  }))
}

describe('getStreaks', () => {
  it('finds the longest run of active days', () => {
    expect(getStreaks(days([1, 1, 0, 1, 1, 1, 0, 1])).longest).toBe(3)
  })

  it('counts the current streak up to the last day', () => {
    expect(getStreaks(days([0, 1, 1, 1])).current).toBe(3)
  })

  it('doesn\'t break the current streak on an empty last day', () => {
    expect(getStreaks(days([0, 1, 1, 0])).current).toBe(2)
  })

  it('has no current streak after two empty days', () => {
    expect(getStreaks(days([1, 1, 0, 0])).current).toBe(0)
  })

  it('handles a year without gaps or without contributions', () => {
    expect(getStreaks(days([2, 3, 4]))).toEqual({ longest: 3, current: 3 })
    expect(getStreaks(days([0, 0]))).toEqual({ longest: 0, current: 0 })
    expect(getStreaks([])).toEqual({ longest: 0, current: 0 })
  })
})

describe('aggregateLanguages', () => {
  function repo(...languages: [string, number][]): RepositoryLanguages {
    return { languages: { edges: languages.map(([name, size]) => ({ size, node: { name, color: `#${name}` } })) } }
  }

  it('sums sizes across repositories, largest first', () => {
    const shares = aggregateLanguages([repo(['ts', 300], ['css', 100]), repo(['vue', 200], ['ts', 400])])
    expect(shares).toEqual([
      { name: 'ts', color: '#ts', percent: 70 },
      { name: 'vue', color: '#vue', percent: 20 },
      { name: 'css', color: '#css', percent: 10 },
    ])
  })

  it('groups languages past the limit as "Other"', () => {
    const shares = aggregateLanguages([repo(['a', 50], ['b', 30], ['c', 15], ['d', 5])], 2, 'Altro')
    expect(shares.map(s => [s.name, s.percent])).toEqual([['a', 50], ['b', 30], ['Altro', 20]])
  })

  it('falls back to grey for languages without a color', () => {
    const [share] = aggregateLanguages([{ languages: { edges: [{ size: 1, node: { name: 'x', color: null } }] } }])
    expect(share?.color).toBe('#8b8b8b')
  })

  it('returns nothing when there is no code', () => {
    expect(aggregateLanguages([repo()])).toEqual([])
  })
})
