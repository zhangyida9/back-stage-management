<template>
  <el-container class="home_container">
    <el-header>
      <home-header/>
    </el-header>
    <el-container>
      <home-aside/>
      <el-main>
        <home-main/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from "./child/HomeHeader"
import HomeAside from "./child/HomeAside"
import HomeMain from "./child/HomeMain"

export default {
  components: {
    HomeHeader,
    HomeAside,
    HomeMain
  }
}
</script>

<style lang='scss' scoped>
  .home_container {
    height: 100%;
  }
  
  .el-header {
    background-color: #3e4f5a;
  }

  .el-aside {
    background-color: #353d55;
  }

  .el-main {
    background-color: #eaedf1;
  }
</style>