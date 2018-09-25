<template>

  <div id="app">
    当前的登录权限是： {{$store.state.checklogin}}

    <button @click="inchecklogin">增加权限</button>
    <!--<button @click="increment">+5</button>-->
    <!--<button @click="decrement">-3</button>-->
    <testpower></testpower>

  </div>


</template>

<script>
  import testpower from './testpower'
  import { mapGetters, mapActions,mapMutations } from 'vuex'
  export default{
    computed: mapGetters([//与vuex中的getters关联

    ]),

    methods: mapActions([//与vuex中的actions关联
      'increment',
      'decrement',
      'inchecklogin'
    ]),
    components:{
      'testpower': testpower
    },

  }
</script>

<style scoped>

</style>
