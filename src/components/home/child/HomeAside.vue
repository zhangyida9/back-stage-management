<template>
  <el-aside :width="!iscollapse ? '200px' : '60px'">
    <div class="button_toggle" @click="toggleClick">|||</div>
    <el-menu
    background-color="#353d55"
    text-color="#fff"
    active-text-color="#409Bff"
    :collapse="iscollapse" :collapse-transition="false" 
    unique-opened router :default-active="activePath">
    <!-- 一级菜单 -->
      <el-submenu :index="item.path + '' " v-for="item in asideList" :key="item.id">
        <template slot="title">
          <i :class="iconObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="`/${itemChildren.path}`" 
        v-for="itemChildren in item.children" :key="itemChildren.id" @click="saveStatus(`/${itemChildren.path}`)">
          <i class="el-icon-menu"></i>
          <span>{{ itemChildren.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
   </el-aside>
</template>

<script>
export default {
  data() {
    return {
      asideList: [],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      iscollapse: false,
      activePath: ""
    }
  },
  created() {
    this.getAsideList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    getAsideList() {
      this.$http({
        method: 'get',
        url: '/menus'
      }).then( res=> {
        // console.log(res)
        this.asideList = res.data
        // console.log(this.asideList)
      })
    },
    toggleClick() {
      this.iscollapse = !this.iscollapse
    },
    saveStatus(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang='scss' scoped>
  .button_toggle {
    background-color: #525f86;
    color: #fff;
    text-align: center;
    line-height: 24px;
    letter-spacing: .2em;
    cursor: pointer;
  }

  .el-menu {
    border-right: none;
  }

  .iconfont {
    margin-right: 10px;
  }
</style>