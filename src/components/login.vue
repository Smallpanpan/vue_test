<template>
  <el-button type="text" @click="open3">登录</el-button>
</template>

<script>
  import axios from 'axios'
    export default {
      data(){
        return{
          name:'',
          password:'',
          res:'2',
          users: [],
          errortip:false,     //控制验证结果提示是否显示
          errorTip:'',
          loginModalFlag:false   //是否已经登录的状态标志
        }
      },

      methods:{
        open3() {
          this.$prompt('请输入邮箱', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: '你的邮箱是: ' + value
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });


        }

      },


    }


</script>

<style scoped>

</style>
