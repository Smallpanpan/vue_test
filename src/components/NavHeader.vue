<template>
 <div class="Navdiv">
     <el-row>
       <el-col :xs="0" :sm="4" :md="3" :lg=" {span:2.5, offset:2}" :xl="4">
         <a href="http://localhost:8087"><img src="./../assets/nav-ico.png" alt="图片加载失败" width="140" height="80"></a>

       </el-col >
       <el-col :xs="0" :sm="8" :md="8" :lg="5" :xl="4">
         <div class="router-link-active">
           <router-link to="/" ><el-button class="Navbutton">首页</el-button></router-link>
           <router-link to="/404"><el-button class="Navbutton">使用指南</el-button></router-link>
         </div>
       </el-col>
       <el-col :xs="20" :sm="14" :md="{span:13, offset:3}" :lg=" {span:9, offset:3}" :xl=" {span: 6, offset: 6}">
         <!--右侧导航-->
         <span v-if="$store.state.checklogin" class="rightNav">
              <el-button round class="Logbutton" @click="loginModalFlag=true" >注册</el-button>
              <el-button round class="Logbutton" @click="dialogFormVisible = true">登录</el-button>
<!--登录dialog-->
  <el-dialog title="登录" :visible.sync="dialogFormVisible"  center
             :append-to-body='true'
             :lock-scroll="false"
             width="40%">

   <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

 <el-form-item label="账号" prop="num">
    <el-input v-model.number="ruleForm2.num"></el-input>
  </el-form-item>

  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
  </el-form-item>

  <el-form-item label="自动登录" prop="delivery">
    <el-switch v-model="ruleForm2.delivery"></el-switch>
  </el-form-item>
    <span><a href="https://yun.reg.163.com/urscloud/getback/index?product=wangyiyunguanwang" target="view_window">忘记密码？</a></span>

</el-form>


  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForm2'); dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm2')" v-loading.fullscreen.lock="fullscreenLoading" >登 录</el-button>
  </div>
</el-dialog>
<!--注册dialog-->
           <el-dialog title="注 册" :visible.sync="loginModalFlag"  center
                      :append-to-body='true'
                      :lock-scroll="false"
                      top="45px"
                      width="56%">
             <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
             <el-form-item label="用户名" prop="name">
                   <el-input v-model="ruleForm1.name"></el-input>
             </el-form-item>
               <el-form-item label="电话号码" prop="num">
                  <el-input v-model.number="ruleForm1.num"  > <el-button slot="append"  icon="el-icon-message">获取验证码</el-button></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                  <el-input v-model="ruleForm1.code" ></el-input>
                </el-form-item>
               <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm1.pass" auto-complete="off"></el-input>
                </el-form-item>
               <el-form-item label="身份证号码" prop="driverNum">
                  <el-input v-model="ruleForm1.driverNum"></el-input>
                </el-form-item>
             </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForm1'); loginModalFlag = false">取 消</el-button>
    <el-button type="primary" @click="subinfoForm('ruleForm1')" v-loading.fullscreen.lock="fullscreenLoading" >注 册</el-button>
  </div>

             <img-inputer v-model="file1" theme="light" size="5px" type="file"
                          accept="image/*"
                          placeholder="请上传驾驶证正面！"
                          :on-change="chooseImg"
                          />
               <img-inputer v-model="file2" theme="light" size="5px" type="file"
                            accept="image/*"
                            placeholder="请上传驾驶证反面！"
                            :on-change="chooseImg1"
               />
               <img-inputer v-model="file3" theme="light" size="5px" type="file"
                            accept="image/*"
                            placeholder="请上传个人照片！"
                            :on-change="chooseImg2"
               />


</el-dialog>


    </span>


         <span v-else class="rightNav" >
       <span  class="navHello"><p>您好！{{$store.state.userName}}</p></span>
    <el-dropdown trigger="hover">
<el-badge class="item">
  <el-button round size="medium" >我的账户</el-button>

