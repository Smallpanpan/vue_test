<template>
    <!--//注册表单-->
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm2.age"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model.number="ruleForm2.name"></el-input>
    </el-form-item>
    <!--上传图片-->
    <el-upload
      action="http://localhost:8080/test01/pc/"
      limit="3"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!--上传图片-->
    <!--上传图片2-->
    <!--上传图片2-->

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>

  </el-form>

</template>

<script>
  import axios from 'axios'
    export default {
      data() {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('年龄不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (value < 18) {
                callback(new Error('必须年满18岁'));
              } else {
                callback();
              }
            }
          }, 1000);
        };
        //姓名验证
        var checkname = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('姓名不能为空'));
          }else {
            callback();
          }
        };
        //姓名验证


        return {
          ruleForm2: {
            pass: '',
            checkPass: '',
            age: '19',
            name:'test',
          },
          rules2: {
            age: [
              { validator: checkAge, trigger: 'blur' }
            ],
            name:[
              { validator: checkname, trigger: 'blur' }
            ],

          },
        //  图片上传
          dialogImageUrl: '',
          dialogVisible: false,
        //  以上是element组件属性
        };

      },

      methods: {

        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            // if (valid) {
            //   alert('submit!');
            // } else {
            //   console.log('error submit!!');
            //   return false;
            // }
          }),
          //发送给后台
          axios.post('/api/test01/inserttest.php',{
            name:this.ruleForm2.name,
            age:this.ruleForm2.age
          }).then(response => {
            let res = response.data;    //用res承接返回后台的json文件(像使用数组那样)
           if(res){
             console.log('注册成功');
           }else{
             console.log('注册失败');
           }
          })
          //发送给后台

        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },

      //  上传图片
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
      //  上传图片
      //  以上是element组件验证方法
      },

    }
</script>

<style scoped>

</style>
