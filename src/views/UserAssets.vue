<template>
  <div class="divmanage">
    <el-row class="tac">
      <!--这是左侧固定的个人管理导航span="20" -->
      <el-col :span="4">
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-menu-item index="1" route=/UserChange>
            <i class="el-icon-edit"></i>
            <span slot="title">修改用户信息</span>
          </el-menu-item>

          <el-menu-item index="2" route=/UserAssets>
            <i class="el-icon-sold-out"></i>
            <span slot="title">我的资产</span>
          </el-menu-item>
        </el-menu>
      </el-col>
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
            <el-col :span="14" class="sign"><strong>我的优惠券</strong></el-col>
            <el-col :span="10">
              <el-button>全部</el-button>
              <el-button>未使用</el-button>
              <el-button>已使用</el-button>
              <el-button>已过期</el-button>
            </el-col>
          </el-row>
          <!--显示优惠券的卡片-->






        </div>


      </el-col>
      <!--模块内容结束-->
    </el-row>
  </div>



</template>

<script>
  // <!--使用本项目内的组件-->


  export default {
    name: "UserAssets",
    data(){
      return {
        imgsrc:"http://localhost/img/first.png",  //用户等级标志
        grade:"60",                                //离下一级的段位距离
        usergrade:"白金卡",                        //用户等级段位
        points:"60",                                //用户的积分
        couponnum:"10",                           //优惠券数量
        money:"32.6",                               //账户余额
        //  优惠券接口参数
        discountM:"100",               //优惠的面值
        stardate:"2019-03-06",         //优惠开始时间
        enddate:"2019-06-04",           //优惠结束时间
        ruledepict:"基本租金超过200元可用，不能同其他类型优惠券共同使用",                  //关于优惠的描述
        ruleM:"200",                    //关于优惠的最低使用价格

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


</style>
