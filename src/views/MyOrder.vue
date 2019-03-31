<template>
<div class="order">
  <el-steps :active="2" align-center class="step">
    <el-step title="选择车辆" icon="el-icon-success"></el-step>
    <el-step title="确认订单、付款" icon="el-icon-loading"></el-step>
    <el-step title="订单完成" icon="el-icon-edit-outline"></el-step>
  </el-steps>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>车辆信息</h3>
    </div>
    <img :src="src" alt="test" width="230px" height="140px"  class="img1">
    <div class="text itemleft">


        <li>品牌型号:&nbsp&nbsp{{system}}</li>
        <li>汽车类型:&nbsp&nbsp{{type}}</li>
      <br/>


        <li>座位数量:&nbsp&nbsp{{seat}}</li>
        <li>燃料类型:&nbsp&nbsp{{fuel}}</li>
      <br/>



        <li>续航能力(KM):&nbsp&nbsp{{deposit}}</li>
        <li>日租价格:&nbsp&nbsp{{price}}</li>

    </div>
    <div class="text itemrigh">
      <h4>取车</h4>
      <p><i class="el-icon-time"></i>{{start}}</p>
      <a  href="javascript:void(0);" @click="centerDialogVisible = true"><i class="el-icon-location-outline" ></i> {{location}}</a>
    </div>
    <div class="text itemrigh">
      <h4>还车</h4>
      <p><i class="el-icon-time"></i>{{end}}</p>

      <a  href="javascript:void(0);" @click="centerDialogVisible = true"><i class="el-icon-location-outline" ></i> {{location}}</a>
    </div>
  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>租车人信息</h3>
    </div>
    <el-table :data="tableid" style="width: 100%">
      <el-table-column prop="date" label="取车时,出示以下证件的原件：本人二代身份证、本人国内有效驾驶证正副本！" width="540px">
      </el-table-column>
      <el-table-column prop="name" label="" width="615px">
      </el-table-column>


    </el-table>

  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>费用明细</h3>
    </div>
    &nbsp&nbsp&nbsp&nbsp
    <el-select v-model="tableprice[4].allnum" placeholder="请保险类型">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-select v-model="tableprice[5].allnum" placeholder="请优惠类型" >
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value" @click="add">
      </el-option>

    </el-select>



    <el-button @click="add">确认</el-button>
    <el-table :data="tableprice" style="width: 100%">
    <el-table-column prop="price" label="款项" width="400px">
    </el-table-column>
    <el-table-column prop="num" label="单价(￥)" width="415px">
    </el-table-column>
      <el-table-column prop="allnum" label="总计(￥)" width="340px">
      </el-table-column>

    </el-table>

  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>确认支付</h3>
    </div>
    <el-button @click="pay">我已经付款</el-button>
    <el-button @click="quit">取消订单</el-button>
  </el-card>

  <el-dialog :visible.sync="centerDialogVisible" width="72%"  id="dia" :lock-scroll="false">
    <baidu-map class="map" :center="{lng:lng, lat:lat}" :zoom="15">
      <bm-marker :position="{lng:lng, lat:lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label :content=location :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
      </bm-marker>
    </baidu-map>
  </el-dialog>



</div>



</template>

