<!--这是优惠券的组件，只需输入优惠券参数数组，即可渲染出一组优惠券-->
<template>
  <el-col :span="8">
    <el-card shadow="always">
      <div class="selected">

        <div class="amount"><span>￥</span>{{discountM}}</div>
        <div class="effective">有效期<br/>{{stardate}}至{{enddate}}</div>

        <div class="effective-buttom">{{ruledepict}}</div>
      </div>
    </el-card>
  </el-col>
</template>


<script>
  export default {
    name: 'car-coupon',

    data(){
      return {
        //  优惠券接口参数
        discountM:"100",               //优惠的面值
        stardate:"2019-03-06",         //优惠开始时间
        enddate:"2019-06-04",           //优惠结束时间
        ruledepict:"基本租金超过200元可用，不能同其他类型优惠券共同使用",                  //关于优惠的描述
        ruleM:"200",                    //关于优惠的最低使用价格

      }
    },

  }
</script>

<style scoped>

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
    width:93px;
    height:45px;
    margin:40px 0 0 14px;
    overflow:hidden;
    text-align:left;
    font-size:36px;
    color:#fff;
  }
  .amount span{
    font-size: 18px;
  }


  .effective {
    width:160px;
    height:35px;
    margin:48px 0px 0 10px;
    letter-spacing:0.5px;
    font-size:12px;
    text-align:left;
    color: #fff;
  }
  .effective-buttom{
    height:18px;
    width:250px;
    overflow:hidden;
    font-size:13px;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 13px 0px 0px 18px;
    color:#00b6b6 ;

  }
</style>
