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
      <div class="data-stat">
        <div class="item trans-purple">
          <p>互联网访问量</p>
          <span>{{ interVisit }}</span>
        </div>
        <div class="item trans-red">
          <p>互联网注册人数</p>
          <span>{{ interRegist }}</span>
        </div>
        <div class="item trans-blue">
          <p>当前在线人数</p>
          <span>{{ interOnline }}</span>
        </div>
        <div class="item trans-yellow">
          <p>局域网访问量</p>
          <span>{{ lanVisit }}</span>
        </div>
        <div class="item trans-dblue">
          <p>局域网注册人数</p>
          <span>{{ lanRegist }}</span>
        </div>
      </div>

      <div class="bd-bg enterprise-rank">
        <el-row>
          <el-col :span="8"><div class="sub-title">企业学习排名</div></el-col>
          <el-col :span="16">
            <ul class="tab">
              <li v-for="(item,index) in tabTime" :key="index" @click="tabMonth(item,index)" :class="{'on' : index == curtab}">{{ item }}</li>
            </ul>
          </el-col>
          <el-col :span="24">
            <div class="m-md">
              <el-table :data="tableData" height="280">
                <el-table-column prop="name" label="企业名称" width="220"></el-table-column>
                <el-table-column prop="time" label="学习时长" width="180" align="center"></el-table-column>
                <el-table-column prop="rchain" label="环比" align="center"></el-table-column>
                <el-table-column prop="rcent" label="同比" align="center"></el-table-column>
                <el-table-column prop="id" label="排名" align="center"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bd-bg enterprise-map">
        <div class="sub-title pab">入驻企业情况分部</div>
        <div class="company-num pab">实时企业数量
          <div class="num"><span>658</span>家</div>
        </div>
        <chart-map :width="640" :height="392"></chart-map>
      </div>
   
      <div class="bd-bg m-r-lg">
        <div class="sub-title">企业活跃度排名</div>
        <chart-transverse-bar :width="sWidth" :height="310" ></chart-transverse-bar>
      </div>
      <div class="bd-bg m-r-lg">
        <div class="sub-title">点击率预测分析</div>
        <chart-multi-line :width="sWidth" :height="310" :curDataId="13"></chart-multi-line>
      </div>
      <div class="bd-bg">
        <div class="sub-title">企业岗位工种数量趋势</div>
        <chart-multi-line :width="sWidth" :height="310"></chart-multi-line>
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
      interVisit:'47000',    //互联网访问量
      interRegist:'620000',   //互联网注册人数
      interOnline:'100',   //当前在线人数
      lanVisit:'230',      //局域网访问量
      lanRegist:'2000',     //局域网注册人数
      fullWidth: document.documentElement.clientWidth,
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
    if(this.fullWidth < 1581) {
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
        this.interVisit = this.toThousands(Math.floor(Math.random()*100)+47000);
        this.interRegist = this.toThousands(Math.floor(Math.random()*10)+620000);
        this.interOnline = this.toThousands(Math.floor(Math.random()*20)+100);
        this.lanVisit = this.toThousands(Math.floor(Math.random()*30)+200);
        this.lanRegist = this.toThousands(Math.floor(Math.random()*50)+2300);

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

