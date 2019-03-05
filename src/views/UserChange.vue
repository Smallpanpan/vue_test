<template>
  <div class="divmanage">
    <el-row class="tac">
      <!--这是左侧固定的个人管理导航span="20" -->
      <user-change-right></user-change-right>
      <!--导航结束-->

      <!--这是每个信息管理的内容开始-->
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
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>

            </el-form-item>
          </el-form>
        </div>


      </el-col>
      <!--模块内容结束-->
    </el-row>
  </div>



</template>

<script>
  // <!--使用本项目内的组件-->
  import userChangeRight from './../components/user-change-right'

    export default {
        name: "UserChange",
      components: {
        userChangeRight
      },
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
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
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
