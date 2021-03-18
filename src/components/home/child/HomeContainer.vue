<template>
  <el-container class="home_container">
    <el-header>
      <slot name="home_header"></slot>
    </el-header>
    <el-container>
      <el-aside width="200px"><slot name="home_aside"></slot></el-aside>
      <el-main><slot name="home_main"></slot></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
  .home_container {
    height: 100%;
  }
  .el-header {
    display: flex;
    background-color: #3e4f5a;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: #fff;
  }

  .el-aside {
    background-color: #353d55;
  }

  .el-main {
    background-color: #eaedf1;
  }
</style>