<template>
  <div class="distributionList">
    <header>
      <h3>微分销列表</h3>
      <div class="head-left">
        <el-select
          v-model="value"
          clearable
          placeholder="请选择"
          @change="changs"
          style="width: 160px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button type="button" class="btn btn-primary" @click="sendfal1"> 已审核</button>
        <button type="button" class="btn btn-primary" @click="sendfal2"> 待审核</button>
        <button type="button" class="btn btn-primary" @click="sendfal3"> 已驳回</button>
      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary"> 导出</button>
      </div>
    </header>
    <section class="distributionList-main">
      <form action="">
        <el-table
          ref="singleTable"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="分销商">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="children_count"
            label="下级分销店数">
          </el-table-column>
          <el-table-column
            prop="parent_distributor"
            label="上级分销商">
          </el-table-column>
          <el-table-column
            prop="create_date"
            label="申请时间">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" clearable placeholder="请选择" style="width: 160px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <button type="button" class="btn btn-primary" @click="handleEdit(scope.$index, scope.row)"> 保存</button>
            </template>
          </el-table-column>
        </el-table>
      </form>
      <div style="margin: 20px auto;">
        <el-pagination
          background
          layout="prev, pager, next"
          align="center"
          :page-sizes="[10, 20, 30, 40]"
          :pager-count="currentPage"
          :page-size="pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChanges"
          :total="sum">
        </el-pagination>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value:'',
        options:[{
          value: 1,
          label: '已审核'
        },{
          value: 2,
          label: '待审核'
      },{
          value: -1,
          label: '已驳回'
        }],
        tableData:[],
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods:{
      handleCurrentChange(){

      },
      changs(){
       // console.log(this.value)
        this.$axios.post('/distributor/getDistributorList',{'status':this.value})
          .then((response)=>{
            if(response.data.status === 1){
              this.tableData = response.data.data
              //console.log(response)
            }else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          })
      },
      handleEdit(index,row){
       // console.log(row.status)
        this.$axios.post('/distributor/editDistributor',{'remark':row.remark,"distributor_id":row.distributor_id,'status':row.status})
          .then((response)=>{
            if(response.data.status === 1){
              this.$axios.post('/distributor/getDistributorList')
                .then((response)=>{
                  this.tableData = response.data.data
                  //console.log(this.tableData)
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
      sendfal1(){
        this.$axios.post('/distributor/getDistributorList',{'status':1})
          .then((response)=>{
            if(response.data.status === 1){
              this.tableData = response.data.data
              //console.log(response)
            }else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          })
      },
      sendfal2(){
        this.$axios.post('/distributor/getDistributorList',{'status':2})
          .then((response)=>{
            if(response.data.status === 1){
              this.tableData = response.data.data
              //console.log(response)
            }else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          })
      },
      sendfal3(){
        this.$axios.post('/distributor/getDistributorList',{'status':-1})
          .then((response)=>{
            if(response.data.status === 1){
              this.tableData = response.data.data
              //console.log(response)
            }else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'error'
              });
            }
          })
      },
      //分页
      handleSizeChange(val){
        this.pagesize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChanges(val){
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    },
    created(){
      this.$axios.post('/distributor/getDistributorList')
        .then((response)=>{
          if(response.data.status === 1){
            this.tableData = response.data.data
            this.sum = response.data.data.length
            console.log(response)
          }else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
        })
    }
  }
</script>
<style scoped lang="scss">
  .distributionList{
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
    .distributionList-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