</el-badge>
  <el-dropdown-menu slot="dropdown">
    <router-link to="/UserChange">  <el-dropdown-item>账号管理</el-dropdown-item> </router-link>
    <router-link to="/UserAssets"> <el-dropdown-item>我的资产</el-dropdown-item> </router-link>
    <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
           <!--我的订单-->
       <el-dropdown trigger="hover">
<el-badge  class="item">
  <el-button round size="medium">我的订单</el-button>
</el-badge>
  <el-dropdown-menu slot="dropdown">
    <router-link to="/Repair"><el-dropdown-item>订单管理</el-dropdown-item></router-link>
   <router-link to="/myhisorder"><el-dropdown-item>历史订单</el-dropdown-item> </router-link>
  </el-dropdown-menu>
</el-dropdown>
  </span>
       </el-col>

     </el-row>




 </div>
</template>

<script>
  // <!--引用store的公共数据-->

  import './../assets/css/login.css'
  import testpower from './testpower'
  import { mapGetters, mapActions,mapMutations } from 'vuex'
  import { Loading } from 'element-ui';
  import axios from 'axios'
  import md5 from 'js-md5'

    export default {
        name: "NavHeader",

      //本组件内的数据
      data(){
        /*插入登录form方法*/
        var checkNum = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('账号不能为空'));
          }

            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
              if (!myreg.test(value) ) {
                callback(new Error('请输入正确的手机号码'));
              } else {
                callback();
              }

            }

        };
        var checkdriver = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('身份证号不能为空'));
          }

          var arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
          //18位数身份证正则表达式
          var arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
            if (value.match(arg1) == null && value.match(arg2) == null) {
              callback(new Error('请输入正确的身份证号码'));
            } else {
              callback();
            }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {

            callback();
          }
        };
        var checkName = (rule, value, callback) => {
          var arg1 =  /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/;
          if (value === '') {
            callback(new Error('姓名不能为空哦'));
          } else {
            if(!value.match(arg1)){
              callback(new Error('请输入正确姓名'));
            }else{
              callback();
            }

            callback();
          }
        };
        /*插入登录form方法*/
        return {
          //图片上传
          file1:'',
          file2:'',
          file3:'',
          imgUrlFromServer: '#',
          // base1: '',
          // base2: '',
          // base3: '',

          usersname: [],
          chackLogin:true,    //检查是否登录
          loginModalFlag:false,
          fullscreenLoading: false,
        //  登录弹框验证

          loginPower:false,
          /*插入form方法*/
          /*设定规则指向*/
          //注册绑定的数据
          ruleForm1:{
            name:'',
            num:'',
            code:'',
            driverNum:'',
            pass:'',
            base1: '',
            base2: '',
            base3: '',

          },
          ruleForm2: {
            num: '',
            pass: '',
            delivery: false,
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],

            num: [
              { validator: checkNum, trigger: 'blur' }
            ]
          },
          rules1: {
            driverNum: [
              { validator: checkdriver, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],

            num: [
              { validator: checkNum, trigger: 'blur' }
            ],
            name: [
              { validator: checkName, trigger: 'blur' }
            ]

          },

          /*插入form方法*/

          dialogTableVisible: false,
          dialogFormVisible: false,
          form: {
            name: '',
            type: [],
            resource: '',
            desc: ''
          },

        //  登录弹框验证
        }
      },
      //创建后要执行的方法（自动登录的方法），取得cookie，将cookie的信息post给后台
      mounted(){
        //  判断是否存在PHPSESSION,如果存在则不做自动登录


          this.checklogin();



      },


      methods:{

        chooseImg () {          //上传照片时将图片转为base64

          let file = this.file1
          let reader = new FileReader()
          let img = new Image()
          // 读取图片
          reader.readAsDataURL(file)
          // 读取完毕后的操作
          reader.onloadend = (e) => {
            img.src = e.target.result
            // 这里的e.target就是reader
            // console.log(reader.result)
            // reader.result就是图片的base64字符串
            this.ruleForm1.base1 = reader.result
          }

        },
        chooseImg1 () {          //上传照片时将图片转为base64

          let file = this.file2
          let reader = new FileReader()
          let img = new Image()
          // 读取图片
          reader.readAsDataURL(file)
          // 读取完毕后的操作
          reader.onloadend = (e) => {
            img.src = e.target.result
            // 这里的e.target就是reader
            // console.log(reader.result)
            // reader.result就是图片的base64字符串
            this.ruleForm1.base2 = reader.result
          }

        },
        chooseImg2 () {          //上传照片时将图片转为base64

          let file = this.file3
          let reader = new FileReader()
          let img = new Image()
          // 读取图片
          reader.readAsDataURL(file)
          // 读取完毕后的操作
          reader.onloadend = (e) => {
            img.src = e.target.result
            // 这里的e.target就是reader
            // console.log(reader.result)
            // reader.result就是图片的base64字符串
            this.ruleForm1.base3 = reader.result
          }

        },


          //修改store的api
        ...mapMutations({
          addname: 'changeNameme', // 将 `this.add()` 映射为 `this.$store.commit('increment')`//将名字写回store
          adduid:'changeuid',
          ilogin:'inchecklogin',
          ipower:'incheckpower',
          //退出时候对store的操作
          desnamea:'desname',
          outlogina:'outlogin',
          outipowera:'outipower',

        }),
        //得到前端的cookie



          //自动登录要做的操作
          checklogin(){
            if (document.cookie.length>0) {
              var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
              for(var i=0;i<arr.length;i++){
                var arr2=arr[i].split('=');//再次切割
                //判断查找相对应的值
                if(arr2[0]=='num'){
                  var cookienum=arr2[1];//保存到保存数据的地方
                }else if(arr2[0]=='userPwd'){
                  var cookieuserPwd=arr2[1];
                }
              }
            }
            var timestamp =parseInt(Date.parse(new Date())/10000);
            let pwd = cookieuserPwd;
            let pwdd = pwd+timestamp;
            let pwd1 = md5(pwdd);

          axios.post('/api/user/login',{
            num:cookienum, //账号
            userPwd:pwd1,  //密码
            checkCcookie:this.ruleForm2.delivery,

          }).then(response => {         //用户名和密码将转为json传到后台接口
            let res = response.data;   //用res承接返回后台的json文件(像使用数组那样)

              if(res.status=='1'){   //显示登录结果
                //写store
                localStorage.setItem("uid",res.u_id);
                this.addname(res.name);
                this.adduid(res.u_id);
                this.ilogin();
                this.ipower();

              }

          })
        },
        //退出登录所要做的动作：（其实还要修改后台数据session）清除cookie、修改store数据
        loginOut(){

        //  清除cookie 传输给后台清除cookie
          axios.post('/api/user/loginout').then(response => {

          }),

        // 修改store
            this.ruleForm2.num='';
            this.ruleForm2.pass='';
            this.ruleForm2.delivery=false;
            this.desnamea();
            this.outlogina();
            this.outipowera();
          this.$message({
            showClose: true,
            message: '已退出登录'
          });
        },

          //注册提交的数据
        // name:'',
        // num:'',
        // code:'',
        // driverNum:'',
        // driverPhoto1:'',
        // driverPhoto2:'',
        // userPhotr:'',
        // pass:''

        //
        submitinfo(){

          let pwd = md5(this.ruleForm1.num+md5(this.ruleForm1.pass));
          axios.post('/api/User/register',{
            num: this.ruleForm1.num,
            name: this.ruleForm1.name,
            code: this.ruleForm1.code,
            driverNum: this.ruleForm1.driverNum,
            pass: pwd,
            img1: this.ruleForm1.base1,
            img2: this.ruleForm1.base2,
            img3: this.ruleForm1.base3
          }).then(response=> {
            let res = response.data;
            if(res.message==1){
              this.loginModalFlag = false;
              this.resetForm('ruleForm1');
              this.$message({
                type: 'success',
                message: '注册成功，登录账号等后台验证通过即刻租车啦！'
              });
            }else if(res.message==0){
              this.$message({
                type: 'warning',
                message: '您的账号已经被注册啦，请直接登录'
              });
            }else{
              this.$message.error( '信息提交失败，请重新注册');
            }

          })
        },
          //自动登录要做的操作
          //按下登录按钮之后的post数据
        submitPost() {
          var timestamp =parseInt(Date.parse(new Date())/10000);
          let pwd = md5(this.ruleForm2.num+md5(this.ruleForm2.pass));
          let pwdd = pwd+timestamp;
          let pwd1 = md5(pwdd);
          axios.post('/api/user/login',{
            num:this.ruleForm2.num, //账号
            userPwd:pwd1,  //密码
            checkCcookie:this.ruleForm2.delivery, //是否写cookie

          }).then(response => {         //用户名和密码将转为json传到后台接口
            let res = response.data;   //用res承接返回后台的json文件(像使用数组那样)
            if(res.checklogin==-1){
              this.$message({
                type: 'warning',
                message: '该账户不存在'
              });
            }else {
              if(res.status=='1'){   //显示登录结果
                //写store
                localStorage.setItem("num",this.ruleForm2.num);
                sessionStorage.setItem("num",this.ruleForm2.num);
                this.dialogFormVisible = false;
                this.addname(res.name);
                this.adduid(res.u_id);
                this.ilogin();
                this.ipower();
                this.$message({
                  type: 'success',
                  message: '登录成功'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: '账户或者密码错误'
                });
              }

            }

          })

        },
        // submitPost(callback){
        //   callback res;
        // }
        // checkLogin(submitPost(callback)){
        //
        // },

      //    登录弹框方法
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //提交成功做的动作
              //加载loading
              this.submitPost();
              //post数据给后台
                  //返回一个验证数据，res.checklogin(0为登录成功)、res.userName

              //

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        subinfoForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              //提交成功做的动作
              //加载loading
              this.submitinfo();
              //post数据给后台
              //返回一个验证数据，res.checklogin(0为登录成功)、res.userName

              //

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
        //    登录弹框方法
      },

    }
