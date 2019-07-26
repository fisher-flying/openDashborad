import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ELEMENT from 'element-ui'
import config from './config'
import menus from './router/manage/routes.js'
import routes from './router/manage/index.js'
import components from './components/index.js'

import index from './views/manage/index.vue'
import Cookies from 'js-cookie';

Vue.use(VueRouter)
Vue.use(ELEMENT)
Vue.use(components)

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

Vue.prototype.$userToken = getUrlParam('userToken')
if(Vue.prototype.$userToken != null){
  Cookies.set('Token',Vue.prototype.$userToken);
}

var stateObject = {};
var user_token = getUrlParam('userToken');
var newUrl = window.location.pathname+window.location.hash;
history.replaceState(stateObject,user_token,newUrl);

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
  axios.interceptors.request.use(function (config) { // 每次请求时会从cookies中获取token
    let token = Cookies.get('Token');
    if (token) {
      config.headers.userToken = token;
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  /* 响应拦截器 */
  axios.interceptors.response.use(function (response) {
  //1000:数据库错误，1001:服务器错误，1002:参数错误，1011:token无效
  if (response.data.code === 1011) {
    Cookies.remove('token')
    // window.location.href = 'http://192.168.33.147:9099/admin/logout'
    window.location.href = 'http://47.92.142.80/bigdata/manager/logout'
    //window.location.href = 'http://47.92.142.80/bigdata/manager/login'
   // window.location.href = 'http://rds.ipmph.com/admin/logout'
  } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
    Cookies.get('token',response.data.token)  // 覆盖原来的token(默认一天刷新一次)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
  //console.log(Cookies.get('Token'))
  const router = new VueRouter({
    mode: 'hash',
    routes: routes
  })
  //let res = await axios.get('/api/login')
  const eventBus = new Vue()
  window.app = new Vue({
    el: '#root',
    router,
    render: h => h(index),
    data: {
      eventHub: new Vue()
    }
  })
}
window.addEventListener('load', window.appInit, false)
