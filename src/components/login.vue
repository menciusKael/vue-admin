<template>
  <div class="loginComponent">
    <div class="loginMain">
      <p>账号登录</p>
      <form action="" class="loginFrom">
        <div class="formInput">
          <i class="mobile"></i>
          <input type="text" placeholder="手机号码" maxlength="11" name="mob" id="mob" v-model="mobile">
        </div>
        <div class="formInput">
          <i class="password"></i>
          <input type="password" placeholder="密码" name="passwd" id="passwd" v-model="psw">
        </div>
        <div class="loginMsg">
          <router-link to="">没有账号？注册</router-link>
            <router-link to="">忘记密码？</router-link>
        </div>
        <div class="isErro"></div>
        <a href="javascript:;" class="loginSub" @click="logins">登录</a>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return{
        mobile:'18008040045',
        psw:'123456'
      }
    },
    methods:{
      logins(){
        if(this.mobile ==='123' && this.psw ==='123'){
          //alert(1)
          this.$router.push('/home/dataStat/dataStates')
        }
      }
    },
    created(){
      /*this.$axios.post('/home/login/login_chech',{'mobile':this.mobile,'password':this.psw}).then((res)=>{
        console.log(res)
      })*/
    }
  }
</script>
<style scoped lang="scss">

</style>
