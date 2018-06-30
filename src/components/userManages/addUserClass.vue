<template>
  <div class="addClass">
    <header>
      <h3>{{ headH1 }}</h3>
      <button type="button" class="btn btn-primary" @click="returnbtn"> 返 回 </button>
    </header>
    <section class="addClass-main">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon="true">
        <el-form-item label="分类名称" prop="name">
          <el-col :span="8">
            <el-input v-model="ruleForm.name" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="分类图片" prop="picture">
          <div style="width: 146px;height: 146px;border: 1px dashed #c0ccda;overflow: hidden;float: left" v-if="isInitial">
            <img :src="imgurl" alt="" style="width: 100%;height: 100%;display: block">
          </div>
          <el-upload
            action="http://mps.essocial.com.cn/backend/common/upload"
            name="image"
            list-type="picture-card"
            :limit="2"
            :on-preview="handlePictureCardPreview"
            :on-success="hans"
            :on-change="onFilesAdded"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="ruleForm.picture" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="描述" prop="desc" >
          <el-input type="textarea" v-model="ruleForm.description" :rows="8"></el-input>
          <!--<div class="editor-container">
            <UE :defaultMsg=ruleForm.description :config=config ref="ue"></UE>
          </div>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  import UE from '../ue';
  export default {
    data () {
      return {
        headH1:'',
        isInitial:true,
        imgurl:'',
        ruleForm: {
          picture:'',
          name:'',
          description: ''
        },
        dialogVisible: false,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 250
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.$route.query.edit === '编辑用户分组'){
              this.$axios.post('/customer_group/editCustomerGroup',this.ruleForm)
                .then((response) =>{
                  //console.log(this.ruleForm)
                  if(response.data.status === 1){
                    this.$message({
                      showClose: true,
                      message: response.data.message,
                      type: 'success'
                    });
                  }else {
                    this.$message({
                      showClose: true,
                      message: response.data.message,
                      type: 'error'
                    });
                  }
                })
            }else if(this.$route.query.edit === '添加用户分组'){
              //console.log(this.$refs.ue.getUEContent())
              this.isInitial = false
              //this.ruleForm.description = this.$refs.ue.getUEContent()
              this.$axios.post('/customer_group/addCustomerGroup',this.ruleForm)
                .then((response) =>{
                  //console.log(this.ruleForm)
                  if(response.data.status === 1){
                    this.$message({
                      showClose: true,
                      message: response.data.message,
                      type: 'success'
                    });
                  }else {
                    this.$message({
                      showClose: true,
                      message: response.data.message,
                      type: 'error'
                    });
                  }
                })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {

        this.ruleForm.picture = file.url;
        console.log(file)
        this.dialogVisible = true;
      },
      returnbtn(){
        this.$router.go(-1)
      },
      onFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      },
      hans(response, file, fileList){
        this.isInitial = false
        this.ruleForm.picture = response
        //console.log(response)
      }
    },
    created(){
      this.$nextTick(function () {
          this.headH1 = this.$route.query.edit
        if(this.$route.query.edit === '编辑用户分组'){
            this.$axios.post('/customer_group/getCustomerGroupDetail',{'customer_group_id':this.$route.query.data})
              .then((response)=>{
                //console.log(response)
                this.imgurl ='http://mps.essocial.com.cn'+ response.data.data.picture
                this.ruleForm = response.data.data
              })
        }else {
            this.isInitial = false
        }
      })
    },
    components: {
      UE
    }
  }
</script>
<style scoped lang="scss">
  @mixin border_overfloe{
    overflow: hidden;
    border: 1px solid;
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
  .addClass{
    @include aspect(100%,100%);
    header{
      height: 60px;
      width: 100%;
      overflow: hidden;
      h3{
        float: left;
      }
      .btn-primary{
        margin-top: 10px;
        margin-right: 300px;
        float: right;
      }
    }
    .addClass-main{
      height: 100%;
      width: 70%;
    }
  }
</style>
