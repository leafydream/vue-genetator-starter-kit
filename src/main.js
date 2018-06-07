import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import '@/util/viewport.js';
import '@/assets/css/rest.scss';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
