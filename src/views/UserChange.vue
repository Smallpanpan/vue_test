<template>
  <div class="divmanage">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu default-active="1" class="el-menu-vertical-demo" router>
          <el-menu-item index="1" route=/UserChange>
            <i class="el-icon-edit"></i>
            <span slot="title">修改用户信息</span>
          </el-menu-item>

          <el-menu-item index="2" route=/UserAssets>
            <i class="el-icon-sold-out"></i>
            <span slot="title">我的资产</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="rightchange">
          <p>修改用户信息</p><br>
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新密码" prop="pass"  >
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新用户名" prop="newName">
              <el-input v-model="ruleForm2.newName"></el-input>
            </el-form-item>
            <el-form-item>
              <br>
              <br>
              <el-button type="danger">注销账户</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
              <el-button type="primary" @click="changeuser">提交</el-button>

            </el-form-item>
          </el-form>
        </div>


      </el-col>
    </el-row>
  </div>



</template>

<script>
    export default {
        name: "UserChange",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm2: {
            pass: '',
            checkPass: '',
            newName: ''
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],

          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        changeuser(){
          axios.post('/api/user/login',{
            num:sessionStorage.getItem("num"), //账号
            userPwd:this.ruleForm2.pass,  //密码
            checkCcookie:false, //是否写cookie
          }).then(response => {         //用户名和密码将转为json传到后台接口
            let res = response.data;   //用res承接返回后台的json文件(像使用数组那样)
            if(res.checklogin==-1){
              this.$message({
                type: 'warning',
                message: '该账户不存在'
              });
            }else {
              if(res.status=='1'){   //显示登录结果
                // axios.post('/api/user/userchange',{
                //
                // }).then(response => {
                //   let res = response.data;
                //   if(res.status==1){
                //     alert('提交成功');
                //   }
                // })
                this.$message({
                  type: 'error',
                  message: '成功'
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
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },


    }
</script>

<style scoped>
 .rightchange{
   margin: 0px auto;
   width: 1000px;
   margin-top: 10px;
 }
  p{
    font-family: "Helvetica Neue";
    font-size: 25px;
  }

</style>
