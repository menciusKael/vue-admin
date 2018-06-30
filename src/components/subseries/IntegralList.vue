<template>
  <div class="IntegralList">
    <!--分类管理-->
    <div class="classManage">
      <h3>积分商品列表</h3>
      <div class="classManageBtn">
        <div class="classManageright">
          <button type="button" class="btn btn-primary" @click="addIntegral">添加商品</button>
          <el-button type="danger" @click="allDelate">批量删除 <i class="el-icon-delete"></i></el-button>
        </div>
      </div>
      <!--分类信息-->
      <div class="classManageInfo">
        <el-table
          ref="multipleTable"
          :data="userListData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="70">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            label="商品图片"
            prop="picture1"
          >
            <template slot-scope="scope"><img  :src="scope.row.picture1" alt="" width="50" height="50"></template>
          </el-table-column>
          <el-table-column
            prop="product_group"
            label="商品分类"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
          >
          </el-table-column>
          <el-table-column
            prop="exchange"
            label="抵扣金额"
          >
          </el-table-column>
          <el-table-column
            prop="point"
            label="积分"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
          >
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
      </div>
    </div>
    <!--end-->
    <!--添加积分商品-->
    <transition name="el-fade-in">
      <div class="addCommodity" v-show="isShow">
        <div class="addCommodity-main">
          <header>
            <p class="EditData-close" @click="isShow =! isShow"><span class="userEidt">编辑积分商品</span><i class="el-icon-close"></i></p>
          </header>
          <section class="content">
            <el-form ref="form" :model="form" label-width="140px" :label-position="labelPosition">
              <el-form-item label="商品图片：">
                <div style="width: 140px;height: 140px;border: 1px solid;overflow: hidden">
                  <img :src="form.picture1" alt="" style="display: block;width: 100%;height: 100%">
                </div>
              </el-form-item>
              <el-form-item label="商品价格：">
                <span>{{ form.price }}</span><i>元</i>
              </el-form-item>
              <el-form-item label="设置抵扣金额：">
                <el-input v-model="form.exchange" style="width: 100px"></el-input> 元，100积分抵扣一元
              </el-form-item>
              <el-form-item label="设置商品积分：">
                <el-input v-model="form.point" style="width: 100px"></el-input> 积分
              </el-form-item>
              <el-form-item>
                <input type="button" value="保存编辑" class="btn btn-primary" @click="submitForm('form')">
                <el-button @click="isShow =! isShow" style="margin-left: 100px">取消</el-button>
              </el-form-item>
            </el-form>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'IntegralList',
    data() {
      return {
        isShow: false,
        labelPosition:'right',
        form: {
          name:'',
          price:'',
          picture1:'',
          exchange:'',
          point:''
        },
        userListData: [],
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.isShow =! this.isShow
        this.form = row
        //console.log(index, row);
      },
      handleDelete(index, row) {
        //console.log(index, row);
        this.userListData.splice(index,1);
        this.$axios.post('/product/deleteIntegralProduct',{'product_id':row.product_id})
          .then((response)=>{
            if(response.data.status === 1){

            }else {

            }
          })
      },
      allDelate(){
        // 点击删除全部时
        let arr = []
        //console.log(this.multipleSelection)
        this.multipleSelection.forEach(selectedItem =>{
          arr.push(selectedItem.product_id)
          return arr
        })
        let arr_id = JSON.stringify(arr)
        this.$axios({
          url:'/product/deleteIntegralProductInBatch',
          method:'post',
          data:{
            'product_id_array':arr_id
          }
        }).then((response)=>{
          //console.log(response)
          if(response.data.status === 1){
            this.$axios.post('/product/getIntegralProductList').then((response) =>{
              if(response.status === 0){
                alert('获取商品列表失败！')
              }else {
                //console.log(response)
                this.userListData = response.data.data
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          let sendData = {
            product_id: this.form.product_id,
            point: this.form.point,
            exchange: this.form.exchange
          }
          if (valid) {
            this.$axios.post('/product/editIntegralProduct',sendData).then((response)=> {
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
      addIntegral(){
        this.$router.push({path:'/home/Integral/addIntegral'})
      }
    },
    created(){
      this.$axios.post('/product/getIntegralProductList').then((response)=> {
        //console.log(response.data.data)
        if(response.data.status === 1){
          this.userListData = response.data.data
        }else {

        }

        //console.log(this.userListData)
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
  .IntegralList{
    @include aspect(100%,100%);
    /*分类管理*/
    .classManage{
      @include aspect(100%,auto);
      padding-bottom: 20px;

      .classManageBtn{
        @include aspect(100%,auto);
        .classManageright{
          float: right;
          margin-right: 30px;
        }
      }
      .classManageInfo{
        @include aspect(100%,auto);
        margin-top: 20px;
      }
    }
    .addCommodity{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      @include aspect(100%,100%);
      background-color: rgba(0,0,0,.5);
      z-index: 9;
      .addCommodity-main{
        width: 60%;
        height: 700px;
        position: absolute;
        background-color: #fff;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        header{
          overflow: hidden;
          padding-left: 30px;
          margin-bottom: 20px;
          background-color: #2e6da4;
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
        .content{
          padding-left: 30px;
        }
      }
    }
  }
</style>
