<template>
  <div class="login_top">
    <img src="~assets/logo.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
  .login_top {
    position: absolute;
    left: 50%;
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }
</style>