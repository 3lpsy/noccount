import Vue from 'vue'
import Vuex from 'vuex'

import common from 'common/store';
import daemon from 'daemon/store';
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      common,
      daemon
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createLogger()]

})
