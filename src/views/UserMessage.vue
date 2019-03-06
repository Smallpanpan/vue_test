<template>
  <div class="divmanage">
    <el-row class="tac">
      <!--这是左侧固定的个人管理导航span="20" -->
      <user-change-right></user-change-right>
      <!--导航结束-->

      <!--这是每个信息管理的内容开始-->
      <el-col :span="20">
        <div class="rightchange">
          <p>我的消息</p><br>



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
    name: "UserMessage",
    components: {
      userChangeRight
    },
    data(){

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

</style>
