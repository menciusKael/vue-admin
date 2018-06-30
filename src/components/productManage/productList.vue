<template>
  <!--商品列表-->
  <div class="commodControlMain-head" >
    <h3>商品列表</h3>
    <div class="commodControlData">
      <!--<div class="ManageData-headLeft">
        <label>筛选</label>
        <el-select name="selectList" id="" class="selectList" filterable placeholder="请选择" v-model="values">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>-->
      <div class="ManageData-headRight">
        <label>版本类型 ：</label>
        <el-select
          name="selectList"
          id="" class="selectType"
          filterable
          placeholder="请选择"
          @change="changs"
          v-model="values">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button type="button" class="btn btn-primary" @click="addCommod">添加商品</button>
        <el-button type="danger" icon="el-icon-delete" @click="listDelete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </div>
    <!--商品列表-->
    <div class="commodControlList">
      <el-table
        ref="multipleTable"
        :data="productData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="250">
        </el-table-column>
        <el-table-column
          label="商品图片"
          prop="picture1"
          width="200">
          <template slot-scope="scope">
            <img :src="scope.row.picture" alt="" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column
          prop="product_group"
          label="商品分类"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="virtual_price"
          label="虚拟价格"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          sortable
          width="200">
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          width="150">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          sortable
          width="150">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="fsnumShow"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="fsnumShow"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px auto;">
        <el-pagination
          background
          layout="prev, pager, next"
          align="center"
          :pager-count="currentPage"
          :page-size="pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChanges"
          :total="sum">
        </el-pagination>
      </div>
    </div>
    <!--end-->
  </div>
  <!--end-->
</template>
<script>
  export default {
    data () {
      return {
        options:  this.$store.state.optionList,
        values: '',
        productData: [],
        multipleSelection: [],
        fsnumShow:false,
        productType:'',
        //分页
        sum:0,
        currentPage:1,
        pagesize:9
      }
    },
    methods: {
      changs(){
        this.$nextTick(function () {
          let sum = parseInt(this.values)
          this.$axios.post('/product/getProductList',{'program_type':sum}).then((response) =>{
            if(response.status == -1){
              alert('获取用户列表失败！')
            }else {
              if(response.data.current_program_type == this.values){
                this.fsnumShow = false
              }else {
                this.fsnumShow = true
              }
              this.productData = response.data.data
              //console.log(response)
            }
          })
        })
      },
      listDelete(index,row){
        // 点击删除全部时
        let arr = []
       // console.log(this.multipleSelection)
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.product_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/product/deleteProductInBatch',
          method:'post',
          data:{
            'product_id_array':arr_id
          }
        }).then((response)=>{
          //console.log(response)
          if(response.data.status === 1){
            this.$axios.post('/product/getProductList').then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                //console.log(response)
                this.productData = response.data.data
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //编辑商品
      handleEdit(index, row) {
        //console.log(index, row);
        switch(this.productType){
          case 1:
            this.$router.push({name:'editCommod',query:{product_id:row.product_id,edit:'编辑电商商品'}})
            break;
          case 2:
            this.$router.push({name:'editArrival',query:{product_id:row.product_id,edit:'编辑到店商品'}})
            break;
          case 3:
            this.$router.push({name:'addTack',query:{product_id:row.product_id,edit:'编辑外卖商品'}})
            break;
          case 4:
            this.$router.push({name:'addSubscribe',query:{product_id:row.product_id,edit:'编辑预约商品'}})
            break;
          case 5:
            this.$router.push({name:'editDistributionsys',query:{product_id:row.product_id,edit:'编辑分销商品'}})
            break;
          default:
            alert('还未添加')
        }
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
          this.productData.splice(index,1);
          this.$axios.post('/product/deleteProduct',{'product_id':row.product_id}).then((response) =>{
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
      //添加商品
      addCommod(){
        switch(this.productType){
          case 1:
            this.$router.push({path:'/home/commodControl/addCommod'})
                break;
          case 2:
            this.$router.push({path:'/home/commodControl/addArrival'})
                break;
          case 3:
            this.$router.push({path:'/home/commodControl/addTack'})
            break;
          case 4:
            this.$router.push({path:'/home/commodControl/addSubscribe'})
            break;
          case 5:
            this.$router.push({path:'/home/commodControl/distributionsystem'})
            break;
          default:
            alert('还没有商品')
        }
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
      this.$axios.post('/product/getProductList').then((response) =>{
        if(response.status == -1){
          alert('获取用户列表失败！')
        }else {
          this.productData = response.data.data
          this.productType = response.data.current_program_type
          this.sum = response.data.data.length
        }
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
  .commodControlMain-head{
    @include aspect(100%,auto);
    /*display: none;*/
    h3{
      margin: 30px 20px;
    }
    .commodControlData{
      @include aspect(100%,auto);
      padding-bottom: 20px;
      .ManageData-headLeft{
        float: left;
        margin-left: 20px;
        .selectList{
          width: 110px;
          margin-left: 20px;
          option{
            text-align: center;
          }
        }
      }
      .ManageData-headRight{
        float: right;
        padding-right: 30px;
        .selectType{
          width: 110px;
        }
      }
    }
    .commodControlList{
      @include aspect(100%,auto);
      &:hover{
        cursor: pointer;
      }
    }
  }
</style>
