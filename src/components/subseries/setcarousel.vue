<template>
  <div class="setcarousel">
    <header>
      <h3>轮播编辑</h3>
      <div class="classManageBtn">
        <div class="classManageright">
          <button type="button" class="btn btn-primary" @click="returnbtn">返回</button>
          <button type="button" class="btn btn-primary" @click="addCarousel('form')">添加轮播图</button>
          <el-button type="danger" @click="listDelete">批量删除 <i class="el-icon-delete"></i></el-button>
        </div>
      </div>
    </header>
    <section class="setcarousel-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="order"
          sortable
          label="排序">

        </el-table-column>
        <el-table-column
          prop="description"
          label="轮播描述">

        </el-table-column>
        <el-table-column
          label="商品图片"
          prop="picture">
          <template slot-scope="scope">
            <div style="width: 178px;height: 158px">
              <img :src="scope.row.picture" alt="" style="width: 100%;height: 100%;display: block">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="link_name"
          label="跳转">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <transition name="el-fade-in-linear">
      <div v-if="isShow" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>{{ headspan }}</span> <i class="el-icon-close clos" @click="isShow = !isShow"></i></p>
          </div>
          <div class="buyBambino-main">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="轮播描述">
                <el-col :span="12">
                  <el-input v-model="form.description"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="添加图片">
                <el-upload
                  class="avatar-uploader"
                  style="border: 1px #bfcbd9 solid;width: 178px;height: 178px"
                  action="http://mps.essocial.com.cn/backend/common/upload"
                  name="image"
                  :show-file-list="false"
                  :on-success="addhandleAvatarSuccess"
                  :before-upload="addbeforeAvatarUpload">
                  <img v-if="form.picture" :src="form.pictures" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="跳转地址">
                <el-col :span="12">
                  <el-cascader
                    :options="options"
                    v-model="form.children"
                    :show-all-levels="false"
                    @change="addhandleChange">
                  </el-cascader>
                </el-col>
              </el-form-item>
              <el-form-item>
                <button type="button" class="btn btn-primary" @click="addsubmitForm('form')">立即添加</button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div v-if="isShows" class="Mask">
        <div class="buyBambino">
          <div class="buyBambino-head">
            <p><span>编辑轮播</span> <i class="el-icon-close clos" @click="isShows = !isShows"></i></p>
          </div>
          <div class="buyBambino-main">
            <el-form ref="forms" :model="forms" label-width="120px">
              <el-form-item label="轮播排序">
                <el-col :span="12">
                  <el-input v-model="forms.order"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="轮播描述">
                <el-col :span="12">
                  <el-input v-model="forms.description"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="添加图片">
                <el-upload
                  ref="upload"
                  action="http://mps.essocial.com.cn/backend/common/upload_description"
                  name="image"
                  list-type="picture-card"
                  :file-list="forms.picture"
                  :on-success="edithandleAvatarSuccess"
                  :on-preview="handlePictureCardPreview"
                  :on-change="onFilesAdded"
                  :on-remove="edithandleRemove">
                  <div slot="tip" class="el-upload__tip">最多只能上传1张，且不超过2M</div>
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <el-form-item label="跳转地址">
                <el-col :span="12">
                  <el-cascader
                    :options="options"
                    v-model="forms.children"
                    :show-all-levels="false"
                    @change="edithandleChange">
                  </el-cascader>
                </el-col>
              </el-form-item>
              <el-form-item>
                <button type="button" class="btn btn-primary" @click="editsubmitForm('forms')">立即保存</button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        imageUrl: '',
        isShow:false,
        isShows:false,
        dialogVisible: false,
        isInitial:true,
        headspan:'',
        dialogImageUrl: '',
        form:{
          description:'',
          picture:'',
          pictures:'',
          link_value:'',
          children:[],
          link_name:'',
          link_type:''
        },
        forms:{
          slider_pic_id:'',
          description:'',
          picture:[],
          pictures:'',
          link_value:'',
          children:[],
          link_name:'',
          link_type:''
        },
        tableData: [],
        multipleSelection: [],
        options: []
      }
    },
    methods:{
      returnbtn(){
        this.$router.go(-1)
      },
      addCarousel(){
        this.headspan = '添加轮播'
        this.isShow =! this.isShow
        this.form = {
          description:'',
          picture:'',
          pictures:'',
          link_value:'',
          children:[]
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addhandleChange(value){
        let val = ''
        if(value.length === 1){
          val = value[0]
        }else if(value.length === 2){
          val = value[1]
        }
        for(let i in this.options){
          if(Object.keys(this.options[i]).length > 2){
            for(let j in this.options[i].children){
              if(val === this.options[i].children[j].value){
                this.form.link_name = this.options[i].children[j].label
                this.form.link_type = this.options[i].children[j].type
                //console.log(this.options[i].children[j].label)
              }
            }
          }else {
            if(val === this.options[i].value){
              this.forms.link_name = this.options[i].label
              //console.log(this.forms.link_label)
            }
          }
        }
       // console.log(value)
      },
      edithandleChange(value){
        let val = ''
        if(value.length === 1){
          val = value[0]
        }else if(value.length === 2){
          val = value[1]
        }
        for(let i in this.options){
          if(Object.keys(this.options[i]).length > 2){
            for(let j in this.options[i].children){
              if(val === this.options[i].children[j].value){
                this.forms.link_name = this.options[i].children[j].label
                this.forms.link_type = this.options[i].children[j].type
                //console.log(this.options[i].children[j].label)
              }
            }
          }else {
            if(val === this.options[i].value){
              this.forms.link_name = this.options[i].label
              //console.log(this.forms.link_label)
            }
          }
        }
        // console.log(value)
      },
      handleAvatarSuccess(res, file) {
        this.$message({
          message: '文件上传成功！',
          type: 'success'
        });
        this.imageUrl = res
        return this.imageUrl
      },
      handleEdit(index, row) {
        this.isShows = true
        this.$axios.post('/slider/getSliderPicDetail',{'slider_pic_id':row.slider_pic_id}).then((response)=>{
          this.forms = response.data.data
        })
      },
      //预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      addhandleAvatarSuccess(res, file,row) {
        //this.form.picture = URL.createObjectURL(file.raw);
        console.log(res)
        this.form.picture = res
        this.form.pictures = URL.createObjectURL(file.raw);
      },
      addbeforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      addsubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let sendData = {
              slider_id:this.$route.query.slider_id,
              description:this.form.description,
              picture:this.form.picture,
              link_value:this.form.children,
              link_type:this.form.link_type
            }
            this.$axios.post('/slider/addSliderPic',sendData)
              .then((response)=>{
                //console.log(response)
                if(response.data.status === 1){
                  this.$message({showClose: true, message: response.data.message, type: 'success'});
                  this.$axios.post('/slider/getSliderPicList',{'slider_id':this.$route.query.slider_id})
                    .then((response)=>{
                      if(response.data.status === 1){
                        this.tableData = response.data.data
                      }else {
                        this.$message({
                          showClose: true,
                          message: response.data.message,
                          type: 'error'});
                      }
                    })
                }else {
                  this.$message({showClose: true, message: response.data.message, type: 'error'});
                }
              })
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      edithandleAvatarSuccess(res, file) {
        let imgdata = {
          uid:res.uid,
          status:res.status,
          url:res.result.img
        }
        if(this.forms.picture.length >= 1){
          this.forms.picture.splice( this.forms.picture.length,1)
        }else {
          this.forms.picture.push(imgdata)
        }
      },
      editbeforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      edithandleRemove(file, fileList) {
        this.forms.picture.splice( this.forms.picture.indexOf(file),1)
        return  this.forms.picture
      },
      editsubmitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let sendData = {
              slider_pic_id:this.forms.slider_pic_id,
              description:this.forms.description,
              link_value:this.forms.children,
              picture:this.forms.picture,
              order:this.forms.order,
              link_type:this.forms.link_type
            }
            this.$axios.post('/slider/editSliderPic',sendData)
              .then((response)=>{
                if(response.data.status === 1){
                  this.$message({showClose: true, message: response.data.message, type: 'success'});
                  this.$axios.post('/slider/getSliderPicList',{'slider_id':this.$route.query.slider_id})
                    .then((response)=>{
                      if(response.data.status === 1){
                        this.tableData = response.data.data
                      }else {
                        this.$message({
                          showClose: true,
                          message: response.data.message,
                          type: 'error'});
                      }
                    })
                }else {
                  this.$message({showClose: true, message: response.data.message, type: 'error'});
                }
              })
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      listDelete(index,row){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.slider_pic_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/slider/deleteSliderPicInBatch',
          method:'post',
          data:{
            'slider_pic_id_array':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 1){
            this.$axios.post('/slider/getSliderPicList',{'slider_id':this.$route.query.slider_id}).then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                this.tableData = response.data.data
              }
            })
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
      },
      handleDelete(index,row){
        this.tableData.splice(index,1);
        this.$axios.post('/slider/deleteSliderPic',{'slider_pic_id':row.slider_pic_id}).then((response) =>{
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
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      onFilesAdded(file,fileList){
        if(fileList.length > 1){
          fileList.splice(fileList.indexOf(file),1)
        }
      }
    },
    created(){
      this.$axios.post('/slider/getSliderPicList',{'slider_id':this.$route.query.slider_id})
        .then((response)=> {
          if (response.data.status === 1) {
            this.tableData = response.data.data
            //console.log(response)
          } else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
        })
      this.$axios.post('/page/getPageList')
        .then((response)=> {
          //console.log(response.data.data)
          if (response.data.status === 1) {
            this.options = response.data.data
          } else {
            this.$message({showClose: true, message: response.data.message, type: 'error'});
          }
        })
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
  .setcarousel{
    header {
      height: auto;
      width: 100%;
      overflow: hidden;
      padding-left: 20px;
      margin-bottom: 20px;
      h3 {
        margin-bottom: 20px;
      }
      .classManageBtn{
        @include aspect(100%,auto);
        .classManageright{
          float: right;
          margin-right: 30px;
        }
      }
    }
    .avatar-uploader{
      .el-upload{
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .Mask{
      width: 100%;
      height: 100%;
      z-index: 999;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: 0 auto;
      background-color: rgba(0,0,0,.5);
      .buyBambino{
        width: 600px;
        height: 600px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 9999;
        background-color: #fff;
        border: 1px solid;
        border-radius: 10px;
        .buyBambino-head{
          height: 50px;
          width: 100%;
          overflow: hidden;
          padding-left: 30px;
          background-color: #2e6da4;
          p{
            width: 100%;
            height: 100%;
            overflow: hidden;
            line-height: 50px;
            font-size: 18px;
            color: #fff;
            .clos{
              float: right;
              margin-top: 15px;
              cursor: pointer;
              margin-right: 30px;
            }
          }
        }
        .buyBambino-main{
          margin-top: 20px;
        }
      }
    }
  }
</style>
