import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-vue';

Amplify.configure(awsconfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
