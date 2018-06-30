<template>
  <div class="Commission">
    <header>
      <h3>佣金统计</h3>
      <div class="head-right">
        <button type="button" class="btn btn-primary" @click="returnbtn"> 返 回 </button>
      </div>
    </header>
    <section class="Commission-main">
      <form action="">
        <el-table
          ref="singleTable"
          :data="tableData"
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="class_a"
            label="一级佣金">
          </el-table-column>
          <el-table-column
            prop="class_b"
            label="二级佣金">
          </el-table-column>
          <el-table-column
            prop="class_c"
            label="三级佣金">
          </el-table-column>
          <el-table-column
            prop="total"
            label="佣金合计">
          </el-table-column>
          <el-table-column
            prop="withdraw"
            label="可提现佣金">
          </el-table-column>
        </el-table>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value4: "",
      options: [],
      tableData: []
    };
  },
  methods: {
    returnbtn() {
      this.$router.go(-1);
    },
    handleEdit() {},
    handleCurrentChange() {}
  },
  created() {
    this.$axios.post("/distributor/getCommissionList").then(response => {
      this.tableData = response.data.data;
    });
  }
};
</script>
<style scoped lang="scss">
.Commission {
  width: 100%;
  height: 100%;
  overflow: hidden;
  header {
    width: 100%;
    height: auto;
    padding-top: 20px;
    overflow: hidden;
    .head-left {
      margin-top: 20px;
      float: left;
      margin-left: 20px;
      .block {
        float: left;
        margin-left: 20px;
      }
    }
    .head-right {
      margin-top: 20px;
      float: right;
      margin-right: 30px;
    }
  }
  .Commission-main {
    margin-top: 20px;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
}
</style>
