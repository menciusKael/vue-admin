<template>
  <div class="classvideo">
    <header>
      <h3>视频分类</h3>
      <div class="head-left">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input23"
          style="width: 360px"
        >
          <template slot="prepend">搜索</template>
        </el-input>
      </div>
      <div class="head-right">
        <button type="button" class="btn btn-primary"><i class="el-icon-plus"></i> 添加分类</button>
        <el-button type="danger" icon="el-icon-delete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="classvideo-main">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
        >
        </el-table-column>
        <el-table-column prop="type" label="分类类型">

        </el-table-column>
        <el-table-column
          prop="describe"
          label="描述"
          show-overflow-tooltip>
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
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData3: [{
          name: '时代峰峻had是否会',
          type: 'dasfaod',
          describe: 'dfgdfsgdfgdsfg'
        }],
        input23: ''
      }
    }
  }
</script>
<style scoped lang="scss">
  .classvideo{
    width: 100%;
    height: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: auto;
      padding-top: 20px;
      overflow: hidden;
      .head-left{
        margin-top: 20px;
        float: left;
        margin-left: 20px;
      }
      .head-right{
        margin-top: 20px;
        float: right;
        margin-right: 30px;
      }
    }
    .classvideo-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
