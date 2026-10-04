import type { NuxtApp } from '#app'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
  .use(rehypeStringify)

export const parseMarkdown = (text: string) => processor.processSync(text).toString()

export function getCachedData(key: string, nuxtApp: NuxtApp) {
  let data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  if (!data) {
    const item = window.localStorage.getItem(`cache:${key}`)
    if (item) {
      try {
        data = JSON.parse(item)
        if (!data) return
      }
      catch (error) {
        console.error(error)
        return
      }
    }
    else return
  }

  const expirationDate = new Date(data.fetchedAt)
  expirationDate.setTime(expirationDate.getTime() + 1000 * 60 * 60) // 1 hour expiration (GitHub API rate limit)
  const isExpired = expirationDate.getTime() < Date.now()
  if (isExpired) {
    window.localStorage.removeItem(`cache:${key}`)
    return
  }

  return data
}

const plural = (n: number, unit: string) => `${n} ${unit}${n !== 1 ? 's' : ''}`

/**
 * Dates in `consts.ts` are parsed as UTC midnight, so format them in UTC
 * to avoid showing the previous month to visitors west of Greenwich.
 */
export function formatMonthYear(date: Date) {
  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', timeZone: 'UTC' })
}

export function getTimeSpan(startDate: Date, endDate?: Date) {
  const end = endDate || new Date()
  const months = (end.getUTCFullYear() - startDate.getUTCFullYear()) * 12 + (end.getUTCMonth() - startDate.getUTCMonth())
  if (months < 1) {
    const days = Math.floor(Math.abs(end.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    return plural(days, 'day')
  }
  if (months < 12) return plural(months, 'month')
  const years = Math.floor(months / 12)
  const remMonths = months % 12
  return remMonths === 0 ? plural(years, 'year') : `${plural(years, 'year')} ${plural(remMonths, 'month')}`
}
