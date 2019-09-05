import Vue from 'vue'
import './example.scss'
import Hello from './hello.md'

new Vue({
  el: '#app',

  components: {
    Hello,
  },

  data: {
    pageTitle: '@tianyong90/vue-markdown-loader demo',
  },
})
