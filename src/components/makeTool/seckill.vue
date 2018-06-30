<template>
  <div class="Integral">
    <!--分类管理-->
    <div class="classManage">
      <h3>秒杀列表</h3>
      <div class="classManageBtn">
        <div class="classManageleft">
          <button type="button" class="btn btn-primary">全部</button>
          <el-button>衣服</el-button>
        </div>
        <div class="classManageright">
          <button type="button" class="btn btn-primary" @click="addIntegrals">添加秒杀</button>
          <el-button type="danger">批量删除 <i class="el-icon-delete"></i></el-button>
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
            prop="tradeName"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            label="商品图片"
            prop="tradeImg"
          >
            <template slot-scope="scope"><img  alt=""></template>
          </el-table-column>
          <el-table-column
            prop="tradeClassify"
            label="商品分类"
          >
          </el-table-column>
          <el-table-column
            prop="Price"
            label="秒杀价格"
          >
          </el-table-column>
          <el-table-column
            prop="seckillSumber"
            label="限购数量"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="活动时间"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="states"
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
  </div>
</template>
<script>
  export default {
    name: 'Integral',
    data() {
      return {
        labelPosition:'right',
        userListData: [{
          tradeName: '愤怒的小鸟',
          tradeImg: '../assets/images/u2447.png',
          state: '启用',
          tradeClassify: '衣服',
          Price: '200元',
          seckillSumber: 3000,
          Integral: 100,
          states: '启用',
          time: '2015-02-30 到 2018-05-06'
        }],
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addIntegrals(){
        this.$router.push({path:'/home/marketing/addSeckill'})
      }
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
  .Integral{
    @include aspect(100%,100%);
    /*分类管理*/
    .classManage{
      @include aspect(100%,auto);
      padding-bottom: 20px;
      h3{
        margin: 30px 20px;
      }
      .classManageBtn{
        @include aspect(100%,auto);
        .classManageleft{
          float: left;
          margin-left: 30px;
        }
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
          margin-top: 20px;
          overflow: hidden;
          padding-left: 30px;
          margin-bottom: 20px;
        }
        .content{
          padding-left: 30px;
        }
      }
    }
  }
</style>
