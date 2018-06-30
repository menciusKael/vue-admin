<template>
  <div class="voucher">
    <header class="voucher">
      <h3>代金券列表</h3>
      <div class="voucher-btn">
        <button type="button" class="btn btn-primary" @click="addvoucher">添加代金券</button>
        <el-button type="danger">批量删除 <i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="voucher-main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width:100%"
        >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="代金券名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="代金券设置"
          prop="condition"
        >
        </el-table-column>
        <el-table-column
          label="领取时间"
          prop="time"
        >
        </el-table-column>
        <el-table-column
          label="有效期"
          prop="time"
        >
        </el-table-column>
        <el-table-column
          label="不可用时间"
          prop="time"
        >
        </el-table-column>
        <el-table-column
          label="库存"
          prop="repertory"
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
             >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              >删除</el-button>
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
          condition: '无门槛',
          equity: '会员8.5折,开卡赠送200积分',
          porpSumer: 200,
          repertory: 200,
          time: '2018-5-6 至 2018-5-5',
          state: '启用'
        }]
      }
    },
    components: {

    },
    methods: {
      addvoucher(){
        this.$router.push({path:'/home/marketing/addVoucher'})
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
  .voucher{
    @include aspect(100%,100%);
    .voucher{
      overflow: hidden;
      h3{
        clear: none;
        margin-left: 20px;
        margin-top: 30px;
      }
      .voucher-btn{
        margin-top: 30px;
        float: right;
        margin-right: 30px;
      }
    }
    .voucher-main{
      padding-top: 30px;
    }
  }
</style>
