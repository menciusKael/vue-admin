<template>
  <div class="setSort">
    <header style="margin-bottom: 50px">
      <h3>排序设置</h3>
      <button type="button" class="btn btn-primary" @click="returnbtn" style="float: right;margin-right: 100px"> 返 回 </button>
    </header>
    <section class="setSort-Main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="排序设置">
          <el-switch v-model="form.status">
          </el-switch>
        </el-form-item>
        <el-form-item label="排序名称" v-if="form.status">
          <el-checkbox-group
            v-model="form.checkedCities1"
            :min="1"
            :max="4">
            <el-checkbox v-for="city in form.cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin-top: 300px;">
          <el-form-item>
            <button type="button" class="btn btn-primary" @click="onSubmit">保存</button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        form:{
          status:false,
          checkedCities1:[],
          cities:['综合','销量','时间','积分']
        },
      }
    },
    methods:{
      onSubmit(){
        this.$axios.post('/product/editOrderSetting',{'order_setting':this.form.checkedCities1})
          .then((response) =>{
            if(response.data.status===1){
              this.$message({
                showClose: true,
                message: response.data.message,
                type: 'success'
              });
            }else {

            }
          })
      },
      returnbtn(){
        this.$router.go(-1)
      }
    },
    created(){
      this.$axios.post('/product/getOrderSetting').then((response)=>{
        this.form.checkedCities1 = response.data.data
        if(response.data.data.length > 0){
          this.form.status = true
        }else {
          this.form.status = false
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .setStor{
    header{
      overflow: hidden;
      margin-bottom: 50px;
    }
    .setSort-Main{
      margin-top: 50px;
    }
  }
</style>
