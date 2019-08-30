# vue-markdown-loader

[ENGLISH](./README.md)

这是一个用于加载 markdown 文件的 Webpack loader。通过配置，可以将 markdown 文件内容转换为一 vue sfc 组件对象或者 html 内容，此外还可以直接转换为一个包含解析结果、frontmatter 等数据的对象。因此，它可以很方便的与 vue-loader 或者 html-loader 配合使用，也可以单独使用。

项目的代码大部分提取自 [vuepress](https://github.com/vuejs/vuepress) 项目，但进行了一系列修改、修正以及优化，使它能在非 vuepress 项目中使用。在此对这一官方包的开发者们表示感谢。如果你有兴趣，可以前往该项目查看源码并 star。

![screenshot](./images/screenshot.png)

## 安装

```bash
npm i @tianyong90/vue-markdown-loader -S
```

## 使用

### 与 vue-loader 一起使用

一般情况下，推荐与 vue-loader 一起使用。

1. 配置

在 webpack.config.js 中为 .md 文件添加加载规则

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
              lineNumbers: true, // 启用行号
            }
          }
        }
      ]
    }
  ]
},
// other options
```

2. 将 `.md` 文件作为 vue 单文件组件导入

```html
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
// 为解析出来的 markdown 元素添加样式
</style>
```

### 与 html-loader 一起使用

vue-markdown-loader 也可以解析 markdown 文件，并返回一个包含 html 字符串供 html-loader 加载。

1. 配置

在 webpack.config.js 中为 .md 文件添加加载规则

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
              lineNumbers: true, // 启用行号
            }
          }
        }
      ]
    }
  ]
},
// other options
```

2. 将 `.md` 文件作为 vue 单文件组件导入

```html
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
// 为解析出来的 markdown 元素添加样式
</style>
```


### 单独使用



## License

MIT
