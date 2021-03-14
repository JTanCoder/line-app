import Vue from 'vue'
import App from './App'
import $store from '@/store/index.js';

import store from './store'

Vue.config.productionTip = false
import C from '@/common/free-lib/config.js'
import urls from '@/common/free-lib/urls.js'
import U from '@/common/free-lib/util.js';
import T from '@/common/free-lib/time.js';

Vue.prototype.$urls = urls;
Vue.prototype.$util = U;
Vue.prototype.$c = C;
Vue.prototype.$time = T;


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
