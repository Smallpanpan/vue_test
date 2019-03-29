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
            this.$alert('你没有订单哦！', '提示', {   //返回其他情况
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
                progress:4,

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
