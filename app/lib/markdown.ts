import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // The markdown comes from consts.ts (trusted), and the About Me story uses inline HTML for the flag colours
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
  .use(rehypeStringify, { allowDangerousHtml: true })

export const parseMarkdown = (text: string) => processor.processSync(text).toString()
