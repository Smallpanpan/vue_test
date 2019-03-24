<template>
  <div>
    <div class="container">

      <el-row>
        <el-col :xs="0" :sm="13" :md="13" :lg="11" :xl="{span:10, offset:2}"><div class="grid-content">
          <div class="block">
            <span class="demonstration">选择时间：</span>
            <el-date-picker v-model="value" type="datetimerange" align="right" start-placeholder="取车时间" end-placeholder="还车时间" :default-time="['08:00:00', '09:00:00']" value-format="timestamp">
            </el-date-picker>
          </div>
        </div></el-col>
        <el-col :xs="0" :sm="0" :md="0" :lg="0" :xl="3"></el-col>
        <el-col :xs="0" :sm="10" :md="9" :lg="9" :xl="8"  ><div class="grid-content">
          <div class="blocks">
            <span >选择网点：</span>
            <el-cascader placeholder="试试搜索店面" :options="options" filterable v-model="site"></el-cascader>
          </div>
        </div></el-col>
        <el-col :xs="0" :sm="2" :md="2" :lg="2" :xl="2"  ><div class="grid-content">
          <el-button @click="postCarlist(site,value)" type="success" :loading="loadtest" class="allbutton">马上预定</el-button>
        </div></el-col>
      </el-row>
    </div>



          <div class="showcar">
            <p>车型</p>
            <ul>

              <li @click="choiceCar('不限')">
                <a href="javascript:void(0);">
                  <svg class="icon" aria-hidden="true">
                    <use class="icoe" xlink:href="#icon-xiaojiaoche" > </use>
                  </svg>
                  <p class="pfont">不限</p>
                </a>
              </li>


              <li @click="choiceCar('电动车')">
                <a href="javascript:void(0);">
                  <svg class="icon" aria-hidden="true">
                    <use class="icoe" xlink:href="#icon-electric_car_" ></use>
                  </svg><p class="pfont">电动车</p></a>

              </li>
              <li @click="choiceCar('SUV')">
                <a href="javascript:void(0);">
                  <svg class="icon" aria-hidden="true">
                    <use class="icoe" xlink:href="#icon-suv" ></use>
                  </svg><p class="pfont">SUV</p></a>
              </li>
              <li >
                <a href="javascript:void(0);">
                  <svg class="icon" aria-hidden="true">
                    <use class="icoe" xlink:href="#icon-xiaoche" ></use>
                  </svg><p class="pfont">商务车</p></a>
              </li>
              <li >
                <a href="javascript:void(0);">
                  <svg class="icon" aria-hidden="true">
                    <use class="icoe" xlink:href="#icon-qicheqianlian-" ></use>
                  </svg><p class="pfont">个性车</p></a>
              </li>
              <li  @click="choiceCar('跑车')">
                <a href="javascript:void(0);">
                  <svg class="icon" aria-hidden="true">
                    <use class="icoe" xlink:href="#icon-paoche" ></use>
                  </svg><p class="pfont">跑车</p></a>
              </li>
            </ul>

            <p>价格(元/天)</p>
            <ul>
              <div class="slidertest">
                <el-slider v-model="value_price" range=""  show-stops :min="100" :max="500" :step="100">
                </el-slider>
              </div>

              <li><p class="pfont">100</p></li>
              <li><p class="pfont">300</p></li>
              <li><p class="pfont">500</p></li>
            </ul>
            <p ><B>网点地址</B></p> <br>

            <baidu-map class="map" :center="{lng:lng, lat:lat}" :zoom="15">
              <bm-marker :position="{lng:lng, lat:lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <bm-label :content=storesite :labelStyle="{color: 'red', fontSize : '14px'}" :offset="{width: -25, height: 20}"/>
              </bm-marker>
            </baidu-map>

          </div>


          <div class="item list">
            <nx-data-card :option="easyDataOption0"></nx-data-card>
          </div>









  </div>

</template>

