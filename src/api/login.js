/**
 * Created by Administrator on 2018/7/20.
 */
import axios from 'axios';
import qs from 'qs';
export function loginByUsername (username, password) {
  const data = {
    username,
    password
  };

  return axios({
    method:'POST',
    url: siteURL+'auth?username='+data.username+'&password='+data.password,
    data: data
  })
}

export function logout (token) {
  const data = {
    token
  };
  return axios({
    method:'get',
    url: siteURL+'logout?userToken='+data.token,
  })
}

// export function getUserInfo (token) {
//   return axios({
//     method:'get',
//     url:'/user/info',
//     params:{token}
//   })
// }
