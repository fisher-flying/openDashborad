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
      <div class="bd-bg m-b-lg enterprise-rank" style="width:690px;">
        <el-row>
          <el-col :span="8"><div class="sub-title">关键词搜索</div></el-col>
          <el-col :span="16">
            <ul class="tab">
              <li v-for="(item,index) in tabTime" :key="index" @click="tabMonth(item,index)" :class="{'on' : index == curtab}">{{ item }}</li>
            </ul>
          </el-col>
          <el-col :span="24">
            <div style="margin:0 10px;">
              <chart-graph :width="690" :height="380" ></chart-graph>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bd-bg m-b-lg m-t-lg">
        <div class="sub-title pab">教师教学专业分布图</div>
        <chart-pie theme="annular" :width="mWith" :height="452"></chart-pie>
      </div>
   
      <div class="bd-bg m-r-lg">
        <div class="sub-title">课程点击排行</div>
        <chart-transverse-bar :width="sWidth" :height="297" ></chart-transverse-bar>
      </div>
      <div class="bd-bg m-r-lg">
        <div class="sub-title">行业热点分析预测</div>
        <chart-multi-pie :width="sWidth" :height="297"></chart-multi-pie>
      </div>
      <div class="bd-bg enterprise-rank hot-rank" style="margin:0px;">
        <div class="sub-title">资讯点击排行</div>
        <div class="m-md">
          <el-table :data="tableData" height="255">
            <el-table-column prop="name" label="企业名称"></el-table-column>
            <el-table-column prop="time" label="学习时长" width="102" align="center"></el-table-column>
            <el-table-column prop="rchain" label="环比" width="76" align="center"></el-table-column>
            <el-table-column prop="id" label="排名" width="66" align="center"></el-table-column>
          </el-table>
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
      fullWidth: document.documentElement.clientWidth,
      sWidth:462,
      mWith:725,
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
    if(this.fullWidth<1581) {
      this.sWidth = 390
      this.mWith = 470
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
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

