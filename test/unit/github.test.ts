import type { SearchIssueItem } from '../../app/utils/github'
import { describe, expect, it } from 'vitest'
import { batchRepoQueries, rankContributions, summarizeContributions } from '../../app/utils/github'

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
