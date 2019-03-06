<template>
  <div class="divmanage">
    <el-row class="tac">
      <!--这是左侧固定的个人管理导航span="20" -->
      <user-change-right></user-change-right>
      <!--导航结束-->

      <!--这是每个信息管理的内容开始-->
      <el-col :span="20">
        <div class="rightchange">
          <el-row :gutter="20">
            <el-col :span="2"><img v-bind:src="imgsrc" alt="用户等级"></el-col>
            <el-col :span="6" class="sign">
              <div>{{$store.state.userName}} &nbsp;&nbsp; ({{usergrade}})</div>
              <div><el-progress :text-inside="true" :stroke-width="16" v-bind:percentage="grade" >test</el-progress></div>
              <div>我的累计积分:{{points}}</div>
            </el-col>
            <el-col :span="4"><b >{{points}}</b>分 <br/> 可用积分<br/><span class="coupon">积分可换优惠券哦</span></el-col>
            <el-col :span="4"><b >{{couponnum}}</b>张 <br/> 优惠券</el-col>
            <el-col :span="4"><b >{{money}}</b>元 <br/> 账户余额</el-col>
          </el-row>
          <!--开始展示优惠券-->
          <el-row :gutter="20">
            <el-col :span="10" class="sign"><strong>我的优惠券</strong></el-col>
            <el-col :span="10">
              <el-button>全部</el-button>
              <el-button>未使用</el-button>
              <el-button>已使用</el-button>
              <el-button>已过期</el-button>
            </el-col>
          </el-row>
          <!--显示优惠券的卡片-->
          <el-col :span="8">
            <el-card shadow="always">
              <div class="selected">

                  <div class="amount">￥ 100</div>
                  <div class="effective">有效期<br/>2019-03-06至2019-06-04</div>

                <div class="effective-buttom">满2天租金及以上可用，不能同其他类型优惠券共同使用</div>
              </div>
            </el-card>
          </el-col>



        </div>


      </el-col>
      <!--模块内容结束-->
    </el-row>
  </div>



</template>

<script>
  // <!--使用本项目内的组件-->
  import userChangeRight from './../components/user-change-right'

  export default {
    name: "UserAssets",
    components: {
      userChangeRight
    },
    data(){
      return {
        imgsrc:"http://localhost/img/first.png",  //用户等级标志
        grade:"60",                                //离下一级的段位距离
        usergrade:"白金卡",                        //用户等级段位
        points:"60",                                //用户的积分
        couponnum:"10",                           //优惠券数量
        money:"32.6"                               //账户余额

      }
    },
    methods: {

    },


  }
</script>

<style scoped>
  .rightchange{
    margin: 0px auto;
    width: 1000px;
    margin-top: 10px;
  }
  p{
    font-family: "Helvetica Neue";
    font-size: 25px;
  }
  .sign{
    text-align: left;
    font-family: "Agency FB";
    font-size: 15px;
    color: #00b6b6;
    line-height: 24px;

  }
  b{
    font-size: 25px;
    color: #ff5722;
  }
  .coupon{
    font-size: 9px;
    color: #00b6b6;
  }
  .el-row {
    margin: 20px 0px 40px 0px;

  }

  /*卡片开始类型*/
  .selected {
    width: 291px;
    height: 155px;
    background: url(https://static.wkzuche.com/www/images/personal/coupon.jpg)no-repeat center!important;
    background-size: 100%!important;
    display: -webkit-flex; /* Safari */
    display: flex;      /*设置为弹性布局*/
    flex-wrap:  wrap;       /*设置为换行*/
  }
  .amount {
    width:69px;
    height:30px;
    margin:30px 0 0 0px;
    overflow:hidden;
    text-align:center;
    font-size:12px;

  }
  .effective {
    width:148px;
     height:30px;
    margin:16px 0px 0 50px;
    letter-spacing:0.5px;
    font-size:2px;
  }
  .effective-buttom{
    height:20px;
    width:250px;
    overflow:hidden;
    font-size:10px;
    margin: 17px 0px 0px 11px;

  }
</style>
