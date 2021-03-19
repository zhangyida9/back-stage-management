<template>
  <div class="home_header">
    <span>后台管理系统</span>
    <el-button @click="loginExitClick">退出</el-button>
  </div>
</template>

<script>
export default {
  //点击退出
  methods: {
    loginExitClick() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='scss' scoped>
 .home_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    color: #fff;
 }
</style>