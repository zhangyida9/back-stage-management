<template>
    <home-container>
      <!-- <home-header/> -->
       <template v-slot:home_header>
      <span>后台管理系统</span>
      <!-- <el-button @click="loginExitClick">退出</el-button> -->
    </template>

    <template v-slot:home_aside>
      aside
    </template>

    <template v-slot:home_main>
      main
    </template>
      <!-- <home-aside/> -->
      <!-- <home-main/> -->
    </home-container>

</template>

<script>
// import HomeHeader from "./child/HomeHeader"
// import HomeAside from "./child/HomeAside"
// import HomeMain from "./child/HomeMain"
import HomeContainer from "./child/HomeContainer"

export default {
  components: {
    // HomeHeader,
    // HomeAside,
    // HomeMain,
    HomeContainer
  }
}
</script>

<style lang='scss' scoped>

</style>