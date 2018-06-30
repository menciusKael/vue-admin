<template>
  <div class="addCommod">
    <header>
      <h3>编辑电商商品</h3>
      <button type="button" class="btn btn-primary" @click="returnbtn"> 返 回 </button>
    </header>
    <section class="addCommod-main">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" label-position="left">
        <el-form-item label="选择分类" prop="product_group_id">
          <el-select v-model="ruleForm.product_group_id" placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.product_group_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" prop="name">
          <el-col :span="8">
            <el-input v-model="ruleForm.name" ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="上传图片" prop="pictures">
          <el-upload
            ref="upload"
            action="http://mps.essocial.com.cn/backend/common/upload"
            list-type="picture-card"
            :file-list="ruleForm.pictures"
            name="image"
            :on-preview="handlePictureCardPreview"
            :on-success="getDataImg"
            :on-change="onFilesAdded"
            :on-remove="handleRemove">
            <div slot="tip" class="el-upload__tip">最多只能上传5张，且不超过2M</div>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品规格" prop="guige">
          <el-tag
            :key="tag.title"
            v-for="tag in this.editableTabs"
            closable
            :disable-transitions="false"
            @close="handleClose(tag.title)">
            {{tag.title}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="ruleForm.inputValue"
            ref="saveTagInput"
            size="small"
            color="#ebf5ff"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 自定义</el-button>
          <el-tabs
            v-model="editableTabsValue"
            type="border-card"
            @tab-remove='handleClose(editableTabsValue)'
            editable
            @tab-add="handleInputConfirm(editableTabsValue)">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              {{item.content}}
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="虚拟价格" prop="virtual_price">
          <el-col :span="6">
            <el-input v-model="ruleForm.virtual_price" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-col :span="6">
            <el-input v-model="ruleForm.price" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-col :span="6">
            <el-input v-model="ruleForm.stock" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品重量" prop="weight">
          <el-col :span="4">
            <el-input v-model="ruleForm.weight" type="number"></el-input>
          </el-col>
          <span style="margin-left: 10px">kg</span>
        </el-form-item>
        <el-form-item label="商品体积" prop="volume">
          <el-col :span="4">
            <el-input v-model="ruleForm.volume" type="number"></el-input>
          </el-col>
          <span style="margin-left: 10px">cm^</span>
        </el-form-item>
        <el-form-item label="运费">
          <el-input type="number" v-model="ruleForm.freight" style="width: 100px"></el-input>
          <span>元</span>
        </el-form-item>
        <el-form-item label="城市定位" prop="location">
          <el-switch v-model="ruleForm.location"></el-switch>
          <div class="area" v-if="ruleForm.location">
            <area-select :level="2" type="text" v-model="ruleForm.selected"></area-select>
          </div>
        </el-form-item>
        <el-form-item label="推荐" prop="recommend">
          <el-switch v-model="ruleForm.recommend"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <div style="margin-bottom:100px" class="quill-wrap">
            <quill-editor
              v-model="ruleForm.description"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  import {quillRedefine} from 'vue-quill-editor-upload'
  import {quillEditor} from 'vue-quill-editor'
  export default {
    components: {quillEditor, quillRedefine},
    name: 'addCommod',
    data () {
      return {
        options: [],
        ruleForm: {
          product_group_id:'',
          name: '',
          virtual_price:'',
          pictures:[],
          price:'',
          stock:'',
          weight:'',
          volume:'',
          recommend: false,
          location:false,
          freight: '',
          guige:'',
          description: '',
          selected:[],
          inputValue: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        editableTabsValue:'2',
        editableTabs: [{
          title: '尺码',
          name: '1',
          content: '尺码'
        }, {
          title: '颜色',
          name: '2',
          content: '颜色'
        },{
          title: '口味',
          name: '3',
          content: '口味'
        },{
          title: '尺寸',
          name: '4',
          content: '尺寸'
        },{
          title: '型号',
          name: '5',
          content: '型号'
        },{
          title: '重量',
          name: '6',
          content: '重量'
        }
        ],
        //规格
        dynamicTags: ['尺码', '颜色', '口味','尺寸','型号','重量'],
        inputVisible: false,
        tabIndex:2,
        //富文本
        serverUrl:'http://mps.essocial.com.cn/backend/common/upload_description',
        editorOption:{},
      }
    },
    methods: {
      returnbtn(){
        this.$router.go(-1)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //编辑页面数据
              let databes = {
                name: this.ruleForm.name,
                product_group_id:this.ruleForm.product_group_id,
                product_id:this.ruleForm.product_id,
                price:this.ruleForm.price,
                virtual_price:this.ruleForm.virtual_price,
                stock:this.ruleForm.stock,
                location:Array.from(this.ruleForm.selected),
                description:this.ruleForm.description,
                pictures:Array.from(this.ruleForm.pictures),
                weight:this.ruleForm.weight,
                volume:this.ruleForm.volume,
                freight:this.ruleForm.freight,
                recommend:this.ruleForm.recommend
              }
              //console.log(databes)
              this.$axios.post("/product/editProduct",databes).then((response) =>{
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
      //上传图片限制
      onFilesAdded(file,fileList){
        if(this.ruleForm.pictures.length > 5){
          alert('最多添加5张图片！')
          fileList.splice(fileList.indexOf(file),1)
        }
        //this.ruleForm.pictures = fileList.filter(f => f.status === 'ready')
      },
      //删除图片
      handleRemove(file, fileList) {
        this.ruleForm.pictures.splice(this.ruleForm.pictures.indexOf(file),1)
        return this.ruleForm.pictures
      },
      //预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //获取上传图片详情
      getDataImg(response,file, fileList){
        let ponse = {
          uid:file.uid,
          url:'http://mps.essocial.com.cn'+ file.response,
          status:file.status
        }
        if(this.ruleForm.pictures.length >= 5){
          this.ruleForm.pictures.splice(this.ruleForm.pictures.length,1)
        }else {
          this.ruleForm.pictures.push(ponse)
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //规格方法
      handleInputConfirm() {
        let inputValue = this.ruleForm.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: this.ruleForm.inputValue,
          name: newTabName,
          content: 'New Tab content'
        });
        this.ruleForm.inputValue = '';
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleClose(tag,targetName) {
        this.editableTabs.splice(this.editableTabs.indexOf(tag), 1);
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;

        /*if(activeName === targetName){
          tabs.forEach((tab,index) =>{
            if(tab.name === targetName){
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          })
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);*/
      },
    },
    created(){
      this.editorOption = quillRedefine({
        // 图片上传的设置
        uploadConfig: {
          action: this.serverUrl,  // 必填参数 图片上传地址
          methods: 'POST',
          res: (respnse) => {
            //console.log(respnse)
            return respnse.result.img
          },
          name: 'image',  // 图片上传参数名
          success: () => {

          },
        }
      })
      this.$axios.post('/product_group/getProductGroupList')
        .then((response)=>{
          this.options = response.data.data
        })
        this.$axios.post('/product/getProductDetail',{'product_id':this.$route.query.product_id})
          .then((response)=>{
            //console.log(response)
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
            this.ruleForm = response.data.data
          })
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
  .addCommod{
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
    .addCommod-main{
      width: 60%;
      .el-tag + .el-tag {
        margin-left: 10px !important;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
  }
</style>
