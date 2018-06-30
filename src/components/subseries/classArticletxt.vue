<template>
  <div class="classArticletxt">
    <header>
      <h3>分类管理</h3>
      <div class="head-left">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input23"
          style="width: 360px"
        >
          <template slot="prepend">搜索</template>
        </el-input>
      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary" @click="addArticleClass"><i class="el-icon-plus"></i> 添加分类</button>
        <el-button type="danger" icon="el-icon-delete" @click="allDeleta">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="classArticletxt-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          show-overflow-tooltip>
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
              <!--<el-form-item label="选择分类">-->
                <!--<el-select v-model="form.region" placeholder="请选择">-->
                  <!--<el-option label="区域一" value="shanghai"></el-option>-->
                  <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
              <el-form-item label="分类名称">
                <el-input style="width: 218px" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="form.description"style="width: 400px;">
                </el-input>
              </el-form-item>
              <el-form-item>
                <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
                <button type="button" class="btn btn-primary" @click="submitForm('form')">立即添加</button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        headspan:'',
        isShow:false,
        tableData: [],
        input23: '',
        form:{
          name:'',
          description:'',
        }
      }
    },
    methods: {
      addArticleClass(){
        this.headspan = '添加文章分类'
        this.isShow =! this.isShow
        this.form = {}
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index,row){
        this.isShow =! this.isShow
        this.headspan = '编辑文章分类'
        this.form = row
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableData.splice(index,1);
          this.$axios.post('/article_group/deleteArticleGroup',{'article_group_id':row.article_group_id}).then((response) =>{
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      allDeleta(){
        // 点击删除全部时
        let arr = []
        //console.log(this.multipleSelection)
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.article_group_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/article_group/deleteArticleGroupInBatch',
          method:'post',
          data:{
            'article_group_id_array':arr_id
          }
        }).then((response)=>{
          //console.log(response)
          if(response.data.status === 1){
            this.$axios.post('/article_group/getArticleGroupList').then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                //console.log(response)
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
      addclassArticl(){
        this.$router.push({path:'/home/articletxt/addclassArticletxt'})
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.headspan === '添加文章分类'){
              let sendData = {
                name:this.form.name,
                description:this.form.description
              }
              //console.log(sendData)
              this.$axios.post('/article_group/addArticleGroup',sendData)
                .then((response) =>{
                  if (response.data.status === 1) {
                    this.$message({ message: response.data.message, type: 'success'});
                  } else {
                    this.$message({ message: response.data.message, type: 'error'});
                  }
                  this.$axios.post('/article_group/getArticleGroupList ')
                    .then((response) =>{
                      this.tableData = response.data.data
                    })
                })
            }else {
              let sendData = {
                article_group_id:this.form.article_group_id,
                name:this.form.name,
                description:this.form.description
              }
              this.$axios.post('/article_group/editArticleGroup',sendData)
                .then((response)=>{
                  if (response.data.status === 1) {
                    this.$message({ message: response.data.message, type: 'success'});
                  } else {
                    this.$message({ message: response.data.message, type: 'error'});
                  }
                })
            }
          }
        })
      }
    },
    created(){
      this.$axios.post('/article_group/getArticleGroupList ')
        .then((response) =>{
          this.tableData = response.data.data
        })
    }
  }
</script>
<style scoped lang="scss">
  .classArticletxt{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
      .head-left{
        margin-top: 20px;
        float: left;
        margin-left: 20px;
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .classArticletxt-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
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
      background-color: rgba(0,0,0,0);
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
        border-radius: 5px;
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
