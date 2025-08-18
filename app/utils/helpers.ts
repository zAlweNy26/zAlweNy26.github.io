import type { NuxtApp } from '#app'
import type { CompileContext, Token } from 'micromark-util-types'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import { gfmAutolinkLiteral, gfmAutolinkLiteralHtml } from 'micromark-extension-gfm-autolink-literal'
import { sanitizeUri } from 'micromark-util-sanitize-uri'

function anchorFromToken(this: CompileContext, token: Token, protocol?: string) {
  const url = this.sliceSerialize(token)
  const match = /\[([^\]]+)\]\(([^)]+)\)/.exec(url)
  if (match && match.length === 3) {
    this.tag(`<a href="${sanitizeUri((protocol || '') + match[2])}" target="_blank">`)
    this.raw(this.encode(match[1]!))
    this.tag('</a>')
  }
  else {
    this.tag(`<a href="${sanitizeUri((protocol || '') + url)}" target="_blank">`)
    this.raw(this.encode(url))
    this.tag('</a>')
  }
}

/**
 * A utility object for rendering markdown text.
 */
export const markdown = Object.freeze({
  render: (text: string) => micromark(text, {
    extensions: [gfm(), gfmAutolinkLiteral()],
    htmlExtensions: [gfmHtml(), gfmAutolinkLiteralHtml(), {
      exit: {
        link(token) {
          anchorFromToken.call(this, token)
        },
        literalAutolinkHttp(token) {
          anchorFromToken.call(this, token)
        },
        literalAutolinkEmail(token) {
          anchorFromToken.call(this, token, 'mailto:')
        },
        literalAutolinkWww(token) {
          anchorFromToken.call(this, token, 'http://')
        },
      },
    }],
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
