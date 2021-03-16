<template>
  <el-form class="login_form" :model="LoginForm"> 
    <!-- 用户名 -->
    <el-form-item >
      <el-input prefix-icon="el-icon-user-solid" v-model="LoginForm.username"></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item>
      <el-input prefix-icon="el-icon-lock" v-model="LoginForm.password" type="password"></el-input>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item class="btns">
      <el-button type="primary">登录</el-button>
      <el-button type="info">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      LoginForm: {
        username: 'zs',
        password: '123'
      } 
    }
  }
}
</script>

<style lang='scss' scoped>
  .login_form {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 10px;
  }
 .btns {
   display: flex;
   justify-content: flex-end;
 }
</style>