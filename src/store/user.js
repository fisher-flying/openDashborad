/**
 * Created by Administrator on 2018/2/7.
 */
import Cookies from 'js-cookie';
import { getToken, setToken, removeToken } from './../util/auth';
import { loginByUsername,getUserInfo,logout } from './../api/login';
const state = {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: []
  }
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  }
};

const actions = {
  /*用户登录*/
  LoginByUsername({commit}, userInfo){
    let username = userInfo.account.trim();
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then(response => {
        let OK = 200, resData = response.data.data,message = response.data.error;
        //window.pageList = response.data.data.user.pageList
        localStorage.setItem('menuList',JSON.stringify(response.data.data.user.pageList));
        if(!resData){
          reject({message});
        }else {
          setToken(resData.userToken);
          resolve()
        }
      }).catch(error => {
        reject({error,message:'用户名或密码错误'})
      });
    });
  },

  // 登出
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken();
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
};

export default {
  state,
  mutations,
  actions
};
