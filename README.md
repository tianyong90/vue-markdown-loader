# vue-markdown-loader

[简体中文](./README-CN.md)

This is a webpack loader that convert `.md` file to vue sfc(which can be loaded via vue-loader).

The project is inspired by [vuepress](https://github.com/vuejs/vuepress), we reused most of its source code and made some improvements to allow it being used in non-vuepress project.

If you like Vuepress, please visit [vuepress](https://github.com/vuejs/vuepress) and star it. :smile:

![screenshot](./images/screenshot.png)

## Install

```bash
npm i @tianyong90/vue-markdown-loader -S
```

## Useage

1. configure

add loader rules for `.md` files in webpack.config.js

```js
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.md$/,
      use: [
        {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhiteSpace: false
            }
          }
        },
        {
          loader: '@tianyong90/vue-markdown-loader',
          options: {
            // sourceDir: ''
            contentCssClass: 'markdown-body',
            markdown: {
              lineNumbers: true, // enable line numbers
            }
          }
        }
      ]
    }
  ]
},
// other options
```

2. import md file as vue single file component

```vue
<template>
  <Hello />
</template>

<script scoped>
import Hello from 'hello.md'

export default {
  components: { Hello }
}
</script>

<style>
// add styles for rendered markdown elements
</style>
```

## License

MIT
