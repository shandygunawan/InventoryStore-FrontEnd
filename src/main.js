import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import axios from 'axios';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify';
import VueCurrencyFilter from 'vue-currency-filter';

import App from './App.vue';
import router from './router';
import store from './store';

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.common = { 'Authorization': `Bearer ${store.getters.token}` }

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueCurrencyFilter, [
  {
    name: "currency_idr",
    symbol: 'Rp',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true,
    avoidEmptyDecimals: undefined
  },
  {
    name: "separator",
    symbol: '',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true,
    avoidEmptyDecimals: undefined
  },
])

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
