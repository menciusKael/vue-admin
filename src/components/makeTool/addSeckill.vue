<template>
  <div class="addSeckill">
    <header>
      <h3>添加秒杀</h3>
    </header>
    <section>
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="商品选择">
          <el-button>添加商品</el-button>
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
        <el-form-item label="秒杀价格">
          <el-input style="width:80px"></el-input>
        </el-form-item>
        <el-form-item label="限购数量">
          <el-input style="width:80px"></el-input>
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
        value3: '',
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
.addSeckill{
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
  }
}
</style>
