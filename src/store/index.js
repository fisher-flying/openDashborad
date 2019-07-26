/**
 * Created by Administrator on 2018/2/7.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './user'


Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user,
  }
})
