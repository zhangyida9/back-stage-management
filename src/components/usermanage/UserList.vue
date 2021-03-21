<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb-nav>
      <template v-slot:left>用户管理</template>
      <template v-slot:right>用户列表</template>
    </breadcrumb-nav>
    <!-- 卡片栏 -->
    <main-card>
      <!-- 搜索框 -->
      <template v-slot:search>
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </template>
      <!-- 按钮 -->
      <template v-slot:button>添加用户</template>
      <!-- 表格 -->
      <template v-slot:table>
        <user-table :userList="userList"/>
      </template>
      <!-- 分页器 -->
      <template v-slot:pagination>
        <main-pagination :queryInfo="queryInfo" :total="total" @getUserList="getUserList"/>
      </template>
    </main-card>
  </div> 
</template>

<script>
import BreadcrumbNav from "components/common/BreadcrumbNav"
import MainCard from "components/common/MainCard"
import MainPagination from "components/common/MainPagination"
import UserTable from "./UserTable"

export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  components: {
    BreadcrumbNav,
    MainCard,
    UserTable,
    MainPagination
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$http({
        method: 'get',
        url: '/users',
        params: this.queryInfo
      }).then( res=> {
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
        this.userList = res.data.users
        this.total = res.data.total
        // console.log(this.userList)
        // console.log(this.total)
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>