<template>
  <div class="addVoucher">
    <header>
      <h3>添加代金券</h3>
    </header>
    <section class="addVoucher-main">
      <div class="img-left">

      </div>
      <div class="addVoucher-content">
        <el-form ref="form" :model="form" :label-position="labelPosition" label="right" label-width="120px">
          <el-form-item
            label="名称"
          >
            caffe dei Ritti 德炳瑞
          </el-form-item>
          <el-form-item
            label="LOGO"
          >
            <div style="width: 50px;height: 50px;border: 1px solid;float: left">

            </div>
            <p>如需修改设置，请在后台管理处修改</p>
          </el-form-item>
          <el-form-item
            label="代金券名称"
          >
            <el-input style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="优惠设置">
            <el-input style="width: 60px"></el-input>
            <span>元代金券,单笔订单金额满</span>
            <el-input style="width: 60px"></el-input>
            <span>元，可使用</span>
          </el-form-item>
          <el-form-item label="选择商品">
            <el-radio-group v-model="form.resource">
              <div>
                <el-radio label="全部商品"></el-radio>
              </div>
              <div>
                <el-radio label="部分商品"></el-radio>
                <el-button style="margin-left: 20px"  type="primary">添加商品</el-button>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="领取时间">
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
          <el-form-item label="有效期">
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
          <el-form-item label="可用时间">
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
          <el-form-item label="库存">
            <el-input style="width: 40px"></el-input><span> 份 </span>
          </el-form-item>
          <el-form-item label="领取限制">
            <el-input style="width: 40px"></el-input><span> 张 </span> <span style="font-size: 12px">*每个用户领取上限,如不填则默认为1</span>
          </el-form-item>
          <el-form-item label="联系我们">
            <el-input v-model="form.name" style="width: 280px"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.desc" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value7:'',
        labelPosition:'right',
        form: {
          name: '',
          resource: '',
          type: '',
          desc: ''
        },
        color1: '#409EFF',
        imageUrl: '',
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: ''
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
      overflow: hidden;
      h3{
        margin-top: 20px;
        margin-left: 30px;
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
