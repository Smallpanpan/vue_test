<template>


  <div class="his">
    <p>维修、投诉</p>
    <cardHistory :option="DataOption"></cardHistory>
    <el-col span="4">
      <el-select v-model="value" placeholder="请选择维修类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col span="2"><el-button type="primary" @click="submitRepair"><b>维修</b></el-button></el-col>
    <el-col span="12">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入投诉内容内容"
        v-model="complaint">
      </el-input>
    </el-col>
    <el-col span="4"> <el-button type="primary" @click="submitcom"><b>投诉</b></el-button></el-col>

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
          value: '1',
          label: '汽车车胎爆了'
        }, {
          value: '2',
          label: '汽车没油了/没电了'
        }, {
          value: '3',
          label: '无法发动，故障不明'
        }, {
          value: '4',
          label: '其他维修'
        },
        ],
        value: '',

        DataOption: {
          data:[
            //测试数据
            {all_price: 500,
              location: "韶关市韶关学院店",
              system_id: "Audi Sport-奥迪TT RS",
              astart:20123564556,
              aend:12345645,
              start:123456565613,
              end:15615656,
              progress:4},


          ],
        },
      }

    },
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    methods: {
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
          axios.post('/api/myorder/getrep',{retype:this.value}).then(response => {
          });
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
        }
      },
      //  提交投诉内容
      submitcom(){
        if(!this.complaint){
          this.$message({
            message: '请输入您要投诉的内容',
            type: 'warning'
          });
        }else{
          axios.post('/api/myorder/getcom',{retype:this.complaint}).then(response => {
          });
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
        }
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
</style>




