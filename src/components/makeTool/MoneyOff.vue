<template>
  <div class="addVoucher">
    <header>
      <h3>满减规则</h3>
    </header>
    <section class="addVoucher-main">
      <el-form ref="form" label-width="140px">
        <el-form-item label="满减设置：满">
          <el-input style="width: 60px"></el-input>
          <span>元，减</span>
          <el-input style="width: 60px"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="选择商品">
          <el-radio-group v-model="resource">
            <div>
              <el-radio label="全部商品"></el-radio>
            </div>
            <div>
              <el-radio label="部分商品"></el-radio>
              <el-button style="margin-left: 20px"  type="primary">添加商品</el-button>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动时间">
          <div class="block">
            <el-date-picker
              v-model="value3"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        resource: '',
        value3: ''
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
  .addVoucher{
    @include aspect(100%,100%);
    header{
      width: 100%;
      height: auto;
      margin-bottom: 20px;
      overflow: hidden;
      h3{
        margin-top: 30px;
        margin-left: 20px;
      }
    }
    section{
      width: 100%;
      height: auto;
      overflow: hidden;
      .img-left{
        width: 400px;
        height: 600px;
        border: 1px solid;
        float: left;
      }
      .addVoucher-content{
        margin-left: 20px;
        float: left;
      }
    }
  }
</style>
