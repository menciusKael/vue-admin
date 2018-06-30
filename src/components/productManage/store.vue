<template>
  <div class="store">
    <header>
      <h3>店铺管理</h3>
    </header>
    <section class="store-main">
      <div class="store-left">

      </div>
      <div class="store-right">
        <el-form ref="storeForm"
                 :model="storeForm"
                 :rules="rules" class="demo-ruleForm"
                 label-width="160px"
                 label-position="left">
          <el-form-item label="店铺名字" prop="name">
            <el-col :span="12">
              <el-input v-model="storeForm.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="店铺LOGO" prop="logo">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog
              :visible.sync="dialogVisible"
              :limit="3"
              :on-exceed="limits">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="店铺图片" prop="imgs">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"

              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog
              :visible.sync="dialogVisible"
              :limit="3"
              :on-exceed="limits">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="店铺介绍" prop="introduce">
            <el-input type="textarea" v-model="storeForm.introduce" :rows="6"></el-input>
          </el-form-item>
          <el-form-item label="店铺电话" prop="mobile">
            <el-input v-model="storeForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告" prop="notice">
            <el-input v-model="storeForm.notice"></el-input>
          </el-form-item>
          <el-form-item label="配送时间 " prop="name">
            <span style="float: left">平均配送 &nbsp;</span><el-input v-model="storeForm.name" style="width: 50px"></el-input> &nbsp;分钟
          </el-form-item>
          <el-form-item label="配送方式" prop="region">
            <el-select v-model="storeForm.region" placeholder="请选择配送方式">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起送价" prop="mobile">
            <el-input v-model="storeForm.mobile" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="配送价" prop="mobile">
            <el-input v-model="storeForm.mobile" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="送餐范围" prop="mobile">
            <el-input v-model="storeForm.mobile" style="width: 100px"></el-input> 米
          </el-form-item>
          <el-form-item label="营业时间" required>
            <el-col :span="4">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="storeForm.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">至</el-col>
            <el-col :span="4">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time"
                                placeholder="选择时间"
                                v-model="storeForm.date2"
                                style="width: 100%;">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="店铺位置" prop="notice">
            <div style="border: 1px solid;height: 50px"></div>
            <div style="width: 60%;height: 300px">
              <baidu-map style="height: 300px"></baidu-map>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    nema: 'store',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        storeForm: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入店铺名字', trigger: 'blur'}
          ],
          logo: [
            {required: true, message: '请上传店铺logo', trigger: 'blur'}
          ],
          imgs: [
            {required: true, message: '请上传店铺图片', trigger: 'blur'}
          ],
          introduce: [
            {required: true, message: '请输入店铺介绍', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入店铺联系电话', trigger: 'blur'}
          ],
          notice: [
            {required: true, message: '请输入店铺公告', trigger: 'blur'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          region: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      limits() {
        alert(1)
      }
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe {
    overflow: hidden;
    border: 1px solid;
    margin: 0 auto;
  }

  /*
  设置宽高overflow
  */
  @mixin aspect($width,$height) {
    width: $width;
    height: $height;
    overflow: hidden;
  }

  .store {
    header {
      margin-bottom: 60px;
      h3 {
        padding: 10px 0;
      }
    }
    @include aspect(100%, 100%);
    .store-main {
      width: 70%;
      overflow: hidden;
      .store-left{
        width: 300px;
        height: 500px;
        overflow: hidden;
        float: left;
        margin-right: 30px;
        border: 1px solid;
      }
      .store-right{
        overflow: hidden;
        float: left;
      }
    }
  }
</style>
