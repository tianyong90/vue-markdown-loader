import path from 'path'
import { EventEmitter } from 'events'
import { getOptions } from 'loader-utils'
import LRU from 'lru-cache'
import md from './markdown'
import { parseFrontmatter, inferTitle, extractHeaders } from './utils'

const devCache = new LRU({ max: 1000 })

const stringify = src =>
  JSON.stringify(src)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

export default function(src) {
  const isProd = process.env.NODE_ENV === 'production'
  const isServer = this.target === 'node'
  const options = getOptions(this) || {}
  const loader = Object.create(this)
  const { sourceDir, contentCssClass, markdown: markdownOptions } = options
  let markdown = md(markdownOptions)

  // we implement a manual cache here because this loader is chained before
  // vue-loader, and will be applied on the same file multiple times when
  // selecting the individual blocks.
  const file = this.resourcePath
  const { content, data } = parseFrontmatter(src)

  if (!isProd && !isServer) {
    const inferredTitle = inferTitle(data, content)
    const headers = extractHeaders(content, ['h2', 'h3'], markdown)

    const cachedData = devCache.get(file)

    // diff frontmatter and title, since they are not going to be part of the
    // returned component, changes in frontmatter do not trigger proper updates
    if (
      cachedData &&
      (cachedData.inferredTitle !== inferredTitle ||
        JSON.stringify(cachedData.frontmatterData) !== JSON.stringify(data) ||
        headersChanged(cachedData.headers, headers))
    ) {
      // frontmatter changed... need to do a full reload
      frontmatterEmitter.emit('update', file)
    }

    devCache.set(file, {
      headers,
      frontmatterData: data,
      inferredTitle,
    })
  }

  const { html } = markdown.render(content, {
    loader,
    frontmatter: data,
    relativePath: path.resolve(sourceDir, file).replace(/\\/g, '/'),
  })

  if (options.mode === 'raw') {
    return `module.exports = {
      html: ${stringify(html)},
      attributes: ${stringify(data)}
    }`
  } else {
    return `<template>\n` + `<div class="content ${contentCssClass}">${html}</div>\n` + `</template>\n`
  }
}

function headersChanged(a: any[], b: any[]): boolean {
  if (a.length !== b.length) {
    return true
  }
  return a.some((h, i) => h.title !== b[i].title || h.level !== b[i].level)
}

export const frontmatterEmitter = new EventEmitter()
