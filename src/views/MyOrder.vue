<template>
<div class="order">
  <el-steps :active="2" align-center class="step">
    <el-step title="选择车辆" icon="el-icon-success"></el-step>
    <el-step title="确认订单、付款" icon="el-icon-loading"></el-step>
    <el-step title="订单完成" icon="el-icon-edit-outline"></el-step>
  </el-steps>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>车辆信息</h3>
    </div>
    <img src="https://www.car2go.cn/media/data/china/images/______10_492x20_small_492x20.jpg" alt="test" width="230px" height="140px"  class="img1">
    <div class="text itemleft">
      <ul>
        <li>品牌型号:test</li>
        <li>汽车类型:test</li>
        <li>座位数量:test</li>
      </ul>
      <ul>
        <li>燃料类型:test</li>
        <li>驱动方式:test</li>
        <li>日租价格:test</li>
      </ul>
    </div>
    <div class="text itemrigh">
      <h4>取车</h4>
      <p><i class="el-icon-time"></i>  test</p>
      <a  href="javascript:void(0);" @click="centerDialogVisible = true"><i class="el-icon-location-outline" ></i> {{location}}</a>
    </div>
    <div class="text itemrigh">
      <h4>还车</h4>
      <p><i class="el-icon-time"></i>  test</p>

      <a  href="javascript:void(0);" @click="centerDialogVisible = true"><i class="el-icon-location-outline" ></i> {{location}}</a>
    </div>
  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>租车人信息</h3>
    </div>
    <el-table :data="tableid" style="width: 100%">
      <el-table-column prop="date" label="取车时,出示以下证件的原件：本人二代身份证、本人国内有效驾驶证正副本！" width="540px">
      </el-table-column>
      <el-table-column prop="name" label="" width="615px">
      </el-table-column>


    </el-table>

  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>费用明细</h3>
    </div>
    <el-table :data="tableprice" style="width: 100%">
    <el-table-column prop="price" label="款项" width="400px">
    </el-table-column>
    <el-table-column prop="num" label="单价(￥)" width="415px">
    </el-table-column>
      <el-table-column prop="allnum" label="总计(￥)" width="340px">
      </el-table-column>
    </el-table>
  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>确认支付</h3>
    </div>
    <el-button @click="pay">我已经付款</el-button>
  </el-card>

  <el-dialog :visible.sync="centerDialogVisible" width="72%"  id="dia" :lock-scroll="false">
    <baidu-map class="map" :center="{lng:lng, lat:lat}" :zoom="15">
      <bm-marker :position="{lng:lng, lat:lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label :content=location :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
      </bm-marker>
    </baidu-map>
  </el-dialog>



</div>



</template>

<script>
  import store from '@/store/store'
    export default {
        name: "MyOrder",
      data(){
          return{
            //汽车图片来源
            sre:'',
            tableid: [{
              date: '姓名',
              name: 'test',
            }, {
              date: '租车本人身份证号码',
              name: '123456789123456',
            }, {
              date: '联系号码',
              name: '123456',
            }],
            tableprice: [{
              price: '基础服务费',
              num: '40',
              allnum: '40'
            }, {
              price: '车辆租赁及服务费',
              num: '40',
              allnum: '80'
            }, {
              price: '押金',
              num: '400',
              allnum: '400'
            }, {
              price: '总计',
              num: '',
              allnum: '4000'
            }],

            centerDialogVisible: false,
            location:'广州天河店',
            lng: 113.680837,
            lat:24.78101,        //店面坐标113.680837,24.78101

          //  汽车信息
          //   图片信息

            fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],


          }
      },
      methods:{
        //  上传照片方法
        uploadOverrun: function() {
          this.$message({
            type: 'error',
            message: '上传文件个数超出限制!最多上传3张图片!'
          });
        },
        changeUpload: function(file, fileList) {//预览图片
          this.fileList = fileList;
          this.$nextTick(
            () => {
              let upload_list_li = document.getElementsByClassName('el-upload-list')[0].children;
              for (let i = 0; i < upload_list_li.length; i++) {
                let li_a = upload_list_li[i].children[0];
                let imgElement = document.createElement("img");
                imgElement.setAttribute('src', fileList[i].url);
                imgElement.setAttribute('style', "max-width:50%;padding-left:25%");
                if (li_a.lastElementChild.nodeName !== 'IMG') {
                  li_a.appendChild(imgElement);
                }
              }
            })
        },
        submitUpload: function(content) {//自定义的上传图片的方法
          //1. 创建formData 利用AXIOS传递
          let formData = new FormData;
          formData.append('file', content.file);
          let config = {
            'Content-Type': 'multipart/form-data'
          }
          let var_this = this;
          axios.post('/api/test01/axiosphp.php', formData, config)
            .then(function(response) {
              if (!response.data.success) {
                var_this.$message({
                  message: response.data.message,
                  type: 'error'
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            })
        },
        submitAssess: function() {this.$refs.upload.submit(); //调用submit方法
          //其他业务代码。
        },
        //  上传照片方法

        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },

        pay(){
          if(1){
            this.$router.push({name:'error'});
          }else{
            this.$message({
              type: 'warning',
              message: '付款失败了呢'
            });
          }
        }
        //  http://localhost:8889/public/index.php


      },
      beforeRouteEnter (to, from, next) {
        // 导航守卫，进入该组件的对应路由时调用
        if (store.state.orderselect){      //如果没有输入则返回上一个页面

          // next(vm => {
          //     // 通过 `vm` 访问组件实例
          //   vm.$router.go(-1);
          //   });
          next({
            name: 'error'
            // query: { redirect: to.fullPath},
            // params:{err:1}
          })
        }else{
          next()
        }
      },
    //  离开组件路由守卫（即离开是会提醒是否离开）
      beforeRouteLeave (to, from , next) {
        this.$confirm('订单正在进行中, 是否取消订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          next()
        }).catch(() => {
          next(false)
        });
      },


    }
</script>

<style scoped>
  .step{
    margin-top: 30px;  
  }
  .img1{
    float: right;
  }
  a{color: #36401e;text-decoration:none;}
  #dia{
    padding: 0px 0px 0px 0px;
  }
  .map {
    width: 100%;
    height: 400px;
  }
  i{
    font-size: 20px;
  }
  .order{
    text-align: left;
  }
  .text {
    font-size: 16px;
  }

  .itemleft {
    margin-bottom: 18px;
    width: 480px;
    float: left;
  }
  .itemrigh{
    text-align:left;
    margin-bottom: 18px;
    width: 220px;
    float: left;
    line-height: 180%;
  }
  /*li最后一个属性的css样式*/
  .itemleft li:last-child{
    padding: 5px 0px 35px 0px;
  }
  .itemleft li{
    float: left;
    list-style:none;
    padding: 5px 60px 20px 0px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    margin:0 auto;
    width: 1200px;
    margin-bottom: 30px;
    margin-top: 10px;
  }

</style>
