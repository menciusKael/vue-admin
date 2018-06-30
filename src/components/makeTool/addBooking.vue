<template>
  <div class="addBooking">
    <header class="addBooking-head">
      <h3>添加拼团</h3>
    </header>
    <section class="addBooking-main">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="拼团名称">
          <el-col :span="6">
            <el-input></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="拼团人数">
          <el-col :span="6">
            <el-input></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="拼团时间">
          <div class="block">
            <el-date-picker
              v-model="value5"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="限购件数">
          <el-col :span="2">
            <el-input></el-input>
          </el-col>
          <span style="font-size: 12px;margin-left: 10px">为保证利益，建议请对每位用户每次参团可购买件数进行限制</span>
        </el-form-item>
        <el-form-item label="拼团商品">
          <el-button type="primary">添加商品</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value5: '',
        form: {

        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    margin: 0 auto;
  }
  /*
  设置宽高overflow
  */
  @mixin aspect($width,$height){
    width: $width;
    height: $height;
    overflow: hidden;
  }
.addBooking{
  @include aspect(100%,100%);
  header{
    width: 100%;
    height: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    h3{
      margin-left: 30px;
    }
  }
  section{
    width: 100%;
    height: auto;
    overflow: hidden;
    .line{
      text-align: center;
    }
  }
}
</style>
