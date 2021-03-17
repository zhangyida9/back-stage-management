<template>
  <div>
    <el-button @click="loginExitClick">
      退出
    </el-button>
  </div>
</template>

<script>
export default {
  methods: {
    loginExitClick() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>