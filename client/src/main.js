import Vue from 'vue';

import App from './App.vue';
import store from './store';
import axios from 'axios';
import router from './router';
import vuetify from './plugins/vuetify';
// import { VueReCaptcha } from 'vue-recaptcha-v3';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:7000/api/v1';


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
