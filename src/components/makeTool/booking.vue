<template>
  <div class="booking">
    <header>
      <h3>拼团列表</h3>
      <div class="booking-btn-left">
        <el-button type="primary">全部</el-button>
        <el-button>未开始</el-button>
        <el-button>进行中</el-button>
        <el-button>已结束</el-button>
      </div>
      <div class="booking-btn">
        <button type="button" class="btn btn-primary" @click="addbooking">添加拼团</button>
        <el-button type="danger">批量删除 <i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="booking-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width:100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="拼团名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="拼团人数"
          prop="peopleNumber"
        >
        </el-table-column>
        <el-table-column
          label="拼团时间"
          prop="time"
          width="250"
        >
        </el-table-column>
        <el-table-column
          label="限购件数"
          prop="limitation"
        >
        </el-table-column>
        <el-table-column
          label="拼团商品数量"
          prop="number"
        >
        </el-table-column>
        <el-table-column
          label="活动状态"
          prop="activityState"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="state"
        >
        </el-table-column>
        <el-table-column
          label="操做"
        >
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
        tableData:[{
          name:'老王',
          peopleNumber: 55,
          time: '2012-05-30 到 2015-05-03',
          limitation: 200,
          number: 200,
          activityState: '未进行',
          state: '启用'
        }]
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addbooking(){
        this.$router.push({name:'addBooking'})
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
  .booking{
    @include aspect(100%,100%);
    header{
      overflow: hidden;
      h3{
        margin-top: 30px;
        margin-left: 20px;
        margin-bottom: 30px;
      }
      .booking-btn-left{
        float: left;
        margin-left: 20px;
      }
      .booking-btn{
        float: right;
        margin-right: 30px;
      }
    }
    .booking-main{
      padding-top: 30px;
    }
  }
</style>
