<template>

  <div>
    <p>购物车登录状态是： {{$store.state.checklogin}}</p>
  </div>
</template>

<script>
  import { mapState} from 'vuex'
  export default {
    name: "testpower",
    computed: mapState([
        'checklogin'
  ]),

  }
</script>

<style scoped>

</style>
