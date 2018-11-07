<template>
	<div>
		<div class="top">
			<router-link :to="{ path:'/' }">
				<span style="position:absolute;left:20px;"><</span>
			</router-link>
			<span>我的指数明细</span>
		</div>
		<div style="width:100%;">
			<el-table :data="tableData" stripe>
		    <el-table-column
		      prop="month"
		      width="85%"
		      label="日期">
		    </el-table-column>
		    <el-table-column
		      prop="study"
		      width="45%"
		      label="学习成长">
		    </el-table-column>
		    <el-table-column
		      prop="read"
		      width="45%"
		      label="读书指数">
		    </el-table-column>
		    <el-table-column
		      prop="culture"
		      width="45%"
		      label="企业文化">
		    </el-table-column>
		    <el-table-column
		      prop="attendance"
		      width="45%"
		      label="出勤指数">
		     </el-table-column>
		      <el-table-column
		      prop="hse"
		      width="45%"
		      label="HSE">
		    </el-table-column>
		    <el-table-column
		      prop="improve"
		      width="45%"
		      label="精益改善">
		    </el-table-column>
		    <el-table-column
		      prop="total"
		      width="45%"
		      label="总指数">
		    </el-table-column>
			</el-table>
			</div>
	</div>
</template>
<script>
export default {
	data() {
	  return {
	    tableData: []
	  }
	},
	methods: {
		async initData () {
			this.$http.get('/huoli/mobile/myHistoryData').then(({ data }) => {
			  if (data) {
			    this.tableData = data
			  } else {
			    this.$message({
			      type: 'error',
			      message: data.message
			    })
			  }
			})
		}
	},
	created () {
	  this.initData()
	}
}
</script>
<style scoped>
.top{height: 50px;width:100%;background-color: #4F77AB;font-size: 14px;color:#fff;line-height: 50px;position: relative;}
/deep/ .el-table{font-size: 12px;}
a{color:#fff;}
/deep/ .el-table .cell, .el-table th div{padding-right: 0px;}
</style>
