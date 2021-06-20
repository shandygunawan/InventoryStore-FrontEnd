import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify';
import VueCurrencyFilter from 'vue-currency-filter';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
