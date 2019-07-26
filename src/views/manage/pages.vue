<template>
	<div class="p-lg report pages">
		<h5 class="t1">页面详情</h5>
	 	<el-table :data="tableData" stripe>
	 		<el-table-column type="index" label="编号"  align="center" width="150"></el-table-column>
	    <el-table-column prop="pageType" label="页面类型"  align="center"></el-table-column>
	    <el-table-column prop="name" label="页面名称"  align="center"></el-table-column>
	    <el-table-column prop="createDate" label="发布时间"  align="center"></el-table-column>
	    <el-table-column prop="createUser" label="创始人"  align="center"></el-table-column>
	    <el-table-column label="操作" align="center">
      	<template slot-scope="scope">
        	<el-button @click="handleClick(scope.row)" type="text">编辑</el-button>
      	</template>
    	</el-table-column>
	  </el-table>

	</div>
</template>
<script>
	import axios from 'axios'
	//import './mock/pages.js'
	export default {
		data() {
	    return {
	    	tableData: []
	    }
	  },
	  mounted(){
			axios.defaults.headers.post['userToken'] = this.$userToken
	    let res = axios.post(`${siteURL}page/list`).then(res=>{
	      this.tableData = res.data.data.list
	    })
	  },
	  methods: {
	    handleClick(row) {
	      this.$router.push({
					path: '/pageConfig/' + row.id + '?'
				})
	    },
	    handlePageChange(val) {
	      this.pageIndex = val;
	    },
	  },
	}
</script>

