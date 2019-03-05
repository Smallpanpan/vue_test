<!--这是在修改用户信息界面，左侧的一个目录栏的抽象组件-->
<template>
  <el-col :span="4">
    <el-menu default-active='select' class="el-menu-vertical-demo" router>
      <el-menu-item index="1" route=change>
        <i class="el-icon-edit"></i>
        <span slot="title">修改用户信息</span>
      </el-menu-item>
      <el-menu-item index="2" route=message>
        <i class="el-icon-message"></i>
        <span slot="title">我的消息</span>
      </el-menu-item>
      <el-menu-item index="3" route=assets>
        <i class="el-icon-sold-out"></i>
        <span slot="title">我的资产</span>
      </el-menu-item>
    </el-menu>
  </el-col>

</template>

<script>
    export default {
        name: "user-change-right",

      data(){
          return{
            select:1,
          };

      }

    }

</script>

<style scoped>
  .divmanage{
    margin-top: 80px;
  }
  .app-router-view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    visibility: visible;
  }
</style>
