<template>
  <div class="carouselList">
    <header>
      <h3>轮播列表</h3>
    </header>
    <section class="carousel-main">
      <el-table
        ref="singleTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column label="轮播名称" prop="name">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        tableData:[]
      }
    },
    methods:{
      handleEdit(index, row) {
        //console.log(index, row);
        this.$router.push({name:'setcarousel',query:{data:row,'slider_id':row.slider_id}})
      }
    },
    created(){
      this.$axios.post('/slider/getSliderList ')
        .then((response) => {
          if (response.data.status === 1) {
            this.tableData = response.data.data
          } else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            });
          }
          //console.log(response)
        })
    }
  }
</script>
<style scoped lang="scss">
  .carouselList{
    header {
      height: auto;
      width: 100%;
      overflow: hidden;
      padding-left: 20px;
      margin-bottom: 20px;
      h3 {
        margin-bottom: 20px;
      }
    }
  }
</style>
