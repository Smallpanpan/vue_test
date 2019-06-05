<!--这是对正在进行的订单的管理：有投诉、维护、续租、还车功能-->
<template>
  <div class="his">
    <p>还车和换车申请</p>
    <cardHistory :option="DataOption"></cardHistory>

    <div class="his1">
      <el-row span="24">
        <!--<el-col span="6"><div class="block">-->
          <!--<span class="demonstration"></span>-->
          <!--<el-date-picker-->
            <!--v-model="value1"-->
            <!--type="datetime"-->
            <!--placeholder="请选择续租时间">-->
          <!--</el-date-picker>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--<el-col span="3"><el-button type="primary"><b>续租</b></el-button></el-col>-->
        <el-col span="6">
          <el-select v-model="value" placeholder="请选择维修类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col span="3"><el-button type="primary" @click="submitRepair"><b>换车</b></el-button></el-col>
        <el-col span="7"><el-button type="success" round @click="submitReturn()"><b>一键还车</b></el-button></el-col>

      </el-row>
      <el-row span="24">

        <el-col span="2">&nbsp;</el-col>
        <el-col span="8">
          <!--<el-input-->
            <!--type="textarea"-->
            <!--:autosize="{ minRows: 2, maxRows: 4}"-->
            <!--placeholder="请输入投诉内容内容"-->
            <!--v-model="complaint">-->
          <!--</el-input>-->
        </el-col>
        <!--<el-col span="4"> <el-button type="primary" @click="submitCom"><b>投诉</b></el-button></el-col>-->
      </el-row>

      <!--<div class="block1">-->
        <!--<h4>投诉回复：</h4></div></br>-->
        <!--<el-timeline>-->
          <!--<el-timeline-item  placement="top" v-for="(item, i) in message" >-->
            <!--<el-card class="block1">-->
              <!--<h4>{{item.mess}}</h4>-->
              <!--<p>{{item.time}}</p>-->
            <!--</el-card>-->
          <!--</el-timeline-item>-->
        <!--</el-timeline>-->
      </div>
    </div>



  </div>
</template>

<script>
  import cardHistory from './../components/card-history'
  import axios from 'axios'
  export default {
    name: 'Repair',
    components: {
      cardHistory,
    },
    data(){
      return{
        complaint:'',   //投诉内容
        options: [{
          value: '汽车车胎爆了',
          label: '汽车车胎爆了'
        }, {
          value: '汽车没油了/没电了',
          label: '汽车没油了/没电了'
        }, {
          value: '无法发动，故障不明',
          label: '无法发动，故障不明'
        }, {
          value: '其他故障',
          label: '其他故障'
        },
        ],
        value: '',
        //投诉回复内容
        message:[
          {
            mess:"已经收到你的投诉投诉了",
            time:"2018年12月13日"
          },
          {
            mess:"已经收到你的投诉投诉了",
            time:"2018年12月13日"
          },


        ],

        DataOption: {
          data:[{ all_price: 500,
            location: "韶关市韶关学院店",
            system_id: " RS",
            astart:"4月2日8:00",
            aend:"4月3日8:00",
            start:"4月4日8:00",
            end:"4月4日8:00",
            progress:3,}]
        },
      }

    },
    created() {

      },
    mounted() {
       this.getMyOrder();
      },
    watch: {},
    computed: {},
    updated(){
      //  this.getMyOrder();

    },
    methods: {
      //获取订单列表数据
      //获取progress:、all_price: 500
      // <el-step title="取车" icon="el-icon-caret-top" :description="item.astart"></el-step>
    // <el-step title="还车" icon="el-icon-caret-bottom" :description="item.aend"></el-step>
    // <el-step title="订单完成" icon="el-icon-success" :description="item.end"></el-step>
      getMyOrder()
      {
        axios.post('/api/Order/test',{
          orderId:sessionStorage.getItem("orderId"),
        }).then(response => {
          let res = response.data;
          this.DataOption.data[0].progress =2;
          this.DataOption.data[0].all_price =res.all_price ;
          this.DataOption.data[0].location ="韶关市韶关学院店";
          this.DataOption.data[0].system_id =res.system_id;
          this.DataOption.data[0].astart=res.o_start;
          this.DataOption.data[0].aend =res.o_end;
          this.DataOption.data[0].end =0;
        })
      },
      //  时间戳转时间函数
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳转时间
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        var D = date.getDate() + '日 ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() ;
        // var s = date.getSeconds();
        return M+D+h+m;
      },
      //  获取后台订单数据方法
      gethisorder(uid){
        axios.get('/api/myorder/gethisorder',{id:uid}).then(response => {
          let res = response.data;      //返回历史订单数组
          let len = res.length;
          if(len ==0){
            this.$alert('你当前没有订单哦！', '提示', {   //返回其他情况
              confirmButtonText: '确定'
            });
          }

          for(var i =0; i < len; i++){
            this.DataOption.data.push(
              {
                all_price:res[i].all_price ,
                location:res[i].location ,
                system_id:res[i].system_id ,
                astart:this.timestampToTime(res[i].astart),
                aend:this.timestampToTime(res[i].aend),
                start:this.timestampToTime(res[i].start),
                end:this.timestampToTime(res[i].end),
                progress:res[i].progress,
              }
            );
          }
        })
      },
      //提交维修
      submitRepair(){
        if(!this.value){
          this.$message({
            message: '请选择你要维修的类型',
            type: 'warning'
          });
        }else{
          axios.post('/api/Order/getrep',{
            retype:this.value,
            orderId:sessionStorage.getItem("orderId")}).then(response => {
          });
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
        }
      },
      //  提交投诉内容
      // submitCom(){
      //   if(!this.complaint){
      //     this.$message({
      //       message: '请输入您要投诉的内容',
      //       type: 'warning'
      //     });
      //   }else{
      //     axios.post('/api/myorder/getcom',{retype:this.complaint}).then(response => {
      //     });
      //     this.$message({
      //       message: '提交成功！',
      //       type: 'success'
      //     });
      //   }
      // },
    //  提交还车
      submitReturn(){
        this.$confirm('是否确认还车?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/api/Order/putReturn',{
            orderId:sessionStorage.getItem("orderId"),
          }).then(response =>{

          });
        }).catch(() => {
          next(false)
        });



      },
    //  提交续租请求
      submitRenewal(){
        axios.post('/api/Car/myorder',{
          startTime:start,
          endTime:end,
          carId:cId,
          uid:id,
          stid:sid
        }).then(response =>{
          let res=response.data;

        });
      },

    }


  }
</script>

<style scoped>
  .his p{
    font-size: 25px;
  }
  .his{
    margin: 0px 100px;
  }
  .his1{
    margin: 0px 50px;
  }
  .el-row {
    margin: 50px 0px;
  }
  .block1 {
    text-align: left;

  }

  .block1 p{
    font-size: 12px;
  }

</style>




