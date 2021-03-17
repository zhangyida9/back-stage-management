<template>
  <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="loginResetRef"> 
    <!-- 用户名 -->
    <el-form-item prop="username">
      <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password" show-password></el-input>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item class="btns">
      <el-button type="primary" @click="loginClick">登录</el-button>
      <el-button type="info" @click="resetClick">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 登陆验证
      loginRules: {
         username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符之间', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '密码长度在 3 到 10 个字符之间', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    // 重置按钮
    resetClick() {
      this.$refs.loginResetRef.resetFields()
    },
    // 登录验证
    loginClick() {
      this.$refs.loginResetRef.validate( valid => {
        if(!valid) return
        this.$http({
          method: "post",
          url: "/login",
          data: this.loginForm
        }).then( res => {
          // console.log(res)
          if(res.meta.status !== 200)
            return this.$message({
              showClose: true,
              message: '登录失败',
              type: 'error'
            })
            this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
            })
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          })
      })
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