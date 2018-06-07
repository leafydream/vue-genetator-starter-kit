import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import Axios from 'axios';
Store.prototype.$http = Axios;
import Counter from './modules/counter';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Store({
    modules: {
        Counter
    },
    plugins: debug ? [require('vuex/dist/logger')({ collapsed: false })] : []
})
