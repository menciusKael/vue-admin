<template>
  <div class="discount">
    <header>
      <h3>折扣券列表</h3>
      <div class="discount-btn">
        <button type="button" class="btn btn-primary" @click="adddiscount">添加折扣券</button>
        <el-button type="danger">批量删除 <i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="discount-main">
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
          label="折扣券名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="折扣券设置"
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
      adddiscount(){
        this.$router.push({path:'/home/marketing/addDiscount'})
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
  .discount{
    @include aspect(100%,100%);
    header{
      overflow: hidden;
      h3{
        clear: none;
        margin-top: 30px;
        margin-left: 20px;
      }
      .discount-btn{
        margin-top: 30px;
        float: right;
        margin-right: 30px;
      }
    }
    .discount-main{
      padding-top: 30px;
    }
  }
</style>
