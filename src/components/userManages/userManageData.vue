<template>
  <div class="userManage-data">
    <h3>用户列表</h3>
    <div class="userManageData-head">
      <div class="ManageData-headLeft">

      </div>
      <div class="ManageData-headRight">
        <input type="button" class="btn btn-primary" value="批量删除" @click="allDelete">
        <input type="button" value="导出" class="btn btn-primary">
      </div>
    </div>
    <!--用户列表-->
    <div class="ManageData-content">
      <el-table
        ref="multipleTable"
        :data="userListData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
        :fit="true"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="性别">
                <span>{{ props.row.gender }}</span>
              </el-form-item>
              <el-form-item label="储值金">
                <span>{{ props.row.deposit }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <ul>
                  <li v-for="item in props.row.address">{{ item.address }}</li>
                </ul>
                <!--<span>{{ props.row.deposit }}</span>-->
              </el-form-item>
              <el-form-item label="邮编">
                <ul>
                  <li v-for="item in props.row.address">{{ item.postcode }}</li>
                </ul>
                <!--<span>{{ props.row.deposit }}</span>-->
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          label="电话"
          width="150">
          <template slot-scope="scope">{{ scope.row.tel}}</template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="points"
          label="积分"
          sortable
          width="100"
         >
        </el-table-column>
        <el-table-column
          prop="customer_group"
          label="分组"
          width="120">
        </el-table-column>
        <el-table-column
          prop="last_login_date"
          label="上次登陆时间"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80">
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
    </div>
    <!--end-->
    <transition name="el-fade-in">
      <div class="EditData" v-show="isShow">
        <div class="EditData-main">
          <header>
            <p class="EditData-close" @click="isShow =! isShow"><span class="userEidt">用户编辑</span><i class="el-icon-close"></i></p>
          </header>
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-right: 100px">
            <el-form-item label="姓名" prop="name">
              <p>{{ruleForm.name}}</p>
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <p>{{ruleForm.tel}}</p>
            </el-form-item>
            <el-form-item label="性别" prop="region">
              <p>{{ruleForm.gender}}</p>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="积分" prop="points">
              <el-col :span="6">
                <el-input v-model="ruleForm.points"type="number"></el-input>
              </el-col>
              <span style="color: red;font-size: 12px;margin-left: 10px">*修改积分影响重大，是否修改</span>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="分组" prop="customer_group">
              <el-select v-model="ruleForm.customer_group" placeholder="请选择组类">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.customer_group_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <input type="button" value="保存编辑" class="btn btn-primary" @click="submitForm('ruleForm')">
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  //import store from "../../store/store";
  import md5 from 'js-md5'
  export default {
    data () {
      return {
        isShow:false,
        userManageData: {
          isState: true
        },
        options: [],
        values: '',
        userListData: [],
        multipleSelection: [],
        ruleForm: {
          customer_group:''
        },
        userData:{
          program_id: 1
        },
        //分页
        sum:0,
        currentPage:1,
        pagesize:10
      }
    },
    methods:  {
      addUser (){

      },
      allDelete(){
        // 点击删除全部时
        let arr = []
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.customer_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$axios({
            url:'/customer/deleteCustomerInBatch',
            method:'post',
            data:{
              'customer_id_array':arr_id
            }
          }).then((response)=>{
            this.$axios.post('/customer/getCustomerList',{'program_id':1}).then((response) =>{
              //console.log(response)
              if(response.status == -1){
                alert('获取用户列表失败！')
              }else {
                this.userListData = response.data.data
                //console.log(this.userListData)
              }
            })
          })
        }).catch(() => {

        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        //console.log(row);
        this.ruleForm = row
        this.isShow =! this.isShow
      },
      handleDelete(index, row) {
        //console.log(index, row);
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.userListData.splice(index, 1);
          this.$axios.post('/customer/deleteCustomer',{'customer_id':row.customer_id})
            .then((response) =>{

            })
        }).catch(() => {

        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(this.ruleForm.customer_group)
            let pars = {
              customer_id: this.ruleForm.customer_id,
              email: this.ruleForm.email,
              group: this.ruleForm.customer_group,
              remark: this.ruleForm.remark,
              status:this.ruleForm.status,
              points: this.ruleForm.points
            }
            //console.log(pars)
             this.$axios.post('/customer/editCustomer',pars).then((response) =>{
               if (response.data.status === 1) {
                 this.$axios.post('/customer/getCustomerList',{'program_id':1}).then((response) =>{
                   //console.log(response)
                   if(response.status == -1){
                     alert('获取用户列表失败！')
                   }else {
                     this.userListData = response.data.data
                     //console.log(this.userListData)
                   }
                 })
                 this.$message({ message: response.data.message, type: 'success'});
               } else {
                 this.$message({ message: response.data.message, type: 'error'});
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
    created (){
      this.$nextTick(function () {
        this.$axios.post('/customer/getCustomerList',{'program_id':1}).then((response) =>{
          //console.log(response)
          if(response.status == -1){
            alert('获取用户列表失败！')
          }else {
            this.userListData = response.data.data
            this.sum = response.data.data.length
            //console.log(this.userListData)
          }
        })
      })
      this.$axios.post('/customer_group/getCustomerGroupList').then((response) =>{
        //console.log(response)
        this.options = response.data.data
        //console.log(this.options)
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
  /*
  去除按钮的默认样式
  */
  @mixin inpButton($width,$height,$bgcolor,$bor_ridiuo,$color){
    width: $width;
    height: $height;
    border: 0;
    background-color: $bgcolor;
    border-radius: $bor_ridiuo;
    outline: none;
    text-align: center;
    line-height: $height;
    white-space: normal;
    color: $color;
    &:hover{
      cursor: pointer;
    }
  }
    /*右边内容*/
      .userManage-data{
        @include aspect(100%,auto);
        display: block;
        h3{
          margin: 30px 20px;
        }
        .userManageData-head{
          @include aspect(100%,auto);
          .ManageData-headLeft{
            float: left;
            margin-left: 20px;
            .selectList{
              width: 150px;
              margin-left: 20px;
              option{
                text-align: center;
              }
            }
          }
          .ManageData-headRight{
            float: right;
            margin-right: 30px;
          }
        }
        .ManageData-content{
          @include aspect(100%,auto);
          margin-top: 30px;
          &:hover{
            cursor: pointer;
          }

          .demo-table-expand {
            font-size: 0;
          }
          .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
          }
          .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
            padding: 0 126px;
          }
        }
        .addressManage{
          @extend .ManageData-content;
        }
      }
    /*end*/
  /*编辑资料*/
  .EditData{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 999;
    .EditData-main{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 800px;
      height: 800px;
      /*padding-top: 20px;*/
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
      margin: auto;
      header{
        height: auto;
        width: 100%;
        overflow: hidden;
        padding-left: 30px;
        background-color: #2e6da4;
        margin-bottom: 20px;
        .EditData-close{
          overflow: hidden;
          .userEidt{
            float: left;
            font-size: 20px;
            color: #fff;
            margin-top: 15px;
          }
          i{
            float: right;
            height: 50px;
            color: #fff;
            font-size: 18px;
            line-height: 50px;
            padding-right: 30px;
            &:hover{
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
