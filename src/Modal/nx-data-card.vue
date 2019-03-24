<template>
    <div class="data-card">
      <el-row :span="24">
        <transition-group name="list-complete" tag="el-col" appear>
          <el-col :span="span" v-for="(item,index) in data" :key="index" v-show="item.carshow&&item.carprice" class="list-complete-item">
            <div class="item ">
              <el-card  :body-style="{ padding: '0px'}">
                <img :src="item.car_photo_url" class="item-img" />
              </el-card>
              <div class="item-text" :style="{color:colorText,backgroundColor:bgText}">
                <h3>{{item.car_brand}}{{item.car_series}}</h3>
                <p>{{item.car_type}}|{{item.car_displacement}}|{{item.car_seat}}座</p>
                <P>{{item.car_daily_price}}￥/天</P>
                <p><br/></p>
                <span>燃料类型:{{item.car_fuel}} &nbsp 续航能力:{{item.car_volume}}<br/></span>
                <span>驱动方式:{{item.car_drive}} &nbsp&nbsp&nbsp 气囊数量:{{item.car_Airbag}}<br/></span>
                <span>总价格:￥{{item.car_daily_price}}<br/></span>
                <p><br/></p>
                <router-link to="/MyOrder"><el-button @click="toOrder(item.car_id)">马上预定</el-button></router-link>
              </div>
            </div>
          </el-col>
        </transition-group>



      </el-row>
    </div>



</template>

<script>
export default {
  name: 'nx-data-card',
  data() {
    return {
      span: this.option.span || 6,
      data: this.option.data || [],
      colorText: this.option.colorText || '#fff',
      bgText: this.option.bgText || '#462442',
      borderColor: this.option.borderColor || '#f0f0f0'
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    toOrder(carid){
    //  提交订单储存的信息
      sessionStorage.setItem("carid",carid);
    }
  }
}
</script>

<style scoped>


  </style>
<style lang="scss" scoped>
  .list-complete-move {
    transition: transform 1s;
  }
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
  }
  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(10px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  .custom-appear-class{
    opacity: 0;
    transform: translateY(10px);
  }

  .data-card{
    .p{
      text-align: center;
    }

    $height: 320px;
    .item {
      position: relative;
      float: right;
      margin: 0 auto;
      margin-bottom: 50px;
      width: 273px;
      height: $height;
      overflow: hidden;
      border-radius: 5px;
      border-color: #fff;
      border-width: 1px;
      border-style: solid;
      &:hover .item-text {
        top: 0%;
        opacity: 0.9;
      }

    }
    .item-img {
      width: 100%;
      background: red;
      margin-bottom: 20px;
      border-radius: 5px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .item-text {
      position: absolute;
      top: 220px;
      padding: 20px 15px;
      width: 100%;
      height: $height;
      overflow: auto;
      box-sizing: border-box;
      border-radius: 5px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      opacity: 0.5;
      transition: top 0.4s;

      & > p {
        font-size: 16px;
        line-height: 25px;
        text-indent: 1em;
      }
      & >span{
        font-family: "YouYuan";
        font-size: 14px;
        line-height: 25px;
        text-indent: 1em;
      }
    }
  }
</style>
