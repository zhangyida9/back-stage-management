<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb-nav>
      <template v-slot:left>权限管理</template>
      <template v-slot:right>权限列表</template>
    </breadcrumb-nav>
    <!-- 表格 -->
    <main-card>
      <template v-slot:table>
        <el-table :data="rightList" style="width: 100%" stripe border>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="authName" label="权限名称"></el-table-column>
          <el-table-column prop="path" label="路径"></el-table-column>
          <el-table-column prop="level" label="权限等级">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level === '0' ">一级</el-tag>
              <el-tag type="success" v-if="scope.row.level === '1' ">二级</el-tag>
              <el-tag type="warning" v-if="scope.row.level === '2' ">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </main-card>
  </div>
</template>

<script>
import BreadcrumbNav from "components/common/BreadcrumbNav"
import MainCard from "components/common/MainCard"

export default {
  components: {
    BreadcrumbNav,
    MainCard
  },
  data() {
    return {
      rightList: []
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    getRightList() {
      this.$http({
        method: 'get',
        url: `/rights/list`
      }).then( res => {
        // console.log(res)
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.rightList = res.data
        // console.log(this.rightList)
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>