<script>
  import nxDataCard from './../Modal/nx-data-card'
  import axios from 'axios'
  import iconfont from './../assets/svg/iconfont'
    export default {



        name: "GoodsList",
      components: {
         nxDataCard,
      },

      data(){

            return{
              lng: '',
              lat:'',        //店面坐标
              storesite:'',       //店面名字
              loadtest:false,
              value_price:[100,500],        //价格选择渲染
              //时间地点选着器
              value:'',
              site:'',
              options: [],




              easyDataOption0: {

                span: 5,
                borderColor: '#83ac62',
                colorText:'#000000',
                bgText:'#beb2be',

                data:[],

              },


            }
      },
      mounted(){
        this.playup();
      let site=this.$route.params.selectsite;
      if(site.value.length>0){
        this.site=site.site;
        this.postCarlist(site.site,site.value);

      }
      },
      updated(){
        this.playup();
      },
      created() {
        // postCarlist()
      },
      watch:{
        value_price: function(){
          if(this.easyDataOption0.data.length>0){
          for(var i = 0,l = this.easyDataOption0.data.length; i < l; i++){
            if(this.easyDataOption0.data[i].car_daily_price>=this.value_price[0]&&this.easyDataOption0.data[i].car_daily_price<=this.value_price[1]){
              this.easyDataOption0.data[i].carprice=true;
            }else{
              this.easyDataOption0.data[i].carprice=false;
            }
          }
        }},


      },

      methods:{
          //条件渲染函数，选择指定车型按钮出现指定车辆
          choiceCar(car){
            if(this.easyDataOption0.data.length>0){     //当渲染展示汽车数组不为空时才可以做条件渲染
              if(car=="不限"){                  //条件渲染就是通过设置v-show来设置该数组是否展示
                for(var i = 0,l = this.easyDataOption0.data.length; i < l; i++){
                  this.easyDataOption0.data[i].carshow=true;
                }
              }else{
                for(var i = 0,l = this.easyDataOption0.data.length; i < l; i++){
                  if(car!=this.easyDataOption0.data[i].car_type){
                    this.easyDataOption0.data[i].carshow=false;
                  }else{
                    this.easyDataOption0.data[i].carshow=true;
                  }

                }
              }
            }
          },

        playup(){
             let num1 = sessionStorage.getItem('num1');
            let num2 = sessionStorage.getItem('num2');
             let store = JSON.parse(sessionStorage.getItem('store'));
             let city = JSON.parse(sessionStorage.getItem('city'));
             let region = JSON.parse(sessionStorage.getItem('region'));

              let p =0;
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
             console.log(this.options);
        },



        postCarlist(site,stime){
              let st = JSON.parse(sessionStorage.getItem('store'));
              for(let i=0;i<st.length;i++)
              {
                for(let n=0;n<st[i].length;n++)
                {
                  if(st[i][n].id==site[2]){
                    this.storesite =st[i][n].car_store_site;
                    this.lng=st[i][n].lng ;
                    this.lat=st[i][n].lat;
                    break;
                  }

                }

              }
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
                if(this.easyDataOption0.data.length>0){       //把上一次请求的数据清空
                  let len = this.easyDataOption0.data.length;
                  this.easyDataOption0.data.splice(0,len);
                };
                axios.post('/api/public/Car/selectcar',{
                  pickUp:site[2],
                  startTime:stime[0],
                  endTime:stime[1],
                }).then(response => {
                  sessionStorage.setItem("startTime",stime[0]);     //记住选着时间
                  sessionStorage.setItem("endTime",stime[1]);
                  sessionStorage.setItem("pickUp",site[2]);
                  let res = response.data;// 现在后台返回的是一组汽车信息数组（这是二维数组）[{"car_brand":"奥迪","car_series":"Q3"},{"car_brand":"奥迪1","car_series":"Q5"},]
                  if(res.status==1){
                    this.$alert('你选择时段的车车已经租完啦！', '提示', {   //返回其他情况
                      confirmButtonText: '确定'
                    });
                  }else {
                    if(res[0].car_seat){
                      for(var i = 0,l = res.length; i < l; i++){
                        this.easyDataOption0.data.push(                               //如果符合条件则将返回的数据渲染到前台数组中
                          {
                            car_photo_url:res[i].car_photo_url,
                            car_brand :res[i].system_id,
                            car_series:res[i].car_series,
                            car_type:res[i].car_type,
                            car_displacement:res[i].car_displacement,
                            car_seat:res[i].car_seat,
                            car_daily_price:res[i].car_daily_price,
                            car_fuel:res[i].car_fuel,
                            car_volume:res[i].car_volume,
                            car_drive:res[i].car_drive,
                            car_Airbag:res[i].car_Airbag,
                            car_id:res[i].carid,
                            carshow:true,
                            carprice:true,

                          //   ["system_id"] => 车系
                          // ["id"] => 车系ID
                          // ["car_color"] => 车颜色
                          // ["car_production_time"] => 出厂时间
                          // ["car_photo_url"] => 图片URL
                          // ["car_type"] => 汽车类型
                          // ["car_seat"] => 汽车座位
                          // ["car_fuel"] => 汽车燃油
                          // ["car_displacement"] => 汽车功率
                          // ["car_daily_price"] => 日租价格
                          // ["car_monthly_price"] => 月租价格
                          // ["car_volume"] =>续航能力
                          // ["car_drive"] => 驱动类型
                          // ["car_Airbag"] => 安全气囊
                          // ["carid"] => 汽车唯一ID
                          }
                        );

                        // carArr是临时一维数组，每次取回res中的子数组，然后carArr push 进data（data也是二维数组）

                      }
                    }else{
                      this.$message({
                        type: 'error',
                        message: '连接服务器失败！'
                      });
                    }


                  }

                })
              }

            }


        },

      },
      updated() {
        if(this.easyDataOption0.data.length>0){       //把上一次请求的数据清空
          let len = this.easyDataOption0.data.length;
          this.easyDataOption0.data.splice(0,len);
        };
        //每次更新页面所要做的操作（重选汽车）
        axios.post('/api/public/Car/selectcar',{
          pickUp:sessionStorage.getItem("pickUp"),
          startTime:sessionStorage.getItem("startTime"),
          endTime:sessionStorage.getItem("endTime"),
        }).then(response => {
          let res = response.data;// 现在后台返回的是一组汽车信息数组（这是二维数组）[{"car_brand":"奥迪","car_series":"Q3"},{"car_brand":"奥迪1","car_series":"Q5"},]
          if(res.status==1){
            this.$alert('你选择时段的车车已经租完啦！', '提示', {   //返回其他情况
              confirmButtonText: '确定'
            });
          }else {
            if(res[0].car_seat){
              for(var i = 0,l = res.length; i < l; i++){
                this.easyDataOption0.data.push(                               //如果符合条件则将返回的数据渲染到前台数组中
                  {
                    car_photo_url:res[i].car_photo_url,
                    car_brand :res[i].system_id,
                    car_series:res[i].car_series,
                    car_type:res[i].car_type,
                    car_displacement:res[i].car_displacement,
                    car_seat:res[i].car_seat,
                    car_daily_price:res[i].car_daily_price,
                    car_fuel:res[i].car_fuel,
                    car_volume:res[i].car_volume,
                    car_drive:res[i].car_drive,
                    car_Airbag:res[i].car_Airbag,
                    car_id:res[i].carid,
                    carshow:true,
                    carprice:true,

                    //   ["system_id"] => 车系
                    // ["id"] => 车系ID
                    // ["car_color"] => 车颜色
                    // ["car_production_time"] => 出厂时间
                    // ["car_photo_url"] => 图片URL
                    // ["car_type"] => 汽车类型
                    // ["car_seat"] => 汽车座位
                    // ["car_fuel"] => 汽车燃油
                    // ["car_displacement"] => 汽车功率
                    // ["car_daily_price"] => 日租价格
                    // ["car_monthly_price"] => 月租价格
                    // ["car_volume"] =>续航能力
                    // ["car_drive"] => 驱动类型
                    // ["car_Airbag"] => 安全气囊
                    // ["carid"] => 汽车唯一ID
                  }
                );

                // carArr是临时一维数组，每次取回res中的子数组，然后carArr push 进data（data也是二维数组）

              }
            }else{
              this.$message({
                type: 'error',
                message: '连接服务器失败！'
              });
            }


          }

        })
      },
    }
