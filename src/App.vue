<template>
  <div id="app">
     <NavHeader></NavHeader>  <!-- 顶部导航 -->
   <div class="router"></div>
    <transition name="el-fade-in-linear">
    <router-view  class="app-router-view"></router-view>
    </transition>
    <NavBottom></NavBottom>   <!-- 底部导航 -->
  </div>
</template>

<script>
  import NavHeader from './components/NavHeader'
  import NavBottom from './components/NavBottom'
export default {
  name: 'App',

  components:{
    'NavHeader': NavHeader,
    'NavBottom': NavBottom
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #ffffff;*/
  margin: 0px;
  transition: all 1s;

}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
  .router{
    height: 80px;
  }
.app .app-router-view {
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
<style type="text/css">
  .icon {
    font-size: 50px;
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
