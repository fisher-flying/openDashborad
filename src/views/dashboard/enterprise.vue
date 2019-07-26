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
      <div class="bd-bg enterprise-rank small" style="height:452px;">
        <el-row>
          <el-col :span="22"><div class="sub-title">企业员工学习时长排行</div></el-col>
          <!-- <el-col :span="16">
            <ul class="tab">
              <li v-for="(item,index) in tabTime" :key="index" @click="tabMonth(item,index)" :class="{'on' : index == curtab}">{{ item }}</li>
            </ul>
          </el-col> -->
          <el-col :span="24">
            <div class="m-md">
              <el-table :data="tableData" height="360">
                <el-table-column prop="name" label="企业名称"></el-table-column>
                <el-table-column prop="time" label="学习时长" width="110" align="center"></el-table-column>
                <el-table-column prop="rcent" label="同比" width="70" align="center"></el-table-column>
                <el-table-column prop="id" label="排名" width="56" align="center"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bd-bg m-r-lg" style="margin-top:30px;margin-left:-4px;">
        <div class="sub-title pab">入驻企业情况分部</div>
        <chart-line-pie :width="sWidth" :height="452"></chart-line-pie>
      </div>
       <div class="bd-bg m-b-lg" style="margin-top:30px;">
        <div class="sub-title">企业热门课程视频</div>
        <chart-multi-bar :width="sWidth" :height="402" theme="cone"></chart-multi-bar>
      </div>
      <div class="bd-bg m-r-lg m-b-lg">
        <div class="sub-title">企业教师受喜爱排行榜</div>
        <chart-transverse-bar :width="sWidth" :height="297" ></chart-transverse-bar>
      </div>
      <div class="bd-bg m-r-lg">
        <div class="sub-title">月培训数量变化图</div>
        <chart-pie :width="sWidth" :height="297"></chart-pie>
      </div>
      <div class="bd-bg echart-rank">
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
          <div class="item-td">
            <span>杜娇</span>
            <span>4.8时</span>
            <span>6</span>
          </div>
        </div>
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
      sWidth:462,
      curtab:0,
      flag:true,
      tabTime:[],
      tableData: []
    }
  },
  components: {
    Menu
  },
  created() {
    if(document.documentElement.clientWidth < 1581) {
      this.sWidth = 390
    }
    this.tabDate()
    this.initTable()
  },
  mounted() {
    //定时刷新
    let scroll=0;
    if(this.timer){
      clearInterval(this.timer)
    }else{
      this.timer=setInterval(()=>{
        //表格滚动
        const tableScroll = document.querySelector(".el-table__body-wrapper");
        scroll < 170 ? scroll += 10 : scroll = 0;
        tableScroll.scrollTop = scroll;
      },2000)
    }
  },
  methods: {
    //企业排名月份
    tabDate() {
      let res = axios.get('/api/operation/date').then(res => {
        this.tabTime = res.data.list
      })
    },
    //企业排名表格
    initTable() {
      let res = axios.get('/api/operation/table').then(res => {
        this.tableData = res.data.list
      })
    },
    //企业排名切换
    tabMonth(val,index) {
      this.curtab = index
      if(this.flag){
        let res = axios.get('/api/operation/table/1').then(res => {
          this.tableData = res.data.list
        })
        this.flag=false
      }else{
        let res = axios.get('/api/operation/table').then(res => {
          this.tableData = res.data.list
        })
        this.flag=true
      }
    },
    //统计数据格式化
    toThousands(num) {
      var result = '', counter = 0;
      num = (num || 0).toString();
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) { result = ',' + result; }
      }
      return result;
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

