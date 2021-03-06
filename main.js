import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from 'store/index.js'
import ws_store from 'store/ws-store.js'
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$ws_store = ws_store
App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
	ws_store
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);

app.$mount()
