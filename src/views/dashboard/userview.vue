<template>
  <div>
    <div :class='{open:isMenuOpened}' class='sidebar'>
      <div v-show="!isMenuOpened" class="open-menu-button" @click="isMenuOpened = true" ><i class="fa fa-indent"></i></div>
      <div v-show="isMenuOpened" class='menus-container' id='menus-container'>
        <div class="close-menu-button">
          <i class="fa fa-outdent" @click="isMenuOpened = false"></i>
          <span class="menu-button">大数据看板</span>
        </div>
        <Menu />
      </div>
    </div>
    <div class="echarts-container">
       <div class="bd-bg learn-trends">
        <div class="sub-title">学习趋势分析</div>
        <ul class="time-tab">
          <li class="on">当天</li>
          <li>本周</li>
          <li>本月</li>
        </ul>
        <div class="data-panle">
          <div class="left">
            <p>当天学习总时长</p>
            <div class="time"><span>6.4</span>小时</div>
          </div>
          <div class="right">
            <chart-map-pie :width="140" :height="140"></chart-map-pie>
          </div>
        </div>
        <chart-line :width="lWith" :height="320"></chart-line>
      </div>

      <div class="bd-bg m-b-lg echart-words">
        <div class="sub-title">学员画像</div>
        <div class="pic">
          <img src="assets/images/robot.png" />
          <div class="words">
            <span class="cword cw1">瓦斯管理</span>
            <span class="cword cw2">法律法规</span>
            <span class="cword cw3">事故避灾</span>
            <span class="cword cw4">防灭火管理</span>
            <span class="cword cw5">职业病防治</span>
            <span class="cword cw6">自救互救</span>
            <span class="cword cw7">通风管理</span>
          </div>
        </div>
      </div>

      <div class="bd-bg m-r-lg">
        <div class="sub-title pab">学习类型</div>
        <chart-multi-bar :width="sWidth" :height="310" theme="cone"></chart-multi-bar>
      </div>

      <div class="bd-bg m-r-lg echart-rank">
        <div class="sub-title">学员排名</div>
        <ul class="time-tab">
          <li class="on">当天</li>
          <li>本周</li>
          <li>本月</li>
        </ul>
        <div class="table">
          <div class="item-th">
            <span>用户名</span>
            <span>学习时长</span>
            <span>排名</span>
          </div>
          <div class="item-td">
            <span>张嘉佳</span>
            <span>6.5时</span>
            <span>1</span>
          </div>
          <div class="item-td">
            <span>张子枫</span>
            <span>6.3时</span>
            <span>2</span>
          </div>
          <div class="item-td">
            <span>李小龙</span>
            <span>5.7时</span>
            <span>3</span>
          </div>
          <div class="item-td">
            <span>宋子悦</span>
            <span>5.1时</span>
            <span>4</span>
          </div>
          <div class="item-td">
            <span>杜海娇</span>
            <span>4.8时</span>
            <span>5</span>
          </div>
        </div>
      </div>

      <div class="bd-bg prela">
        <ul class="sub-title-tab">
          <li class="on">栏目偏好</li>
          <li>内容偏好</li>
        </ul>
        <chart-pie :width="sWidth" :height="310" theme="rose"></chart-pie>
      </div> 

    </div>

  </div>
</template>
<script>
import svgTitle from '../../components/svg-title.vue'
import Menu from './components/menu.vue'

export default {
  data() {
    return {
      isMenuOpened: false,
      routerName: this.$route.name || '/',
      fullWidth: document.documentElement.clientWidth,
      sWidth:462,
      lWith:'958'
    }
  },
  components: {
    Menu
  },
  created() {
    if(this.fullWidth<1581) {
      this.lWith = 722
      this.sWidth = 390
    }
  },
  mounted() {
    if(this.timer){
      console.log(1)
      clearInterval(this.timer)
    }else{
      this.timer=setInterval(()=>{
          //console.log(4)
      },2000)
    }
  }
}
</script>

