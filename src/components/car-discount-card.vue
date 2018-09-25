<template>
    <div>
      <el-row>
        <el-col :xs="12" :sm="12" :md="{span:10, offset:2}" :lg="{span:8, offset:4}" :xl="{span:6, offset:6}">


            <div class="colright">
              <el-card :body-style="{ padding: '0px',width:'490px',height:'330px'}" >
              <img :src="data[0].dis_photo_url" width="490px" height="330px">
              </el-card>
            </div>
        </el-col>
        <el-col :xs="11" :sm="11" :md="9" :lg="7" :xl="5">
          <div class="colleft">
            <h1 >{{data[0].title}}</h1><br>
            <p>{{data[0].page}}</p>
          </div>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :xs="12" :sm="{span:11, offset:1}" :md="{span:9, offset:3}" :lg="{span:7, offset:5}" :xl="{span:5, offset:7}">
          <div class="colright">
            <h1 >{{data[1].title}}</h1><br>
            <p>{{data[1].page}}</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
          <div class="colleft">
            <el-card  :body-style="{ padding: '0px' ,width:'490px',height:'330px' }">
              <img :src="data[1].dis_photo_url" width="490px" height="330px">
            </el-card>

          </div>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :xs="12" :sm="12" :md="{span:10, offset:2}" :lg="{span:8, offset:4}" :xl="{span:6, offset:6}">
          <div class="colright">
            <el-card  :body-style="{ padding: '0px' ,width:'490px',height:'330px'}">
              <img :src="data[2].dis_photo_url" width="490px" height="330px">
            </el-card>


          </div>

        </el-col>
        <el-col :xs="11" :sm="11" :md="9" :lg="7" :xl="5">
          <div class="colleft">
            <h1 >{{data[2].title}}</h1><br>
            <p>{{data[2].page}}</p>
          </div>
        </el-col>
      </el-row>

    </div>
</template>

<script>
    export default {
        name: "car-discount-card",
      data() {
        return {
          data: this.option.data,
        }
      },
      props: {
        option: {
          type: Object,
          default: () => {}
        }
      },

    }
</script>

<style scoped>
  .colright{
    float: right;
    margin: 20px;
    text-shadow: 1px 1px 20px #00000073;
  }
  .colleft{
    float: left;
    margin: 20px;
    text-shadow: 1px 1px 20px #00000073;
  }
  p{
    float: left;
    line-height: 175%;
    letter-spacing:2px;
  }



</style>
