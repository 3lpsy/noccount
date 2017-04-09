import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'
import App from './App'
import router from 'router'
import Api from 'api';
import store from 'store'

Vue.use(Electron);

Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