<script>
  import store from '@/store/store'
  import axios from 'axios'
  // import { mapGetters, mapActions,mapMutations } from 'vuex'
    export default {
        name: "MyOrder",
      data(){
          return{
            carstatus_id:'',
            end:'',
            start:'',
            fuel:'',
            deposit:'',
            price:'',
            system:'',
            type :'',
            seat:'',
            //汽车图片来源
            date_4:'',
            date_8:'',
            date:'',
            src:'',
            options1: [],
            options2:[],
            tableid: [{
              date: '姓名',
              name: '',
            }, {
              date: '租车本人身份证号码',
              name: '',
            }, {
              date: '联系号码',
              name: '',
            }],
            tableprice: [{
              price: '基础服务费',
              num: '',
              allnum: ''
            }, {
              price: '日租价格',
              num: '',
              allnum: ''
            }, {
              price: '超过4小时部分',
              num: '',
              allnum: ''
            },{
              price: '超过8小时部分',
              num: '',
              allnum: ''
            }, {
              price: '保险',
              num:'' ,
              allnum:''
            },  {
              price: '优惠券',
              num:'' ,
              allnum:''
            }, {
              price: '总计',
              num: '',
              allnum: ''
            }],

            centerDialogVisible: false,
            location:'',
            lng: '',
            lat:'',        //店面坐标113.680837,24.78101

          //  汽车信息
          //   图片信息



          }
      },
      watch: {

      },
      methods:{
        //修改store的api
        // ...mapMutations({
        //   addcarstatus_id:'addcarstatus_id',
        //   addstatus:'addstatus',
        //   addinsurance_id:' addinsurance_id',
        //   addsite_id:'addsite_id',
        //   addasset_id:'asset_id',
        //
        // }),
        //时间戳转时间
        timestampToTime(timestamp) {
          var date = new Date(timestamp);//时间戳转时间
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
          var D = date.getDate() + '日 ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() ;
          // var s = date.getSeconds();
          return M+D+h+m;
        },
        //  取消订单
        quit()
        {
          this.$router.push({name:'CarsList'});
          // axios.post('api/Car/quitOrder',{
          //   startTime: sessionStorage.getItem("startTime"),
          //   carId:sessionStorage.getItem("carid"),
          // }).then(response=>{});
        },
        //结算
        add()
        {
          this.tableprice[6].allnum = this.tableprice[0].num+(this.tableprice[1].num*this.date)+(this.tableprice[2].num*this.date_4)+(this.tableprice[3].num*this.date_8)+this.tableprice[4].allnum-this.tableprice[5].allnum;

        },
        //加载订单信息
        downloadMessage(start,end,cId,id,sid)
        {
            axios.post('/api/Car/myorder',{
              startTime:start,
              endTime:end,
              carId:cId,
              uid:id,
              stid:sid
            }).then(response=>{
              let res = response.data;
              for(let i = 0,l = res.secure.length; i < l; i++){
              //id: 1, title: "50元免维修保险", text: "如汽车中途遇到任何汽车故障，可免维修费", price: 50
                this.options2.push(                               //如果符合条件则将返回的数据渲染到前台数组中
                  {
                    value:res.secure[i].price,
                    label:res.secure[i].title,
                  }
                );
              }
              for(let i = 0,l = res.asset.length; i < l; i++){
                //id: 1, title: "50元免维修保险", text: "如汽车中途遇到任何汽车故障，可免维修费", price: 50
                this.options1.push(                               //如果符合条件则将返回的数据渲染到前台数组中
                  {
                    value:res.asset[i].a_price,
                    label:res.asset[i].title,
                  }
                );
              }

              this.tableid[0].name = res.data.u_name;
              this.tableid[1].name = res.data.u_driver_license;
              this.tableid[2].name = res.data.u_num;
              this.tableprice[0].num = res.data.car_servuce;
              this.tableprice[0].allnum = res.data.car_servuce;
              this.tableprice[1].num = res.data.car_daily_price;
              this.tableprice[1].allnum = res.data.car_daily_price+"*"+res.data.date;
              this.tableprice[2].num = res.data.price_4;
              this.date_4 = res.data.date_4;
              this.date_8 = res.data.date_8;
              this.date = res.data.date;
              this.tableprice[2].allnum = res.data.price_4+"*"+res.data.date_4;
              this.tableprice[3].num = res.data.price_8;
              this.tableprice[3].allnum = res.data.price_8+"*"+res.data.date_8;
              this.system = res.data.system_id;
              this.type = res.data.car_type;
              this.seat = res.data.car_seat;

              this.fuel = res.data.car_fuel;
              this.deposit = res.data.car_deposit;
              this.price = res.data.car_daily_price;
              this.src = res.data.car_photo_url;
              this.start = this.timestampToTime( parseInt(sessionStorage.getItem("startTime")));
              this.end = this.timestampToTime( parseInt(sessionStorage.getItem("endTime")));

              this.location = res.data.location;
              this.lng = res.data.lng;
              this.lat = res.data.lat;

              this.carstatus_id =res.data.carstatusid;
              // this.carstatus_id =
            //将以上信息写入vuex
            })
        },


        pay(){
          //真正创建订单
          //将订单状态改为1（正在进行订单），修改总费用，修改是否有优惠券
          // $user_id = 5;                //用户ID
//        $carstatus_id =43 ;      //临时订单编号
//        $status =1;                  //支付状态
//        $insurance_id =1;      //保险ID
//        $site_id =1003;               //网点ID
//        $asset_id =1;              //优惠券ID
//           返回车辆正在进行的订单ID，并写入session
          if(1){
            this.$router.push({name:'Repair'});
            axios.post('api/Order/createorder',{
              userid:localStorage.getItem("uid"),              //用户ID
              carstatus_id :this.carstatus_id,      //临时订单编号
              status :1,                  //支付状态
              insurance_id :1,      //保险ID
              site_id :sessionStorage.getItem("pickUp"),                //网点ID
              asset_id :1,              //优惠券ID
            }).then(response=>{
              let res =response.data;
              sessionStorage.setItem("orderId",res.order_id);
              sessionStorage.setItem ("astart",this.start);
              sessionStorage.setItem ("system_id",this.system);
              sessionStorage.setItem ("location",this.this.location);

            });
          }else{
            this.$message({
              type: 'warning',
              message: '付款失败了呢'
            });
          }
        }



      },
      updated() {
          //每次更新页面所要做的操作（重选汽车）
        let start = sessionStorage.getItem("startTime");
        let end = sessionStorage.getItem("endTime");
        let cId = sessionStorage.getItem("carid");
        let id = localStorage.getItem("uid");
        let stid = sessionStorage.getItem("pickUp");
        this.downloadMessage(start,end,cId,id,stid);
          },
      beforeRouteEnter (to, from, next) {
        // 导航守卫，进入该组件的对应路由时调用
        if (store.state.orderselect){      //如果没有输入则返回上一个页面

          next({
            name: 'error'

          })
        }else{
          next()
        }
      },
    //  离开组件路由守卫（即离开是会提醒是否离开）
      beforeRouteLeave (to, from , next) {
        this.$confirm('订单正在进行中,是否已经付款订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('api/Car/quitOrder',{
            startTime: sessionStorage.getItem("startTime"),
            carId:sessionStorage.getItem("carid"),
          }).then(response=>{});
          next()
        }).catch(() => {
          next(false)
        });
      },


    }
</script>

<style scoped>
  .step{
    margin-top: 30px;
  }
  /*.img1{*/
    /*float: right;*/
  /*}*/
  a{color: #36401e;text-decoration:none;}
  #dia{
    padding: 0px 0px 0px 0px;
  }
  .map {
    width: 100%;
    height: 400px;
  }
  i{
    font-size: 20px;
  }
  .order{
    text-align: left;
  }
  .text {
    font-size: 16px;
  }

  .itemleft {
    margin-bottom: 18px;
    width: 480px;
    float: left;
  }
  .itemrigh{
    text-align:left;
    margin-bottom: 18px;
    width: 220px;
    float: left;
    line-height: 180%;
  }
  /*li最后一个属性的css样式*/
  .itemleft li:last-child{
    padding: 5px 0px 35px 0px;
  }
  .itemleft li{
    float: left;
    list-style:none;
    padding: 5px 60px 20px 0px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    margin:0 auto;
    width: 1200px;
    margin-bottom: 30px;
    margin-top: 10px;
  }

</style>
