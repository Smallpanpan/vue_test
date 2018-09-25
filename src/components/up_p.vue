<template>
  <div>
    <el-button @click="post">发送axios</el-button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        fileList2: []
      };
    },
    methods: {
      post(){
        axios.post('api/public/User/posttest',{name:'pan',pass:'123'}).then(response=>{
          let res = response.data;
          console.log(res.mess);
        })
      },

    }
  }
</script>

<style scoped>

</style>
