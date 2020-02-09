import Vue from 'vue';

import App from './App.vue';
import store from './store';
import axios from 'axios';
import router from './router';
import vuetify from './plugins/vuetify';
import { VueReCaptcha } from 'vue-recaptcha-v3';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

Vue.use(VueReCaptcha, {
  siteKey: '6LdyINcUAAAAAPQazVGspIR__nA5OGKQS6c0tOLQ'
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
