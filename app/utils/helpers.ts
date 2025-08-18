import type { NuxtApp } from '#app'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'

export const markdown = Object.freeze({
  render: (text: string) => micromark(text, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  }),
})

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
