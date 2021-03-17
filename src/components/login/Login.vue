<template>
  <div class="login">
    <div class="login_box">
      <login-top/>
      <login-form/>
    </div>
  </div>
</template>

<script>
import LoginTop from './child/LoginTop'
import LoginForm from './child/LoginForm'

export default {
  components: {
    LoginTop,
    LoginForm
  }
}
</script>

<style lang='scss' scoped>
  .login {
    background-color: #2b4b6b;
    height: 100%;
    .login_box {
      position: absolute;
      width: 450px;
      height: 300px;
      background-color: #fff;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>