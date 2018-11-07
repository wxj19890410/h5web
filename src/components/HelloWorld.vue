<template>
  <div class="hello">
    <div class="top">活力指数</div>
    <div class="header">
      <div class="header-img"><img :src="userInfo.avatar"></div>
      <div class="header-product">
        <div style="font-size:14px;color:#4F77AB;">正式员工</div>
        <div style="font-size:16px;">{{userInfo.name}}</div>
        <div style="font-size:12px;color:#949494;">ID:{{userInfo.mobile}}</div>
      </div>
    </div>
    <div class="echats-bing">
      <div class="echats-bing-header flex-between">
        <div>月活力指数</div>
        <router-link :to="{ path:'/childs' }">
          <div>获取明细 》》 </div>
        </router-link>
      </div>

      <div style="display:flex;position:relative;">
      <div style="position:absolute;top:105px;left:30%;font-size:25px;color:#fff;z-index:9999999;">208</div>
        <div id="myChart" :style="{width: '70%', height: '200px'}"></div>
        <div style="background-color:#fff;color:#747474;width:30%;">
          <div style="font-size:15px;margin-top:20px;">上月排名：</div><div style="margin-top:10px;"><span class="font">{{detailData.rank}}</span>/{{detailData.personNub}}</div>
          <div style="margin-top:10px;">公司平均值：<div class="font">{{detailData.averTotal}}</div></div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;color:#5B88B3;background-color:#fff;margin-top:10px;padding-top:10px;">
        <div style="transform:scale(1,1);margin-left:18%;">我的名次</div>
        <div style="width:35%; display:flex;">
          <div style="transform:scale(1,1);width:50%;">我的名次</div>
          <div style="transform:scale(1,1);width:50%;">企业平均值</div>
        </div>
      </div>
      <div style="padding:10px 0px 20px 0;background-color:#fff;">
        <div style="display:flex;line-height:20px;background-color:#fff;" v-for="item in table">
          <div class="table-name">{{item.name}}</div>
          <div style="width:15%;color:#5B88B3;">{{item.num1}}</div>
          <div style="width:50%;margin:5px 0;">
          <el-progress :text-inside="true" :stroke-width="5" :percentage = "item.per?item.per:0" :color="item.color" :show-text="false"></el-progress></div>
          <div style="width:25%;color:#5B88B3;">{{item.num2}}</div>
          <div style="width:25%;color:#5B88B3;">{{item.num3}}</div>
        </div>
      </div>
    </div>
    <div id="myChart2" :style="{width: '100%', height: '280px'}" style="margin-top:10px;"></div>
    <div style="padding:0 20px;background-color:#fff;margin-bottom:10px;padding-bottom:30px;">
      <div class="button" v-for="(item,index) in tab" @click="tabNum(item.id)">{{item.name}}</div>
    </div>
    <div class="paiming">
      <div style="background-color:#F7FAFA;font-size:16px;padding:10px 0;">上月活力指数排名</div>
      <div style="display:flex;width:100%;justify-content:center;margin-bottom:30px;">
        <div class="paihangTab" @click="getAverData()">公司总排行榜</div>
        <el-dropdown @command="handleCommand" class="paihangTab">
          <span class="el-dropdown-link" >
            部门<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item.id" :key="index" v-for="(item,index) in deptList">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand2" class="paihangTab">
          <span class="el-dropdown-link" >
            组织<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item.id" :key="index"  v-for="(item,index) in tagList">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div></div>
      <el-table
        :data="tableData"
        stripe
        row-key="id"
        :expand-row-keys="expands"
        @row-click="rowClick"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="企业文化">
                <span>{{ props.row.culture }}</span>
              </el-form-item>
              <el-form-item label="学习成长">
                <span>{{ props.row.study }}</span>
              </el-form-item>
              <el-form-item label="精益改善">
                <span>{{ props.row.improve }}</span>
              </el-form-item>
              <el-form-item label="HSE">
                <span>{{ props.row.hse }}</span>
              </el-form-item>
              <el-form-item label="出勤指数">
                <span>{{ props.row.attendance }}</span>
              </el-form-item>
              <el-form-item label="读书指数">
                <span>{{ props.row.read }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="排名"
          prop="rank">
        </el-table-column>
        <el-table-column
          label="员工"
          prop="name">
        </el-table-column>
        <el-table-column
          label="总指数"
          prop="total">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
const culture = {name:"企业文化",num1:0,num2:0, num3:0,color:"#B23331", per: 0}
const study = {name:"学习成长",num1:0,num2:0, num3:0,color:"#2E3E4C", per: 0}
const improve = {name:"精益改善",num1:0,num2:0, num3:0,color:"#60979F", per: 0}
const hse = {name:"HSE",num1:0,num2:0, num3:0,color:"#C87A5E", per: 0}
const attendance = {name:"出勤指数",num1:0,num2:0, num3:0,color:"#8EC0A6", per: 0}
const read =  {name:"读书指数",num1:0,num2:0, num3:0,color:"#6F967A", per: 0}
export default {
  name: 'HelloWorld',
  data () {
    return {
      xAxisData: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12'],
      msHistoryData: [],
      userInfo: {avatar: '/static/header.png'},
      codeId: null,
      detailData: {},
      table:[],
      dataNum:[],
      tab:[{id:'total', name: '总指数'}, {id:'culture', name: '企业文化'}, {id:'study', name: '学习指数'}, {id:'read', name: '读书指数'}, {id:'attendance', name: '出勤指数'}, {id:'improve', name: '精益改善'}, {id:'hse', name: 'HSE'}],
      paiTab:['公司总排行榜','部门指数榜','组织活力榜','生产部门'],
      tagList: [],
      deptList: [],
      tableData: [],
      expands: []
    }
  },
  create(){

  },
  mounted(){
    this.codeId = this.$route.query.code
    this.getloadInfo()
    this.drawLine();
  },
  methods: {
    getloadInfo() {
      const params= {}
      params.codeId= this.codeId
      this.$http.get('/huoli/mobile/loadInfo', {params: params}).then(({ data }) => {
        if (data) {
          if(data.userInfo){
            this.userInfo = data.userInfo
            this.$store.commit('setUserid', data.userid)
            this.myHistoryData()
          }
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    myHistoryData(){
      //个人历史数据
      this.$http.get('/huoli/mobile/getInfos').then(({ data }) => {
          if (data) {
            this.detailData = data.data
            if(this.detailData.culture){
              culture.num1 = this.detailData.culture
              culture.num2 = this.detailData.culture
              culture.per = this.detailData.culture
            }
            if(this.detailData.averCulture){
              culture.num3 = this.detailData.averCulture
            }

            if(this.detailData.study){
              study.num1 = this.detailData.study
              study.num2 = this.detailData.study
              study.per = this.detailData.study
            }
            if(this.detailData.averStudy){
              study.num3 = this.detailData.averStudy
            }
            if(this.detailData.improve){
              improve.num1 = this.detailData.improve
              improve.num2 = this.detailData.improve
              improve.per = this.detailData.improve
            }
            if(this.detailData.averImprove){
              improve.num3 = this.detailData.averImprove
            }
            if(this.detailData.hse){
              hse.num1 = this.detailData.hse
              hse.num2 = this.detailData.hse
              hse.per = this.detailData.hse
            }
            if(this.detailData.averHse){
              hse.num3 = this.detailData.averHse
            }
            if(this.detailData.attendance){
              attendance.num1 = this.detailData.attendance
              attendance.num2 = this.detailData.attendance
              attendance.per = this.detailData.attendance
            }
            if(this.detailData.averAttendance){
              attendance.num3 = this.detailData.averAttendance
            }
            if(this.detailData.read){
              read.num1 = this.detailData.read
              read.num2 = this.detailData.read
              read.per = this.detailData.read
            }
            if(this.detailData.averRead){
              read.num3 = this.detailData.averRead
            }
            this.table.push(culture)
            this.table.push(study)
            this.table.push(improve)
            this.table.push(hse)
            this.table.push(attendance)
            this.table.push(read)

            myChart.forEach(item => {
              if (this.detailData[item.id]) {
                item.value = this.detailData[item.id]
              }
            })
            //画图
            this.drawMyChart(myChart)
            //获取我的历史信息
            this.getMyHistory()

            //获取机构名称
            this.getOrgInfo()
            //获取公司排名
            this.getAverData()
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
       })
    },
    drawMyChart(params){
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChartSet.series[0].data = params
      myChart.setOption(myChartSet)
    },
    getMyHistory(){
       this.$http.get('/huoli/mobile/myHistoryData').then(({ data }) => {
          if (data) {
            this.msHistoryData = data
            this.xAxisData = []
            this.msHistoryData.forEach(item => {
              if (item.month) {
                this.xAxisData.push(item.month)
              }
            })
            this.tabNum('total')
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
       })
    },
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 折线图
      myChart2.setOption({
        backgroundColor: '#fff',
        title: {
          text: '我的历史活力指数变化',
          x: 'center',
          textStyle:{
            fontSize:12,
          },
          top:20,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData,
          nameTextStyle:{
            fontWeight:100,
            fontSize:12,
          },
          axisLine:{
            show:true,
          }
        },
        yAxis: {
          type: 'value',
          axisLine:{
            show:true,
          }
        },
        series: [{
            data: this.dataNum,
            label: {
              normal: {
                  show: true,
                  position: 'top'
              }
            },
            color:"#3B7ACA",
            type: 'line',
            areaStyle: {}
        }]
      });
    },
    getOrgInfo() {
      const params = {}
      params.month = '2018-11'
     //本月企业名
      this.$http.get('/huoli/mobile/orgInfo',{params: params}).then(({ data }) => {
          if (data) {
            this.deptList = data.dept
            this.tagList = data.tag
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
       })
    },
    getAverData(deptId, groupId){
      console.log(1111)
      const params = {}
      params.deptId = deptId
      params.groupId = groupId
      params.month = '2018-11'
     //本月企业名
      this.$http.get('/huoli/mobile/averData',{params: params}).then(({ data }) => {
          if (data) {
            this.tableData = data.rows
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
       })
    },
    tabNum(index){
      this.dataNum = []
      this.msHistoryData.forEach(item => {
        if (item[index]) {
          this.dataNum.push(item[index])
        }
      })
      this.drawLine();
    },
    handleCommand(command) {
      this.getAverData(command, null)
    },
    handleCommand2(command) {
      this.getAverData(null, command)
    },
    //在<table>里，我们已经设置row的key值设置为每行数据id：row-key="id"
    rowClick(row, event, column) {
        Array.prototype.remove = function (val) {
            let index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };

        if (this.expands.indexOf(row.id) < 0) {
            this.expands.push(row.id);
        } else {
            this.expands.remove(row.id);
        }

    }
  }
}
const myChart = [
  {id:'read', value:0, name:'读书指数',itemStyle:{
    color:"rgba(35, 100, 158,1)"
  }},
  {id:'read',value:0, name:'企业文化',itemStyle:{
    color:"#65B5C2"
  }},
  {id:'culture',value:0, name:'学习成长',itemStyle:{
    color:"#4DA7C1"
  }},
  {id:'improve',value:0, name:'精益改善',itemStyle:{
    color:"#2E7BAD"
  }},
  {id:'hse',value:0, name:'HSE',itemStyle:{
    color:"#2E7BAD"
  }},
  {id:'attendance',value:0, name:'出勤指数',itemStyle:{
    color:"#23649E"
  }}
]
const myChartSet = {
    backgroundColor: '#fff',
    title : {
        text: '月活力指数比',
        textStyle:{
          fontSize:16,
        },
        left:15,
        top:18
    },
    tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data: [],
        itemStyle: {
            emphasis: {
                show: true,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                position: 'inner',
            },
            normal: {
                shadowBlur: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',

            }
        },
        labelLine: {
          normal: {
              smooth: 0.2,
              length: 1,
              length2: 5
          }
        }
      }
    ]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {font-weight: normal;}
ul {list-style-type: none;padding: 0;}
.top{height: 50px;width:100%;background-color: #4F77AB;font-size: 14px;color:#fff;line-height: 50px;}
.header{border-bottom:1px solid #E5E4E4;padding:10px;display: flex;background-color: #fff;}
.header-img{width:30%;}
.header-img img{height: 70px;width: 70px;border-radius: 50%;}
.header-product{text-align: left;margin-top:10px;}
.echats-bing-header{padding:10px 15px;color:#4F77AB;margin-top: 5px;background-color: #fff;font-size: 16px;border-bottom: 1px solid #E5E4E4;}
.font{font-size: 30px;color:#5B88B3;}
.table-name{width:25%;text-align: right;}
.button{height: 40px;border:1px solid #3B7ACA; color:#3B7ACA;border-radius: 5px;margin:0 20px;width:60px;line-height: 40px;display: inline-block;margin:0px 10px 10px 10px;}
.paiming{padding:10px;background-color: #fff;}
.paihangTab{width:30%;box-shadow: 0px 0px 5px rgba(0,0,0,0.5);margin:5px;border-radius: 5px;font-size:12px;padding:5px;margin-top:20px;}
.name{height: 30px;line-height: 30px;font-size: 14px;text-align: left;padding:0 10px;}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
/deep/ .el-table__expanded-cell[class*=cell]{padding:10px;}
.el-dropdown-link {cursor: pointer;}
.el-icon-arrow-down {font-size: 12px;}
/deep/ .el-dropdown-menu__item{font-size: 12px;padding: 0 10px; }
</style>
