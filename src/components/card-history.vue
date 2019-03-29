<!--历史订单模块输入参数：
all_price: 总费用
location: 取还车网点
system_id: 汽车车型
astart:取车时间
aend:还车时间
start：预约时间
end：订单完成
progress:租赁进度
-->
<template>
  <div >
    <el-row :span="24">

      <el-col :span="24" v-for="(item, i) in data" :key="item.id" class="cardhis">
        <span ><p>车辆型号：{{item.system_id}} &nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp 租赁总费用：￥{{item.all_price}}&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp取还车网点:{{item.location}}</p></span>
        <el-steps :active="item.progress" align-center>
          <el-step title="预约" icon="el-icon-edit" :description="item.start"></el-step>
          <el-step title="取车" icon="el-icon-caret-top" :description="item.astart"></el-step>
          <el-step title="还车" icon="el-icon-caret-bottom" :description="item.aend"></el-step>
          <el-step title="订单完成" icon="el-icon-success" :description="item.end"></el-step>
        </el-steps>
      </el-col>

    </el-row>




  </div>



</template>

<script>
  export default {
    name: 'card-history',

    data() {
      return {
        //渲染测试数据
        // data:  [
        //   { all_price: 500,
        //     location: "韶关市韶关学院店",
        //     system_id: "Audi Sport-奥迪TT RS",
        //     astart:20123564556,
        //     aend:12345645,
        //     progress:4
        //   },
        // ],
        data: this.option.data || [],

      }
    },
    props: {
      option: {
        type: Object,
        default: () => {}
      }
    },
    // created() {},
    // mounted() {},
    // watch: {},
    // computed: {},
    // methods: {}
  }
</script>

<style scoped>



</style>
<style lang="scss" scoped>
  p{
    margin: 20px 0px;
  }
  .cardhis{
    margin: 30px 0;
    border: #3c3f41 1px solid;
    border-radius: 25px;
  }

</style>