</script>

<style scoped>





  .slidertest{
    padding: 0px 50px;
  }
  .container{
    background-color: #00a0e1;
    color: white;
    margin: 0px auto;
    leight:50px;
    line-height: 50px;
  }
  .grid-content {
    min-height: 56px;
  }

   svg .icoe{
    font-size:25px;
  }
  .item {
    margin-bottom: 16px;
  }
  .list {
    width: 80%;
    position:relative;
    float: right;
  }
  .map {
    width: 274px;
    height: 280px;
  }
  .showcar{
    border-radius: 5px;
    position:relative;
    float: left;
    width: 281px;
    height: 659px;
      margin: 3px 0px 0px 20px;
      padding: 10px 2px 10px 2px;
    border:solid 2px #00a0e1;

  }
  .showcar p{
    font-family:"Hiragino Sans GB";
  }
  li{
    width: 76px;
    height: 80px;
    margin-left: 10px;
    float: left;
    text-align: center;
    list-style: none;
    font-size:20px;
  }

 a{
   text-decoration:none;
 }
   a:link{
     color: #36401e;
   }
   a:hover{color: #61b1ef;}

  .pfont{
    font-size: 13px;
  }



</style>
<style lang ="scss">
  .allbutton{
    font-family:"Hiragino Sans GB";
    font-size: 16px;
    transition:all .4s ease-in-out;
    background-color: #029ad7;
    border: 1px solid #ffffff;
  }
  .allbutton:hover{
    background-color: #ffffff;
    color:#029ad7;
  }


  .data-card{
    z-index: 20;
    $height: 340px;
    .item {
      z-index: 20;
      position: relative;
      float: right;
      margin: 0 auto;
      margin-top: 60px;
      margin-bottom: 50px;
      width: 180px;
      height: $height;
      overflow: hidden;
      border-radius: 5px;
      border-color: #fff;
      border-width: 1px;
      border-style: solid;
      &:hover .item-text {
        top: 0;
      }
    }
    .item-img {
      width: 100%;
      background: red;
      border-radius: 5px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .item-text {
      position: absolute;
      top: 150px;
      padding: 20px 15px;
      width: 100%;
      height: $height;
      overflow: auto;
      box-sizing: border-box;
      border-radius: 5px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      opacity: 0.9;
      transition: top 0.4s;
      & > p {
        font-size: 12px;
        line-height: 25px;
        text-indent: 2em;
      }
    }
  }
  /*.router{*/
    /*height: 90px;*/
  /*}*/
</style>
