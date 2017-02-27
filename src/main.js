// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueEvents from 'vue-events'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

Vue.use(VueEvents)
Vue.use(VueResource)

Vue.http.headers.common['Authorization'] = 'Bearer ' + process.env.ACCESS_TOKEN

window.$ = window.jQuery = require('jquery')
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './../node_modules/sweetalert/dist/sweetalert.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
