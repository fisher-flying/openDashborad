<template>
  <div class="p-lg report">
    <h5 class="t1">数据筛选</h5>
    <div class="report-top">
      <div class="box1">
        <span>类型</span>
        <el-select v-model="datas" size="small" placeholder="请选择">
          <el-option v-for="item in dataType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="box1">
        <span>展示方式</span>
        <el-select v-model="echarts" size="small" placeholder="请选择">
          <el-option v-for="item in echartType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="box1">
        <span>关键字</span>
        <el-input v-model="input" placeholder="图表名称" size="small" class="search"></el-input>
        <el-button size="small" class="searchbtn" @click="filter()">搜索</el-button>
      </div>
    </div>

    <h5 class="t2">图表详情</h5>
    <el-table :data="tableData" stripe>
      <el-table-column prop="index" label="编号" align="center" width="150"></el-table-column>
      <el-table-column prop="name" label="图表名称" align="center"></el-table-column>
      <el-table-column prop="dataType" label="类型" align="center"></el-table-column>
      <el-table-column prop="chartType" label="展示方式" align="center"></el-table-column>
      <el-table-column prop="layout" label="排版方式" align="center"></el-table-column>
      <el-table-column prop="appCodes" label="产品维度" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" >{{scope.row.check}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="fr" @current-change="handlePageChange" :current-page="pageIndex" :page-size="10" layout="prev, pager, next" :total="userTotal">
    </el-pagination>

    <el-dialog :title="reportName" :visible.sync="dialogVisible" width="50%" class="report-dialog" v-if="currow && currow.appMap">
      <el-select v-model="curAppCode" placeholder="全部">
        <el-option v-for="(name, code) in currow.appMap" :key="code" :label="name" :value="code">
        </el-option>
      </el-select>
      <div id="curReport" class="report-box">
        <component :is="chartMap[currow.theme].type" 
          :theme="chartMap[currow.theme].theme" 
          :curDataId="currow.id"
          :curDataCode="curAppCode"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      echarts: '',
      echartType: [],
      datas: '',
      dataType: [],
      input: '',
      pageIndex: 1,
      userTotal: 0,
      tableData: [],
      currow:[],
      dialogVisible: false,
      reportName: '',
      curAppCode: 'system_all',
    }
  },
  mounted() {
    this.initSelect()
    this.initRepotTable()
  },
  methods: {
    initSelect() {
      let echartType = axios.post(`${siteURL}dict/type/chartType`).then(res => {
        this.echartType = res.data.data
      })
      let dataType = axios.post(`${siteURL}dict/type/dataType`).then(res => {
        this.dataType = res.data.data
      })
    },
    initRepotTable() {
      let res = axios
        .post(`${siteURL}report/list`, {
          pageNo: this.pageIndex,
          pageSize: 10,
          query: {
            name: this.input,
            dataType: this.datas,
            chartType: this.echarts
          }
        })
        .then(res => {
          this.userTotal = res.data.data.count
          res.data.data.list.forEach((item, idx) => {
            item.index = 1 + idx + (this.pageIndex - 1) * 10
          })
          this.tableData = res.data.data.list
          this.appoint()
        })
    },
    //筛选
    filter() {
      this.initRepotTable()
    },
    //指定禁止查看详情图表
    appoint() {
      this.tableData.forEach((i,index) => {
        i.check = "查看详情"
        if(i.id == '49182696b62b4ba39b0127d8ac0a421c' || 
           i.id == 'b2e1d795a5364ec89413703f4337af4d' || 
           i.id == '04e388c47d8e4de9ade79feec4720ae9'){
          i.check = ""
        }
      })
      //appDataNamesArray.shift()
    },
    handleClick(row) {
      this.curAppCode = 'system_all'
      this.currow = row
      this.reportName = row.name
      this.dialogVisible = true
    },
    handlePageChange(val) {
      this.pageIndex = val
      this.initRepotTable()
    }
  }
}
</script>
<style >
.report-dialog .el-dialog {
  background: #f2f2f2;
  border-radius: 8px;
}
.report-dialog .el-dialog__body {
  background: #fff;
  margin: 20px 50px;
}
.report-dialog .el-dialog__footer {
  text-align: center;
}
.report-dialog .report-box {
  width: 320px;
  margin: 0 auto;
}
.report-dialog .map-body {
  margin-left: -40%
}
</style>




