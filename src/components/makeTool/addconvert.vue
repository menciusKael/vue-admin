<template>
  <div class="addVip">
    <header>
      <h3>添加兑换券</h3>
      <div  class="head-right">
        <button type="button" class="btn btn-primary" @click="back">返回</button>
      </div>
    </header>
    <section class="addVip-main">
      <div class="addVip-mainLeft">

      </div>
      <div class="addVip-mainRight">
        <el-form ref="form" :model="form" :label-position="labelPosition" label="right" label-width="140px">
          <el-form-item
            label="兑换券名称"
          >
           <el-input style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item
            label="设置兑换"
          >
            <div>
              <el-radio-group v-model="form.resource">
                <el-radio label="购买指定商品"></el-radio>
              </el-radio-group>
              <el-button type="primary" size="small">添加商品</el-button>
            </div>
            <div>
              <el-radio-group v-model="form.resource">
                <el-radio></el-radio>
              </el-radio-group>
              <span >消费满 <el-input v-model="form.name" style="width: 40px;"></el-input> 元可兑换</span>
            </div>
          </el-form-item>
          <el-form-item
            label="添加商品"
          >
            <el-button type="primary" size="small">添加商品</el-button>
          </el-form-item>
          <el-form-item
            label="领取时间"
          >
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
            <el-input style="width: 40px"></el-input><span> 张 </span>
          </el-form-item>
          <el-form-item label="联系我们">
            <el-input v-model="form.name" style="width: 280px"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.desc" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button @click="returnbtn">取消</el-button>
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
      },
      back(){
        this.$router.go(-1);
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
  .addVip{
    @include aspect(100%,100%);
    header{
      padding-left: 30px;
      padding-top: 20px;
      margin-bottom: 50px;
      width: 100%;
      overflow: hidden;
      .head-right{
        float: right;
        margin-top: 20px;
        margin-right: 100px;
      }
    }
    .addVip-main{
      overflow: hidden;
      @include aspect(100%,100%);
      .addVip-mainLeft{
        width: 30%;
        height: 500px;
        float: left;
        border: 1px solid;
      }
      .addVip-mainRight{
        width: 50%;
        height: auto;
        float: left;
        overflow: hidden;
        padding-left: 20px;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 16px;
        color: #8c939d;
        width: 88px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        border: 1px solid;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
</style>
