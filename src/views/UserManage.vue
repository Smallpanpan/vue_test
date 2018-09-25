<template>
  <div class="divmanage">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-menu-item index="1" route=foo/change>
            <i class="el-icon-edit"></i>
            <span slot="title">修改用户信息</span>
          </el-menu-item>
          <el-menu-item index="2" route=foo/message>
            <i class="el-icon-message"></i>
            <span slot="title">我的消息</span>
          </el-menu-item>
          <el-menu-item index="3" route=foo/assets>
            <i class="el-icon-sold-out"></i>
            <span slot="title">我的资产</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <transition name="el-fade-in-linear">
          <router-view  class="app-router-view"></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>

</template>

<script>
    export default {
        name: "UserManage"
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
