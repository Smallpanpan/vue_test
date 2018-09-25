<template>
  <div>
    <!--<el-alert-->
      <!--title=""-->
      <!--type="warning"-->
      <!--center-->
      <!--show-icon-->
      <!--v-show="errortip"-->
    <!--&gt;{{errorTip}}-->
    <!--</el-alert>-->

    <div class="login-box" id="app" >

      <el-row>
        <el-col :span="8">
          <el-input id="name"  v-model="name" placeholder="请输入帐号">
            <template slot="prepend">帐号</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
            <template slot="prepend">密码</template>
          </el-input>
        </el-col>
    
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-button id="login" v-on:click="login(); open2();" style="width:100%" type="primary">登录</el-button>
        </el-col>
      </el-row>



      <!--<div class="error-wrap">-->
      <!--<span class="error error-show" v-show="ture">用户名或者密码错误</span>-->
      <!--</div>-->
    </div>
  </div>



</template>
<style>
  .error{
    font-size: 12px;
    color: #d31723;
    visibility: hidden;
    display: block;
    padding: 0 0 7px 17px;
    line-height: 16px;
    height: 16px;
    text-align: left;
    background: url("/static/icon.png") 0 -100px no-repeat;
  }
  .error-wrap .error-show{
    visibility: visible;
    height: auto;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .login-box {
    margin-top:0px;
    margin-left:40%;
  }

</style>
<script>
  import axios from 'axios'
  export default{
    data(){
      return{
          name:'pan',
          password:'123',
          res:'2',
        users: [],
        errortip:false,     //控制验证结果提示是否显示
        errorTip:'请登录',
        loginModalFlag:false,   //是否已经登录的状态标志


      }
    },

    updated(){  //更新后触发

    },
  mounted(){      //载入后
    this.checkLogin();
  },
  //触发连接后台方法
    methods: {
      // check() {
      //   axios.post("/api/test01/user.php",
      //     {name: this.name, password: this.password}).then((response) => {
      //     this.res = response.data;
      //     if(this.res=="0"){
      //       console.log('not success');
      //     }else{
      //       console.log('success');
      //       console.log(this.res);
      //     }
      //   });
      // }

      login(){
        //前端验证数据
        if(!this.name || !this.password){   //若任意一个参数为空，则返回并提示错误
          this.errortip=true;
          this.errorTip='账号或密码有误';
          return;

        }

        axios.post('/api/test01/user.php',{
          Name:this.name,
          userPwd:this.password
        }).then(response => {
          let res = response.data;    //用res承接返回后台的json文件(像使用数组那样)
         if(res.status=='1'){
           console.log('登录成功');
           this.errortip=true;
           this.errorTip='登录成功';
         }else {
           console.log('登录失败');
           this.errortip=true;
           this.errorTip='登录失败';

         }
        })


      },
      //这是登录提示事件
      open2() {
        this.$message({
          message:this.errorTip,
          type: 'success'
        });
      },
      //刚打开页面执行自动登录检查（运用cookie）
      checkLogin(){
         // const token = getCookie('session');
        const c=document.cookie;
        // if(!token){
        //   return;
        // }

        axios.get('/api/test01/usercookie.php',{c:c}).then(res=>{
          let testCookie=res.data;
          console.log(testCookie);

        })

      },
      // getCookie(name) {
      //   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      //   if (arr = document.cookie.match(reg))
      //     return (arr[2]);
      //   else
      //     return null;
      // }


    }
  }
</script>
