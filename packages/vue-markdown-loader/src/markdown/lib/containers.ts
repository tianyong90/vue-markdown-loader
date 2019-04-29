import container from 'markdown-it-container'

function createContainer (name: string, defaultTitle: string) {
  return [
    container,
    name,
    {
      render (tokens, idx) {
        const token = tokens[idx]
        const info = token.info
          .trim()
          .slice(name.length)
          .trim() || defaultTitle
        if (token.nesting === 1) {
          return `<div class="${name} custom-block"><p class="custom-block-title">${info}</p>\n`
        } else {
          return `</div>\n`
        }
      },
    },
  ]
}

export default md => {
  md.use(...createContainer('tip', 'TIP'))
    .use(...createContainer('warning', 'WARNING'))
    .use(...createContainer('danger', 'WARNING'))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) => (tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`),
    })
}
