<template>
  <div class="addvidel">
    <header>
      <h3>添加视频</h3>
    </header>
    <section class="addvideo-main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="选择分类">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称">
          <el-input style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="3"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" style="width: 300px">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="视频描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea3"style="width: 600px">
          </el-input>
        </el-form-item>
        <el-form-item label="视频类型">
          <el-radio-group v-model="form.resource">
            <div>
              <el-radio label="免费"></el-radio>
            </div>
            <div>
              <el-radio label="付费观看"></el-radio>
            </div>
            <div>
              <span style="font-size: 14px"> &nbsp;虚拟价格 &nbsp;</span><el-input style="width: 60px"></el-input>
              <span style="font-size: 14px">&nbsp;价格&nbsp;</span><el-input style="width: 60px"></el-input><span style="font-size: 14px">&nbsp;元，库存&nbsp;</span><el-input style="width: 60px"></el-input>
            </div>
            <div style="margin-top: 20px">
              <span style="font-size: 14px"> &nbsp;试播时间 &nbsp;</span><el-input style="width: 60px"></el-input>
              <span style="font-size: 12px">（注：本项空置不填，无试播付费功能）</span>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        textarea3:'',
        dialogImageUrl:'',
        dialogVisible:false,
        form: {

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
      }
    }
  }
</script>
<style scoped lang="scss">
  .addvidel{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
    }
    .addvideo-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
