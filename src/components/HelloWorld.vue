<template>
  <div class="hello">
    <p>hello world！这是axios测试</p>
    <table cellspacing="0" border="1px">
      <tr>

        <th>{{users}}</th>
      </tr>
      <tr v-for="user in users">
        <td>{{user}}</td>

      </tr>
    </table>
    登录：<el-input v-model="input" placeholder="请输入内容">登录</el-input>
    //明天工作：编写登录页面
    //写前台登录窗口（引用element组件）
    //写前台判断逻辑
    //写后台接口
    //与数据库连接

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      users: []
    }
  },
  created() {
    axios.get('/api/test01/axiosphp.php').then(res => {
      this.users = res.data;
      console.log('success');
      console.log(this.users);
    })

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
