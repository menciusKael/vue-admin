<template>
  <div class="article">
    <header>
      <h3>文章管理</h3>
      <div class="head-left">
       <!-- <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input23"
          style="width: 360px"
        >
          <template slot="prepend">搜索</template>
        </el-input>-->
      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary" @click="addarticle"><i class="el-icon-plus"></i> 新增文章</button>
        <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="article-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
        >
        </el-table-column>
        <el-table-column prop="picture" label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.picture" alt="" width="60"height="60">
          </template>
        </el-table-column>
        <el-table-column prop="keywords" label="关键词">

        </el-table-column>
        <el-table-column label="时间" sortable prop="create_date">

        </el-table-column>
        <el-table-column
          prop="article_group"
          label="分类"
          sortable>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        input23: '',
        tableData: [],
        multipleSelection:[]
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.$router.push({name:'newArticletxt',query:{data:row.article_id,edit:'编辑文章'}})
      },
      handleDelete(index, row) {
        this.tableData.splice(index,1);
        //console.log(row.article_id)
        this.$axios.post('/article/deleteArticle',{'article_id':row.article_id}).then((response) =>{
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
      allDelete(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.article_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        //console.log(Array.isArray(arr_id))
        this.$axios({
          url:'/article/deleteArticleInBatch',
          method:'post',
          data:{
            'article_id_array':arr_id
          }
        }).then((response)=>{
          if(response.data.status === 1){
            this.$axios.post('/article/getArticleList').then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                console.log(response.data.data)
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
      addarticle(){
        this.$router.push({name:'addnewArticle',query:{edit:'添加文章'}})
      }
    },
    created(){
      this.$axios.post('/article/getArticleList')
        .then((response)=> {
          this.tableData = response.data.data
        })
      this.$axios.post('/page/getPageList ')
        .then((response)=> {
          //console.log(response.data.data)
          //this.options = response.data.data
          //console.log(this.options)
        })
    }
  }
</script>
<style scoped lang="scss">
  .article{
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
    .article-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
