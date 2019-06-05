<template>


  <div class="his">
    <p>我的历史订单</p>
    <cardHistory :option="DataOption"></cardHistory>
  </div>
</template>

<script>
  import cardHistory from './../components/card-history'
  import axios from 'axios'
  export default {
    name: 'myhisorder',
    components: {
      cardHistory,
    },
    data(){
      return{
        DataOption: {
          data:[
            //测试数据

          ],
        },
      }

    },
    created() {},
    mounted() {this.gethisorder();},
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
      gethisorder(){
        axios.post('/api/Order/gethisorder',{userid:localStorage.getItem("uid"),}).then(response => {
          let res = response.data;      //返回历史订单数组
          let len = res.length;
          if(len ==0){
            this.$alert('你没有订单哦！', '提示', {   //返回其他情况
              confirmButtonText: '确定'
            });
          }

          for(var i =0; i < len; i++){
            this.DataOption.data.push(
              {
                all_price:res[i].o_all_price,
                location:"韶关市韶关学院店",
                system_id:res[i].system_id ,
                astart:res[i].astart,
                aend:res[i].aend,
                end:res[i].end,
                progress:3,
              }
            );
          }

        })

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
