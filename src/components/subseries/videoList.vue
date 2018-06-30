<template>
  <div class="videoList">
    <header>
      <h3>视频列表</h3>
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
        <el-select v-model="value4" clearable placeholder="请选择分类" style="width: 160px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button type="button" class="btn btn-primary"><i class="el-icon-plus"></i> 添加视频</button>
        <el-button type="danger" icon="el-icon-delete">批量删除<i class="el-icon-delete"></i></el-button>
      </div>
    </header>
    <section class="videoList-main">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="视频名称"
        >
        </el-table-column>
        <el-table-column prop="class" label="分类">

        </el-table-column>
        <el-table-column label="预览图">
          <template slot-scope="scope"> {{scope.row.scope}}</template>
        </el-table-column>
        <el-table-column label="播放量" prop="playnumber">

        </el-table-column>
        <el-table-column label="视频类型" prop="videotype">

        </el-table-column>
        <el-table-column label="销量" prop="number">

        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
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
    data() {
      return {
        input23: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value4: '',
        tableData3: [{
          name: 'sadVB高大上',
          class: '美味',
          playnumber: '33',
          videotype: '美味',
          number: '33',
          state: '启用'
        }]
      }
    }
  }
</script>
<style scoped lang="scss">
  .videoList{
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
    .videoList-main{
      margin-top: 20px;
      width: 100%;
      height: auto;
      overflow: hidden;
    }
  }
</style>