</script>

<style scoped>

  .Navdiv{
    margin:0px auto;
    overflow: hidden;
    z-index: 150;
    height: 80px;
    background-color: #ffffff;
    text-align: center;
    position: fixed;
    width: 100%;
    color: #00a0e1;
    border-bottom: 1px solid #dadada;
  }

.router-link-active {
  margin-bottom: 30px;
  text-decoration: none;
  padding: 18px 0px 20px 10px;
  font-size:25px;
  color: #00a0e1;
  line-height: 25px
}
.router-link-login{
  text-decoration: none;
  margin: 10px;
  font-size:30px;
  color: #00a0e1;
  line-height: 60px
}

  /*右侧导航*/
  .rightNav{
    margin:18px;
    position: relative;
    float: right;
  }
.item{
  position:relative;
  float: right;
  margin-right:20px;
}
.navHello{
  margin: 10px;
  font-size:20px;
  color: #00a0e1;
  line-height: 14px;
  float: left;
}



</style>
<style lang ="scss">
  .Navbutton{
    font-family:"Hiragino Sans GB";
    font-size: 19px;
    color: #fff;
    transition:all .4s ease-in-out;
    background-color: #00a0e1;
    border: 1px solid #ffffff;
  }
  .Navbutton:hover{
    background-color: #ffffff;
    color:#00a0e1;
  }
  .Logbutton {
    font-family:"Hiragino Sans GB";
    font-size: 19px;
    transition:all .4s ease-in-out;
    border: 1px solid #00b6b6;
    background: #00b6b6;
    color: #fff;
  }
  .Logbutton:hover{
    background-color: #fff;
    color:#00b6b6;
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
</style>
