import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ELEMENT from 'element-ui'
import config from './config'
import menus from './router/dashboard/routes.js'
import routes from './router/dashboard/index.js'
import components from './components/index.js'
import index from './views/dashboard/index.vue'
import login from './views/dashboard/login.vue'

import store from './store'
import {getToken} from './util/auth'

//import axios from './util/http.js';
/*引入Cookies文件*/
import Cookies from 'js-cookie';

Vue.use(VueRouter)
Vue.use(ELEMENT)
Vue.use(components)

Vue.prototype.$cookies = Cookies;

// Vue.prototype.chartMap={
//   bar: {type: 'chartBar',theme: ''},
//   barWave: {type: 'chartBar',theme: 'wave'},
//   barCone: {type: 'chartBar',theme: 'cone'},
//   barCust: {type: 'chartBar',theme: 'cust'},
//   barMul: {type: 'chartMultiBar',theme: ''},
//   barMulCone: {type: 'chartMultiBar',theme: 'cone'},
//   barTra: {type: 'chartTransverseBar',theme: ''},
//   line: {type: 'chartLine',theme: 'line'},
//   lineFlat: {type: 'chartLine',theme: 'flat'},
//   lineMul: {type: 'chartMultiLine',theme: ''},
//   lineMulSmooth: {type: 'chartMultiLine',theme: 'smooth'},
//   pie: {type: 'chartPie',theme: ''},
//   pieRose: {type: 'chartPie',theme: 'rose'},
//   pieMul: {type: 'chartMultiPie',theme: ''},
//   pieNest: {type: 'chartMultiPie',theme: 'nest'},
//   map: {type: 'chartMapGroup',theme: ''},
//   mapBar: {type: 'chartMapBar',theme: ''},
//   mapPie: {type: 'chartMapPie',theme: ''}
// }

if (window.NODE_ENV === 'development') {
  Vue.config.devtools = true
}
_.merge(axios.defaults, config.axios)

window.appInit = async function () {
  const router = new VueRouter({
    mode: 'hash',
    routes: routes
  })
  //const whiteList = ['/login']; // no redirect whitelist
  const whiteList = ['/userview'];
  // router.beforeEach((to, from, next) => {
  //   if(getToken()){
  //     if(to.path === '/login'){
  //       next({path:'/overview'})
  //     }else{
  //       next()
  //     }
  //   }else {
  //     /* 没有token*/
  //     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //       next()
  //     } else {
  //       next('/login') // 否则全部重定向到登录页
  //     }
  //   }
  // });
  window.app = new Vue({
    el: '#root',
    router,
    store,
    render: h => h(index)
  })
}
window.addEventListener('load', window.appInit, false)


