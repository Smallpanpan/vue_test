<template>
  <div>
    <!--//轮播背景-->
    <el-carousel :interval="4000"  height="500px">
      <el-carousel-item v-for="item in easyDataOption.data" :key="item">
        <img v-bind:src="item.src" alt="图片加载失败啦" width="100%" height="100%">
      </el-carousel-item>
    </el-carousel>
    <!--//时间地点选择表单-->
    <div class="selectCar" >
      <span class="demonstration" >即刻租车</span>

        <div class="block">
          <el-date-picker v-model="si.value" type="datetimerange" align="right" start-placeholder="取车时间" end-placeholder="还车日期" :default-time="['08:00:00', '09:00:00']" value-format="timestamp" class="picker">
          </el-date-picker>
        </div>
        <div class="blockse" >
          <el-cascader placeholder="取车网点" :options="options" filterable v-model="si.site" width="40px" class="picker"></el-cascader>
        </div>
      <el-button class="btn" @click="postCarlist(si.site,si.value)">马上预定</el-button>
    </div>

    <!--确定跳转按钮①表单信息储存到store-->
    <!--v-for="item in img" :key="item"-->
    <div class="fig">
      <figure>
        <img src="//static.wkzuche.com/www/images/index/range_icon.png">
        <figcaption>
          <div>快速出车</div>
          <p>下单5分钟内即可出车</p>
          <p>智能安排车辆调度</p>

        </figcaption>
      </figure>
      <figure>
        <img src="//static.wkzuche.com/www/images/index/optional-vehicle-icon.png">
        <figcaption>
          <div>可选车辆多</div>
          <p>200+车型</p>
          <p>20000+车辆</p>
        </figcaption>
      </figure>
      <figure>
        <img src="//static.wkzuche.com/www/images/index/service_icon.png">
        <figcaption>
          <div>品质服务好</div>
          <p>7*24H专属客服</p>
          <p>品质服务保障</p>
        </figcaption>
      </figure>
    </div>

    <div>
      <br><h1>简单，随时，随地</h1><br>
      <p>无论你在哪，想去哪，</p>
      <p>即刻租车带你即刻出发。</p>
    </div>
      <div class="block">
        <cardiscount :option="easyDataOption"></cardiscount>
      </div>





  </div>

</template>

<script>
  import cardiscount from './../components/car-discount-card'
  import axios from 'axios'

    export default {
        name: "GoodsSelect",
      components: {
        cardiscount,
      },
      data(){
          return{

            easyDataOption:{
              data:[],
            },
            si:{
              value:'',
              site:'',
            },

            options:[],
            //   [{
            //   value: 'zhinan',
            //   label: 'test',
            // },
            //   {
            //     value: 'guangzhou',
            //     label: '广州',
            //     children:[
            //       {
            //         value: 'shejiyuanze',
            //         label: '海珠区',
            //         children:[
            //           {
            //             value: '海珠广场店',
            //             label: '海珠广场店'
            //           },{
            //             value: '1003',
            //             label: '韶关市韶关学院店'
            //           }
            //         ]
            //       },
            //
            //     ]
            //   }],


          }
      },
      mounted(){
          this.postdiscount();
          if( this.$route.params.err){
            this.$message({
              type: 'warning',
              message: '您还没登录呀！请先登录噢'
            });
          }

      },


      methods:{
        postdiscount(){
          axios.get('/api/Base/readposter').then(response => {
            let res = response.data;
            let poster = res.poster;
            let store = res.store;
            let region = res.region;
            let city = res.city;
            let num1 = res.num1;
            let num2 = res.num2;
            sessionStorage.setItem('num1',num1);
            sessionStorage.setItem('num2',num2);
            sessionStorage.setItem('store',JSON.stringify(store));
            sessionStorage.setItem('city',JSON.stringify(city));
            sessionStorage.setItem('region',JSON.stringify(region));
            let p = 0;
            for(let i=0;i<num1;i++){
           //   最外层循环，每次循环完毕将结果push进最外层数组
              let temp = { value: city[i].name, label: city[i].name ,children:"" };
              this.options.push(temp);
              let tm =[];
                 for(let n=0;n<region[i+1].length;n++)
              // //第二层循环，为上层的children赋值，循环次数是二维数组最内层的子项个数
               {

                 tm.push({ value: region[i+1][n], label:region[i+1][n],children:""  });
                let st = [];
                for(let m =0;m<store[p].length;m++)
                {
                    st.push( {
                        value: store[p][m].id,
                        label: store[p][m].car_store_site
                    });
                }
                 p = p+1;
                 tm[n]['children'] = st;
               }
              this.options[i]['children'] = tm;
             }




              for(var i = 0,l = poster.length; i < l; i++){
                this.easyDataOption.data.push(                               //如果符合条件则将返回的数据渲染到前台数组中
                  {
                    dis_photo_url:poster[i].car_photo_url,     //图片接口
                    title:poster[i].title,
                    page:poster[i].page,
                    src:poster[i].car_photo_url2
                  }
                );

            }
          })
        },
        postCarlist(site,stime){
          if(site.length == 0||stime.length == 0){    //验证输入数据是否为空
            this.$message({
              type: 'warning',
              message: '请输入完整时间、地点'
            });
          }else{
            var today=new Date();

            if(stime[0]<today){                        //验证输入的时间是否正确（只能预定）
              this.$message({
                type: 'warning',
                message: '请输入至少2个小时后的时间段'
              });
            }else{
              // console.log('test')
               this.$router.push({ name: 'CarsList',params: { selectsite:this.si}});

            }

          }

        },

      }

    }
</script>

<style scoped>
  p{
    line-height: 175%;
    letter-spacing:2px;
  }

  figure {
    width: 33.3333%;
    float: left;
    text-align: center;
    cursor : pointer;
    margin: 30px 0px;
    padding: 20px 0px;
    border-bottom:1px solid #00a0e1;

  }
  .picker{
    width: 90%;
  }

  .block{
    padding-top: 30px;
  }
  .blockse{
    padding: 20px 0px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.6;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .demonstration{
    padding-top: 10px;
    font-size: 23px;
  }

</style>
<style lang ="scss" scoped>
  .btn{
    margin-top: 20px;
    width: 90%;
    border-radius: 20px;
    transition:all .5s ease-in-out;
    border:1px solid #00a0e1;

  }
  .btn:hover{
    background-color: #a5a762;
    color: white;
  }
  .selectCar{
    position: absolute;
    left: 20px;
    top: 190px;
    z-index: 20;
    width: 345px;
    height: 280px;
    overflow: hidden;
    color: white;
    border-radius: 5px;
    border-color: #00a0e1;
    border-width: 1px;
    border-style: solid;
    font-size: 17px;
    transition:all .5s ease-in-out;
    opacity: 0.8;
    padding-top: 20px;
  }
  .selectCar:hover{
    background-color: #99a9bf;
    opacity: 0.9;
  }


</style>
