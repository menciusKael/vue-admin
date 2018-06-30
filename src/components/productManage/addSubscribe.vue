<template>
  <div class="addCommod">
    <header>
      <h3>{{ headH1 }}</h3>
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
            action="http://mps.essocial.com.cn/backend/common/upload"
            name="image"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-exceed="limitImg"
            :on-success="getDataImg"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="ruleForm.pictures" alt="">
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
        <el-form-item label="预约设置" prop="setYuyue">
          <div>
            <span>预约时间:</span>
            <el-select v-model="ruleForm.daytime" placeholder="预约时间" style="width: 120px">
              <el-option label="工作日" value="0"></el-option>
              <el-option label="周末" value="1"></el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px">
            <span>自定义时间:</span>
            <el-time-select
              placeholder="起始时间"
              v-model="ruleForm.startTime"
              :picker-options="{
                  start: '08:30',
                   step: '00:15',
                    end: '18:30'}">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="ruleForm.endTime"
              :picker-options="{
                start: '08:30',
                 step: '00:15',
                  end: '18:30',
              minTime: ruleForm.startTime}">
            </el-time-select>
          </div>
          <div style="margin-top: 10px">
            <span>联系电话:</span>
            <el-input v-model="ruleForm.hotline" type="number" style="width: 250px"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="预约说明" prop="instruction">
          <el-col :span="16">
            <el-input type="textarea" v-model="ruleForm.instruction"></el-input>
          </el-col>
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
          <el-col :span="16">
            <!--<el-input type="textarea" v-model="ruleForm.description"></el-input>-->
            <UE :defaultMsg=ruleForm.description :config=config ref="ue"></UE>
          </el-col>
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
    name: 'addCommod',
    data () {
      return {
        options: [],
        headH1:'',
        ruleForm: {
          product_group_id:'',
          name: '',
          virtual_price:'',
          pictures:[],
          price:'',
          stock:'',
          daytime:'',
          weight:'',
          volume:'',
          startTime: '',
          endTime: '',
          hotline:'',
          instruction:'',
          recommend: false,
          location:false,
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
            if(this.ruleForm.recommend === true){
              this.ruleForm.recommend = '1'
            }else {
              this.ruleForm.recommend = '0'
            }
            if(this.$route.params.edit === '编辑预约商品'){
              let times = []
              times.push(this.ruleForm.startTime)
              times.push(this.ruleForm.endTime)
              let databes = {
                name: this.ruleForm.name,
                product_id:this.$route.params.product_id,
                product_group_id:this.ruleForm.product_group_id,
                price:this.ruleForm.price,
                virtual_price:this.ruleForm.virtual_price,
                stock:this.ruleForm.stock,
                location:Array.from(this.ruleForm.selected),
                description:this.ruleForm.description,
                pictures:Array.from(this.ruleForm.pictures),
                weight:this.ruleForm.weight,
                volume:this.ruleForm.volume,
                daytime:this.ruleForm.daytime,
                saletime:times,
                hotline:this.ruleForm.hotline,
                recommend:this.ruleForm.recommend,
                instruction:this.ruleForm.instruction
              }
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
             // console.log(databes)
            }else {
              let times = []
              times.push(this.ruleForm.startTime)
              times.push(this.ruleForm.endTime)
              let databes = {
                name: this.ruleForm.name,
                product_group_id:this.ruleForm.product_group_id,
                price:this.ruleForm.price,
                virtual_price:this.ruleForm.virtual_price,
                stock:this.ruleForm.stock,
                location:Array.from(this.ruleForm.selected),
                description:this.ruleForm.description,
                pictures:Array.from(this.ruleForm.pictures),
                weight:this.ruleForm.weight,
                volume:this.ruleForm.volume,
                daytime:this.ruleForm.daytime,
                saletime:times,
                hotline:this.ruleForm.hotline,
                recommend:this.ruleForm.recommend,
                instruction:this.ruleForm.instruction
              }
              console.log(databes)
              this.$axios.post("/product/addProduct",databes).then((response) =>{
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
              //console.log(databes)
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
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      limitImg(files,fileList){
        console.log(files, fileList);
      },
      returnbtn(){
        this.$router.go(-1)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getDataImg(response,file, fileList){
        console.log(response)
        this.ruleForm.pictures.push(response)
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
    computed:{

    },
    components: {
      UE
    },
    created(){
      this.$axios.post('/product_group/getProductGroupList')
        .then((response)=>{
          //console.log(response)
          this.options = response.data.data
        })
      if(this.$route.params.edit === '编辑预约商品'){
        this.headH1 = '编辑外卖商品'
        this.$axios.post('/product/getProductDetail',{'product_id':this.$route.params.product_id})
          .then((response)=>{
            console.log(response)
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
      }else {
        this.headH1 = '添加外卖商品'
      }
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
