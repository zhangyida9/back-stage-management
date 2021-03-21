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
        <el-table :data="userList" style="width: 100%" stripe border>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱地址"></el-table-column>
          <el-table-column prop="mobile" label="电话号码"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" @change="userStatusChange(scope.row)"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <!-- <template slot-scope="scope"> -->
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
            <!-- </template> -->
          </el-table-column>
        </el-table>
      </template>
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
    },
    userStatusChange(userStatus) {
      // console.log(userStatus)
      this.$http({
        method: 'put',
        url: `users/${userStatus.id}/state/${userStatus.mg_state}`
      }).then( res=> {
        // console.log(res)
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>