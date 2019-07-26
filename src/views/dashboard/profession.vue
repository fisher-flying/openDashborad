<template>
  <div>
    <div :class='{open:isMenuOpened}' class='sidebar'>
      <div v-show="!isMenuOpened" class="open-menu-button" @click="isMenuOpened = true" ><i class="fa fa-indent"></i></div>
      <div v-show="isMenuOpened" class='menus-container' id='menus-container'>
        <div class="close-menu-button">
          <i class="fa fa-outdent" @click="isMenuOpened = false"></i>
          <span class="menu-button">大数据看板</span>
        </div>
        <Menu :curID='this.currentPage.id'/>
      </div>
    </div>
    
    <div class="echarts-container">
      <div class="bd-bg m-r-lg m-b-lg">
        <div class="sub-title">点击率预测分析</div>
        <chart-multi-bar theme="cone" :width="sWidth" :height="360"></chart-multi-bar>
      </div>
      <div class="bd-bg m-r-lg m-b-lg">
        <div class="sub-title">行业员工技能等级构成图</div>
        <chart-pie theme="rose" :width="sWidth" :height="360"></chart-pie>
      </div>
      <div class="bd-bg">
        <div class="sub-title pab">人才分部情况</div>
        <chart-map :width="sWidth" :height="410"></chart-map>
      </div>
       <div class="bd-bg m-r-lg">
        <div class="sub-title">行业员工构成图</div>
        <chart-pie :width="sWidth" :height="360"></chart-pie>
      </div>
      <div class="bd-bg m-r-lg">
        <div class="sub-title">2017-2019行业人才数据增长情况</div>
        <chart-multi-line :width="sWidth" :height="360"></chart-multi-line>
      </div>
      <div class="bd-bg">
        <div class="sub-title">行业员工技能等级构成图</div>
        <chart-pie theme="annular" :width="sWidth" :height="360"></chart-pie>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import './mock/operation.js'
import Menu from './components/menu.vue'

export default {
  data() {
    return {
      isMenuOpened: false,
      currentPage:{},
      sWidth:462
    }
  },
  components: {
    Menu
  },
  created() {
    if(document.documentElement.clientWidth < 1581) {
      this.sWidth = 390
    }
  },
  mounted() {
    //定时刷新
    let scroll=0;
    if(this.timer){
      clearInterval(this.timer)
    }else{
      this.timer=setInterval(()=>{
      },2000)
    }
  },
  methods: {
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

