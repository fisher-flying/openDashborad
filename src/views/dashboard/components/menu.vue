<template>
  <ul class='menu'>
    <li class="menu-item level1" @click="toIndex">
      <router-link to="overview">
        <i class="menu-icon fa fa-home"></i>
        <span class="btn-excel">首页</span>
      </router-link>
    </li>
    <li class="menu-item level1">
      <router-link to="operation">
        <i class="menu-icon fa fa-tv"></i>
        <span class="btn-excel">平台分析</span>
      </router-link>
    </li>
    <li class="menu-item level1">
      <router-link to="userview">
        <i class="menu-icon fa fa-user-o"></i>
        <span class="btn-excel">用户分析</span>
      </router-link>
    </li>
    <li class="menu-item level1">
      <router-link to="hotspot">
        <i class="menu-icon fa fa-heart-o"></i>
        <span class="btn-excel">热点分析</span>
      </router-link>
    </li>
    <li class="menu-item level1">
      <router-link to="profession">
        <i class="menu-icon fa fa-bookmark"></i>
        <span class="btn-excel">行业分析</span>
      </router-link>
    </li>
    <li class="menu-item level1">
      <router-link to="enterprise">
        <i class="menu-icon fa fa-building-o"></i>
        <span class="btn-excel">企业分析</span>
      </router-link>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
import { getToken } from '../../../util/auth';
import axios from 'axios'
import './../mock/menu.js'

export default {
  props: ['curID'],
  data() {
    return {
      menuLists: [],
      parentid:''
    }
  },
  methods: {
    changeID(val){
      console.log(2)
      this.$emit('menuid',val);
    },
    toIndex(){
      window.location.href = './../html/index.html'
    }
  }
}
</script>
