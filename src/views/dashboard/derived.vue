<template>
  <div>
    <div :class='{open:isMenuOpened}' class='sidebar'>
      <div v-show="!isMenuOpened" class="open-menu-button" @click="isMenuOpened = true" ><i class="fa fa-indent"></i></div>
      <div v-show="isMenuOpened" class='menus-container' id='menus-container'>
        <div class="close-menu-button">
          <i class="fa fa-outdent" @click="isMenuOpened = false"></i>
          <span class="menu-button">菜单</span>
        </div>
        <Menu @menuid="menuidFn" />
      </div>
    </div>
    <div class="title-page">导出表格</div>
    <div class="derived-container">
      <el-button class="export-excel" @click="exportExcel">导出表格</el-button>
      <el-tree ref="tree" :data="items" :props="props" :load="loadNode" lazy :default-expand-all='true' show-checkbox :expand-on-click-node='true'>
      </el-tree>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import svgTitle from '../../components/svg-title.vue'
import Menu from './components/menu.vue'

export default {
  data() {
    return {
      isMenuOpened: false,
      props: {
        label: 'name',
        children: 'children',
        id: 'id',
        name: 'name'
      },
      items: [],
      loading: true,
      selecte: {},
      count: 1,
      pageList: [],
    }
  },
  components: {
    svgTitle,
    Menu
  },
  created() {
    this.pageList = JSON.parse(localStorage.getItem('menuList'))
  },
  methods: {
    exportExcel() {
      let checkedNodes = this.$refs.tree.getCheckedNodes()
      let propsData = []
      if (checkedNodes.length == 0) {
        this.$message({
          message: '请先选择要下载的报表!',
          type: 'warn'
        })
        return
      }
      for (let i = 0; i < checkedNodes.length; i++) {
        if(!checkedNodes[i].level) {
          propsData.push({
            reportId: checkedNodes[i].id,
            appCodes: checkedNodes[i].dataAppcodes
          })
        }
      }
      let $this = this
      axios({
        method: 'post',
        url: `${siteFrontURL}report/exportData`,
        data: propsData,
        responseType: 'blob',
      }).then(res => {
         if (res.headers.code == '1001') {
          $this.$message({
            message: '服务器错误!',
            type: 'error'
          })
          return
        } else if (res.headers.code == "1002") {
          $this.$message({
            message: '参数错误!',
            type: 'error'
          })
          return
        } 
        if (!res.data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([res.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.zip')
        document.body.appendChild(link)
        link.click()
      })
    },
    loadNode(node, resolve) {  
      if (node.level === 0) { // 渲染父节点
        return resolve(this.pageList);
      }
      if (node.level >= 1) {
        if(!node.data.leaf){  // 非叶子节点
          this.getChildren(node.data.id, resolve);
        }else{
          return resolve([]);
        }
      }
    },
    getChildren(id, resolve) {
      axios.get(`${siteFrontURL}page/getReports/${id}`).then(res=>{
        let resData = res.data.data
        if (resData) {
          return resolve(resData)
        }
      })
    },
    menuidFn(val){
      this.$router.push({
          path:'/operation',
          query: {
            curPage: val,
         }
        })
    }
  }
}
</script>

<style>
  .derived-container {
    text-align: center;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 6%;
  }
  .export-excel {
    margin: 30px auto
  }
</style>


