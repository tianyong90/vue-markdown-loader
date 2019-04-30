import Config from 'markdown-it-chain'
import LRUCache from 'lru-cache'
import highlight from './lib/highlight'
import { PLUGINS, REQUIRED_PLUGINS } from './lib/constant'
import highlightLines from './lib/highlightLines'
import preWrapperPlugin from './lib/preWrapper'
import lineNumbersPlugin from './lib/lineNumbers'
import containersPlugin from './lib/containers'
// import hoistScriptStylePlugin from './lib/hoist'
// import tocPlugin from './lib/tableOfContents'
import emojiPlugin from 'markdown-it-emoji'
import anchorPlugin from 'markdown-it-anchor'
import hash from 'hash-sum'
import chalk from 'chalk'
import { logger, slugify } from '../utils'

export default (markdown: any = {}) => {
  const { anchor, toc, plugins, lineNumbers, beforeInstantiate, afterInstantiate } = markdown

  // TODO
  // const resolver =

  const config = new Config()

  config.options
    .html(true)
    .highlight(highlight)
    .end()

    .plugin(PLUGINS.EMOJI)
    .use(emojiPlugin)
    .end()

    .plugin(PLUGINS.HIGHLIGHT_LINES)
    .use(highlightLines)
    .end()

    .plugin(PLUGINS.CUSTOM_CONTAINERS)
    .use(preWrapperPlugin)
    .end()

    .plugin(PLUGINS.PRE_WRAPPER)
    .use(containersPlugin)
    .end()

    .plugin(PLUGINS.ANCHOR)
    .use(anchorPlugin, [
      Object.assign(
        {
          slugify,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
        },
        anchor
      ),
    ])
    .end()

  // TODO: TOC
  // .plugin(PLUGINS.TOC)
  // .use(tocPlugin, [toc])
  // .end()

  if (lineNumbers) {
    config
      .plugin(PLUGINS.LINE_NUMBERS)
      .use(lineNumbersPlugin)
      .end()
  }

  beforeInstantiate && beforeInstantiate()

  const md = config.toMd(require('markdown-it'), markdown)

  afterInstantiate && afterInstantiate()

  const parse = md.parse
  const cache = new LRUCache({ max: 1000 })
  md.parse = (src, env) => {
    const key = hash(src + env.relativePath)
    const cached = cache.get(key)
    if (cached) {
      return cached
    } else {
      const tokens = parse.call(md, src, env)
      cache.set(key, tokens)
      return tokens
    }
  }

  dataReturnable(md)

  // TODO:
  md.slugify = slugify

  return md
}

export function dataReturnable(md) {
  // override render to allow custom plugins return data
  const render = md.render
  md.render = (...args) => {
    md.$data = {}
    md.$data.__data_block = {}
    md.$dataBlock = md.$data.__data_block
    const html = render.call(md, ...args)
    return {
      html,
      data: md.$data,
      dataBlockString: toDataBlockString(md.$dataBlock),
    }
  }
}

function toDataBlockString(ob) {
  if (Object.keys(ob).length === 0) {
    return ''
  }
  return `<data>${JSON.stringify(ob)}</data>`
}

export function isRequiredPlugin(plugin) {
  return REQUIRED_PLUGINS.includes(plugin)
}

export function removePlugin(config, plugin) {
  logger.debug(`Built-in markdown-it plugin ${chalk.green(plugin)} was removed.`)
  config.plugins.delete(plugin)
}

export function removeAllBuiltInPlugins(config) {
  Object.keys(PLUGINS).forEach(key => {
    if (!isRequiredPlugin(PLUGINS[key])) {
      removePlugin(config, PLUGINS[key])
    }
  })
}

export { PLUGINS }
