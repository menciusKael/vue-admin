<template>
  <div class="criticalList">
    <header>
      <h3>评论管理列表</h3>
      <div class="head-left">

      </div>
      <div class="head-right">
        <el-button type="danger" icon="el-icon-delete" @click="allDelete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="critical-main">
      <el-table
        ref="multipleTable"
        :data="tabelDate"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="评论用户" prop="name" width="120">

        </el-table-column>
        <el-table-column label="服务态度">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.service_level"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="物流服务" prop="logistics_level">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.logistics_level"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="图片评论">
          <template slot-scope="scope">
            <img :src="scope.row.picture" alt="" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column label="文字评论" prop="description">

        </el-table-column>
        <el-table-column label="日期" prop="create_date" width="120" sortable>

        </el-table-column>
        <el-table-column label="商品描述" prop="description_level">

        </el-table-column>
        <el-table-column label="操作"width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
        tabelDate: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      allDelete(){
        // 点击删除全部时
        let arr = []
       // console.log(this.multipleSelection)
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.comment_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/comment/deleteCommentInBatch',
          method:'post',
          data:{
            'comment_id_array':arr_id
          }
        }).then((response)=>{
          //console.log(response)
          if(response.data.status === 1){
            this.$axios.post('/comment/getCommentList').then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                //console.log(response)
                this.tabelDate = response.data.data
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
          this.tabelDate.splice(index,1);
          this.$axios.post('/comment/deleteComment',{'comment_id':row.comment_id}).then((response) =>{
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
      handleEdit(index,row){
        //console.log(row.comment_id)
        this.$router.push({name:'lookCritical',query:{data:row.comment_id}})
      }
    },
    created(){
      this.$axios.post('/comment/getCommentList')
        .then((response) =>{
         // console.log(response.data.data)
          this.tabelDate = response.data.data
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
  .criticalList{
    @include aspect(100%,100%);
    header{
      height: auto;
      width: 100%;
      overflow: hidden;
      padding-left: 20px;
      margin-bottom: 20px;
      h3{
        margin-bottom: 20px;
      }
      .head-left{
        float: left;
      }
      .head-right{
        float: right;
        margin-right: 30px;
      }
    }
    .critical-main{
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
