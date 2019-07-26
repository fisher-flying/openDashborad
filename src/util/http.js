import axios from 'axios';

const service = axios.create({
  timeout:10000,
  withCredentials: true,
});

import { getToken,removeToken,setToken } from './../util/auth';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* 请求拦截器 */
axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
  let token = getToken();
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
    removeToken()
    router.replace({
      path: '/login' // 到登录页重新获取token
    })
  } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
    setToken(response.data.token)  // 覆盖原来的token(默认一天刷新一次)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default service
