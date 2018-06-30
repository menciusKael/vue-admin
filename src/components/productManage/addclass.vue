<template>
  <div class="addClass">
    <header>
      <h3>添加分类</h3>
      <button type="button" class="btn btn-primary" @click="returnbtn"> 返 回 </button>
    </header>
    <section class="addClass-main">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" status-icon="true">
        <el-form-item label="上级分类" prop="parent_group">
          <el-col :span="8">
            <el-select v-model="ruleForm.parent_group" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.name"
                >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="分类图片" prop="picture">
          <el-upload
            action="http://mps.essocial.com.cn/backend/common/upload"
            name="image"
            list-type="picture-card"
            :limit="2"
            :on-preview="handlePictureCardPreview"
            :on-success="hans"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="ruleForm.picture" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="分类名称" prop="classname">
          <el-col :span="8">
            <el-input v-model="ruleForm.name" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述" prop="desc" >
          <el-input type="textarea" v-model="ruleForm.description" :rows="8"></el-input>

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
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
  export default {
    nema: 'addclass',
    data () {
      return {
        ruleForm: {
          parent_group: '',
          picture:'',
          name:'',
          description: '',
          parent_group_id:''
        },
        dialogVisible: false,
        options:[]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for(let i in this.options){
              if(this.options[i].name === this.ruleForm.parent_group){
                this.ruleForm.parent_group_id = this.options[i].product_group_id
              }
            }
            //console.log(this.ruleForm)
            this.$axios.post('/common/upload')
              .then((response)=>{
              //console.log(response)
            })
            this.$axios.post('/product_group/addProductGroup',this.ruleForm)
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
        this.dialogImageUrl = file.url;
        //console.log(file.response)
        this.dialogVisible = true;
      },
      returnbtn(){
        this.$router.go(-1)
      },
      hans(response, file, fileList){
        this.ruleForm.picture = response
       //console.log(response)
      }
    },
    created(){
      this.$nextTick(function () {
        //console.log(this.ruleForm)
        this.$axios.post('/product_group/getProductGroupList')
          .then((response)=>{
            console.log(response)
            if(response.data.status===1){
              this.options = response.data.data
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
      })
    },


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
