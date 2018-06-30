<template>
  <div class="petCard">
    <header>
      <h3>储值卡列表</h3>
      <div class="petCard-btn">
        <button type="button" class="btn btn-primary" @click="setStoredCards">设置储值卡</button>
        <button type="button" class="btn btn-primary" @click="recharges">充值明细</button>
        <button type="button" class="btn btn-primary">消费明细</button>
      </div>
    </header>
    <section>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="创建时间"
          width="250">
        </el-table-column>
        <el-table-column
          prop="card"
          label="储值卡设置"
          width="350">
        </el-table-column>
        <el-table-column
          prop="remarks"
          width="400"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
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
        tableData: [{
          date: '2016-05-02',
          card: '按区间赠送：每充值100元，赠送100元',
          remarks: '上海市普陀区金沙江路 1518 弄dfhdsfh山东公布的风格都是噶第三个'
        }]
      }
    },
    components: {

    },
    methods:{
      setStoredCards(){
        this.$router.push({path:'/home/marketing/setStoredCard'})
      },
      recharges(){
        this.$router.push({path:'/home/marketing/recharge'})
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
  .petCard{
    @include aspect(100%,100%);
    header{
      overflow: hidden;
      margin-bottom: 20px;
      h3{
        clear: none;
        margin-top: 30px;
        margin-left: 20px;
      }
      .petCard-btn{
        float: right;
        margin-right: 30px;
      }
    }
  }
</style>
