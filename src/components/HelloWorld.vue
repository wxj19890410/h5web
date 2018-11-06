<template>
  <div class="hello">
    <div class="top">活力指数</div>
    <div class="header">
      <div class="header-img"><img :src="avatar"></div>
      <div class="header-product">
        <div style="font-size:14px;color:#4F77AB;">正式员工</div>
        <div style="font-size:16px;">{{userName}}</div>
        <div style="font-size:12px;color:#949494;">codeId:{{codeId}}</div>
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
          <div style="font-size:15px;margin-top:20px;">上月排名：</div><div style="margin-top:10px;"><span class="font">88</span>/300</div>
          <div style="margin-top:10px;">公司平均值：<div class="font">300</div></div>
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
          <el-progress :text-inside="true" :stroke-width="5" :percentage="item.per" :color="item.color" :show-text="false"></el-progress></div>
          <div style="width:25%;color:#5B88B3;">{{item.num2}}</div>
          <div style="width:25%;color:#5B88B3;">{{item.num3}}</div>
        </div>
      </div>
    </div>
    <div id="myChart2" :style="{width: '100%', height: '280px'}" style="margin-top:10px;"></div>
    <div style="padding:0 20px;background-color:#fff;margin-bottom:10px;padding-bottom:30px;">
      <div class="button" v-for="(item,index) in tab" @click="tabNum(index)">{{item}}</div>
    </div>
    <div class="paiming">
      <div style="background-color:#F7FAFA;font-size:16px;padding:10px 0;">上月活力指数排名</div>
      <div style="display:flex;width:100%;justify-content:center;margin-bottom:30px;">
        <div class="paihangTab" @click="bang(5)">公司总排行榜</div>
        <el-dropdown @command="handleCommand" class="paihangTab">
          <span class="el-dropdown-link" >
            生产部门<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">生产部门1</el-dropdown-item>
            <el-dropdown-item command="b">生产部门2</el-dropdown-item>
            <el-dropdown-item command="c">生产部门3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand2" class="paihangTab">
          <span class="el-dropdown-link" >
            非生产部门<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">非生产部门1</el-dropdown-item>
            <el-dropdown-item command="b">非生产部门2</el-dropdown-item>
            <el-dropdown-item command="c">非生产部门3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div></div>
      <el-table
        :data="tableData5"
        stripe
        row-key="id"
        :expand-row-keys="expands"
        @row-click="rowClick"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="企业文化">
                <span>{{ props.row.zhishu1 }}</span>
              </el-form-item>
              <el-form-item label="学习成长">
                <span>{{ props.row.zhishu2 }}</span>
              </el-form-item>
              <el-form-item label="精益改善">
                <span>{{ props.row.zhishu3 }}</span>
              </el-form-item>
              <el-form-item label="HSE">
                <span>{{ props.row.zhishu4 }}</span>
              </el-form-item>
              <el-form-item label="出勤指数">
                <span>{{ props.row.zhishu5 }}</span>
              </el-form-item>
              <el-form-item label="读书指数">
                <span>{{ props.row.zhishu6 }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="排名"
          prop="id">
        </el-table-column>
        <el-table-column
          label="员工"
          prop="name">
        </el-table-column>
        <el-table-column
          label="总指数"
          prop="desc">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      access_token: '123',
      userId: '123',
      avatar: '/static/header.png',
      userName: '123',
      codeId: null,
      table:[{name:"企业文化",num1:22,num2:30, num3:100,color:"#B23331",per:30},{name:"学习成长",num1:22,num2:40, num3:100,color:"#2E3E4C",per:40},{name:"精益改善",num1:22,num2:50, num3:100,color:"#60979F",per:50},{name:"HSE",num1:22,num2:60, num3:100,color:"#C87A5E",per:60},{name:"出勤指数",num1:22,num2:70, num3:100,color:"#8EC0A6",per:70},{name:"读书指数",num1:22,num2:80, num3:100,color:"#6F967A",per:80},],
      dataNum:[82, 93, 90, 93, 12, 13, 13,22,52,25,56,11],
      dataNum1:[82, 93, 90, 93, 12, 13, 13,22,52,25,56,11],
      dataNum2:[55, 54, 45, 54, 23, 55, 76,23,54,26,54,11],
      dataNum3:[82, 93, 90, 93, 12, 13, 13,22,52,25,56,55],
      dataNum4:[82, 33, 90, 55, 12, 88, 13,22,52,25,56,11],
      dataNum5:[11, 44, 90, 93, 12, 13, 13,22,52,25,56,11],
      dataNum6:[82, 93, 55, 93, 77, 13, 44,22,66,76,56,11],
      tab:['总指数','企业文化','学习成长','精益改善','HSE','出勤指数','读书指数',],
      paiTab:['公司总排行榜','部门指数榜','组织活力榜','生产部门'],
      tableData5: [{id: '1',name: '张海',desc: '88',zhishu1: '88',zhishu2: '88',zhishu3: '88',zhishu4: '88',zhishu5: '88',zhishu6: '88',}, {id: '2',name: '张海2',desc: '77',zhishu1: '77',zhishu2: '77',zhishu3: '77',zhishu4: '77',zhishu5: '77',zhishu6: '77',}, {id: '3',name: '张海3',desc: '66',zhishu1: '66',zhishu2: '66',zhishu3: '66',zhishu4: '66',zhishu5: '66',zhishu6: '66',}, {id: '4',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '5',name: '张海4',desc: '44',zhishu1: '44',zhishu2: '44',zhishu3: '44',zhishu4: '44',zhishu5: '44',zhishu6: '44',},{id: '6',name: '张海4',desc: '33',zhishu1: '33',zhishu2: '33',zhishu3: '33',zhishu4: '33',zhishu5: '33',zhishu6: '33',},{id: '7',name: '张海4',desc: '22',zhishu1: '22',zhishu2: '22',zhishu3: '22',zhishu4: '22',zhishu5: '22',zhishu6: '22',},{id: '8',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '9',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '10',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},],
      tableData1: [{id: '1',name: '张海111',desc: '88',zhishu1: '88',zhishu2: '88',zhishu3: '88',zhishu4: '88',zhishu5: '88',zhishu6: '88',}, {id: '2',name: '张海2',desc: '77',zhishu1: '77',zhishu2: '77',zhishu3: '77',zhishu4: '77',zhishu5: '77',zhishu6: '77',}, {id: '3',name: '张海3',desc: '66',zhishu1: '66',zhishu2: '66',zhishu3: '66',zhishu4: '66',zhishu5: '66',zhishu6: '66',}, {id: '4',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '5',name: '张海4',desc: '44',zhishu1: '44',zhishu2: '44',zhishu3: '44',zhishu4: '44',zhishu5: '44',zhishu6: '44',},{id: '6',name: '张海4',desc: '33',zhishu1: '33',zhishu2: '33',zhishu3: '33',zhishu4: '33',zhishu5: '33',zhishu6: '33',},{id: '7',name: '张海4',desc: '22',zhishu1: '22',zhishu2: '22',zhishu3: '22',zhishu4: '22',zhishu5: '22',zhishu6: '22',},{id: '8',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '9',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '10',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},],
      tableData2: [{id: '1',name: '张海222',desc: '88',zhishu1: '88',zhishu2: '88',zhishu3: '88',zhishu4: '88',zhishu5: '88',zhishu6: '88',}, {id: '2',name: '张海2',desc: '77',zhishu1: '77',zhishu2: '77',zhishu3: '77',zhishu4: '77',zhishu5: '77',zhishu6: '77',}, {id: '3',name: '张海3',desc: '66',zhishu1: '66',zhishu2: '66',zhishu3: '66',zhishu4: '66',zhishu5: '66',zhishu6: '66',}, {id: '4',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '5',name: '张海4',desc: '44',zhishu1: '44',zhishu2: '44',zhishu3: '44',zhishu4: '44',zhishu5: '44',zhishu6: '44',},{id: '6',name: '张海4',desc: '33',zhishu1: '33',zhishu2: '33',zhishu3: '33',zhishu4: '33',zhishu5: '33',zhishu6: '33',},{id: '7',name: '张海4',desc: '22',zhishu1: '22',zhishu2: '22',zhishu3: '22',zhishu4: '22',zhishu5: '22',zhishu6: '22',},{id: '8',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '9',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '10',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},],
      tableData: [{id: '1',name: '张海',desc: '88',zhishu1: '88',zhishu2: '88',zhishu3: '88',zhishu4: '88',zhishu5: '88',zhishu6: '88',}, {id: '2',name: '张海2',desc: '77',zhishu1: '77',zhishu2: '77',zhishu3: '77',zhishu4: '77',zhishu5: '77',zhishu6: '77',}, {id: '3',name: '张海3',desc: '66',zhishu1: '66',zhishu2: '66',zhishu3: '66',zhishu4: '66',zhishu5: '66',zhishu6: '66',}, {id: '4',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '5',name: '张海4',desc: '44',zhishu1: '44',zhishu2: '44',zhishu3: '44',zhishu4: '44',zhishu5: '44',zhishu6: '44',},{id: '6',name: '张海4',desc: '33',zhishu1: '33',zhishu2: '33',zhishu3: '33',zhishu4: '33',zhishu5: '33',zhishu6: '33',},{id: '7',name: '张海4',desc: '22',zhishu1: '22',zhishu2: '22',zhishu3: '22',zhishu4: '22',zhishu5: '22',zhishu6: '22',},{id: '8',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '9',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},{id: '10',name: '张海4',desc: '55',zhishu1: '55',zhishu2: '55',zhishu3: '55',zhishu4: '55',zhishu5: '55',zhishu6: '55',},],
      expands: []
    }
  },
  create(){
    
  },
  mounted(){
    this.codeId = this.$route.query.code
    this.getInfo()
    // this.$store.commit('setLoginUuid', this.$route.query.code);
    // this.init()
    // this.myHistoryData()
    // this.historyData()
    this.drawLine();
  },
  methods: {
    getuserdetail() {
      const params3= {}
      params3.access_token= this.access_token
      params3.userid= this.userId
      this.$http.get('/wx/user/get', {params: params3}).then(({ data }) => {
        if (data && data.errcode ===0) {
          this.userName = data.name
          this.avatar = data.avatar
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    getuserinfo() {
      const params2= {}
      params2.access_token= this.access_token
      params2.code= this.codeId
      this.$http.get('/wx/user/getuserinfo', {params: params2}).then(({ data }) => {
        if (data) {
          this.userId = data.UserId
          this.getuserdetail()
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      })
    },
    getInfo() {
      this.$http.get('/wx/gettoken', {params: window.GLOBLE.params}).then(({ data }) => {
        if (data && data.errcode ===0) {
          this.access_token = data.access_token
          this.getuserinfo()
          
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
      this.$http.get('/mobile/myHistoryData').then(({ data }) => {
          if (data) {
           
            console.log(data)
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
       })
    },
    historyData(){
      const params = {}
      params.month = '2018-11'
     //本月企业名
      this.$http.get('/mobile/historyData',{params: params}).then(({ data }) => {
          if (data) {
           
            console.log(data)
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
       })
    },
    init(){
      /* const params = {}
      params.month = '2018-11'
      //获取个人信息  扇形图  条形图数据
      this.$http.get('/mobile/getInfos',{params: params}).then(({ data }) => {
          if (data) {
           
            console.log(data)
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
       }) */


    },
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#fff',

        title : {
            text: '月活力指数比',
            textStyle:{
              fontSize:16,
            },
            left:15,
            top:18,
            
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'读书指数',itemStyle:{
                      color:"rgba(35, 100, 158,1)",
                    }},
                    {value:310, name:'企业文化',itemStyle:{
                      color:"#65B5C2",
                    }},
                    {value:234, name:'学习成长',itemStyle:{
                      color:"#4DA7C1",
                    }},
                    {value:135, name:'精益改善',itemStyle:{
                      color:"#2E7BAD",
                    }},
                    {value:154, name:'HSE',itemStyle:{
                      color:"#2E7BAD",
                    }},
                    {value:310, name:'出勤指数',itemStyle:{
                      color:"#23649E",
                    }},
                ],
                
                 
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
                },
            }
        ]
      });
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
          data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12',],
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
    tabNum(index){
      console.log(index)
      if(index==0){
        this.dataNum = this.dataNum1
      }else if(index==1){
        this.dataNum = this.dataNum2
      }else if(index==2){
        this.dataNum = this.dataNum3
      }else if(index==3){
        this.dataNum = this.dataNum4
      }else if(index==4){
        this.dataNum = this.dataNum5
      }else if(index==5){
        this.dataNum = this.dataNum6
      } 
      this.drawLine();
    },
    handleCommand(command) {
      this.tableData5 = this.tableData1
    },
    handleCommand2(command) {
      this.tableData5 = this.tableData2
    },
    bang(){
      this.tableData5 = this.tableData
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
