<template>
  <div class="addCommod">
    <header>
      <h3>添加到店商品</h3>
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
            list-type="picture-card"
            name="image"
            :on-preview="handlePictureCardPreview"
            :on-success="getDataImg"
            :on-change="onFilesAdded"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">最多只能上传5张，且不超过2M</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品规格" prop="guige">
          <el-tag
            :key="tag.name"
            v-for="tag in editableTabs"
            closable
            :disable-transitions="false"
            @close="handleClose(tag.name)">
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
          >
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <div :class='"speci"+index' :index="index">
                <ul>
                  <li v-for="(items, index) in item.chlis" @click="checkoLi">{{ items.val }}</li>
                </ul>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisibles"
                  v-model="ruleForm.inputValue"
                  ref="saveTagInputs"
                  size="small"
                  color="#ebf5ff"
                  @keyup.enter.native="handleInputConfirms"
                  @blur="handleInputConfirms"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInputs">+ 自定义</el-button>
              </div>

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
        <el-form-item label="出售时间" prop="saledate">
          <el-switch v-model="ruleForm.saledate"></el-switch>
          <div class="block" v-if="ruleForm.saledate">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="ruleForm.saletime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import parson from "../../assets/js/parson";
import { quillRedefine } from "vue-quill-editor-upload";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "addCommod",
  data() {
    return {
      options: [],
      ruleForm: {
        product_group_id: "",
        name: "",
        pictures: [],
        guige: "",
        virtual_price: "",
        price: "",
        stock: "",
        saledate: false,
        saletime: "",
        location: false,
        recommend: false,
        description: "",
        selected: [],
        inputValue: ""
      },
      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      //规格
      editableTabs: [
        {
          title: "尺码",
          name: "1",
          chlis: [
            { val: "11" },
            { val: "12" },
            { val: "13" },
            { val: "14" },
            { val: "15" }
          ]
        },
        {
          title: "颜色",
          name: "2",
          chlis: [
            { val: "白色" },
            { val: "紫色" },
            { val: "蓝色" },
            { val: "橙色" },
            { val: "酒红色" }
          ]
        },
        {
          title: "口味",
          name: "3",
          chlis: [
            { val: "微辣" },
            { val: "点点辣" },
            { val: "超级辣" },
            { val: "特辣" },
            { val: "很辣" }
          ]
        },
        {
          title: "尺寸",
          name: "4",
          chlis: [
            { val: "12" },
            { val: "25" },
            { val: "66" },
            { val: "78" },
            { val: "99" }
          ]
        },
        {
          title: "型号",
          name: "5",
          chlis: [
            { val: "大号" },
            { val: "小号" },
            { val: "中号" },
            { val: "特大" }
          ]
        },
        {
          title: "重量",
          name: "6",
          chlis: [{ val: "25kg" }]
        }
      ],
      inputVisible: false,
      tabIndex: 6,
      editableTabsValue: "2",
      inputVisibles: false,
      //富文本
      serverUrl: "http://mps.essocial.com.cn/backend/common/upload_description",
      editorOption: {}
    };
  },
  methods: {
    returnbtn() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let dates = "";
          if (this.ruleForm.saletime === "") {
            dates = [];
          } else {
            let getDate = new parson.getData();
            let rise = getDate.formatDate(this.ruleForm.saletime[0]);
            let over = getDate.formatDate(this.ruleForm.saletime[1]);
            dates = [];
            dates.push(rise);
            dates.push(over);
          }
          let databes = {
            name: this.ruleForm.name,
            product_group_id: this.ruleForm.product_group_id,
            price: this.ruleForm.price,
            virtual_price: this.ruleForm.virtual_price,
            stock: this.ruleForm.stock,
            location: Array.from(this.ruleForm.selected),
            description: this.ruleForm.description,
            pictures: Array.from(this.ruleForm.pictures),
            saletime: dates,
            recommend: this.ruleForm.recommend
          };
          console.log(databes);
          /* this.$axios.post("/product/addProduct",databes).then((response) =>{
                if(response.data.status===1){
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
              })*/
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除上传图片
    handleRemove(file, fileList) {
      this.ruleForm.pictures.splice(this.ruleForm.pictures.indexOf(file), 1);
    },
    //查看上传图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //设置限制长度
    onFilesAdded(file, fileList) {
      if (fileList.length > 5) {
        fileList.splice(fileList.indexOf(file), 1);
      }
    },
    //获取上传图片信息
    getDataImg(response, file, fileList) {
      this.ruleForm.pictures.push(response);
      return this.ruleForm.pictures;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //规格方法
    handleInputConfirm() {
      let inputValue = this.ruleForm.inputValue;
      if (inputValue === "") {
        return false;
      } else {
        this.inputVisible = false;
        let newTabName = ++this.tabIndex + "";
        console.log(newTabName);
        this.editableTabs.push({
          title: this.ruleForm.inputValue,
          name: newTabName,
          chlis: []
        });
      }
      this.ruleForm.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showInputs() {
      this.inputVisibles = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInputs.$refs.input.focus();
      });
    },
    handleInputConfirms() {
      let inputValue = this.ruleForm.inputValue;
      if (inputValue === "") {
        return false;
      } else {
        this.inputVisibles = false;
        /*//let newTabName = ++this.tabIndex + '';
          //console.log(newTabName)
          this.editableTabs.push({
            title: this.ruleForm.inputValue,
            name: newTabName,
            chlis:[]
          });*/
      }
      this.ruleForm.inputValue = "";
    },
    handleClose(tag, targetName) {
      this.editableTabs.splice(this.editableTabs.indexOf(tag), 1);
      //let tabs = this.editableTabs;
      // let activeName = this.editableTabsValue;

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
    checkoLi(e) {
      let navs = e.target.parentElement.childNodes;
      for (let i = 0; i < navs.length; i++) {
        navs[i].className = "";
        e.target.className = "bgcolos";
      }
    }
  },
  computed: {},
  components: {
    quillEditor,
    quillRedefine
  },
  created() {
    this.editorOption = quillRedefine({
      // 图片上传的设置
      uploadConfig: {
        action: this.serverUrl, // 必填参数 图片上传地址
        methods: "POST",
        res: respnse => {
          //console.log(respnse)
          return respnse.result.img;
        },
        name: "image", // 图片上传参数名
        success: () => {}
      }
    });
    this.$axios.post("/product_group/getProductGroupList").then(response => {
      this.options = response.data.data;
    });
  }
};
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
@mixin aspect($width, $height) {
  width: $width;
  height: $height;
  overflow: hidden;
}
.addCommod {
  @include aspect(100%, 100%);
  header {
    height: 60px;
    width: 100%;
    overflow: hidden;
    h3 {
      float: left;
    }
    .btn-primary {
      margin-top: 10px;
      margin-right: 300px;
      float: right;
    }
  }
  .addCommod-main {
    width: 60%;
    .speci0 {
      width: 100%;
      height: auto;
      overflow: hidden;
      ul {
        @extend .speci0;
        li {
          width: 10%;
          height: 25px;
          border-radius: 5px;
          border: 1px solid;
          text-align: center;
          line-height: 25px;
          float: left;
          margin-left: 10px;
          cursor: pointer;
          margin-bottom: 10px;
        }
        li:nth-child(1) {
          margin-left: 0;
        }
      }
    }
    .speci1 {
      @extend .speci0;
    }
    .speci2 {
      @extend .speci0;
    }
    .speci3 {
      @extend .speci0;
    }
    .speci4 {
      @extend .speci0;
    }
    .speci5 {
      @extend .speci0;
    }
    .bgcolos {
      background-color: #337ab7;
      color: #fff;
    }
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
