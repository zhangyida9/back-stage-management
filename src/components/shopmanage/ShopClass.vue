<template>
  <div>
    <breadcrumb-nav>
      <template v-slot:left>商品管理</template>
      <template v-slot:right>商品分类</template>
    </breadcrumb-nav>
    <main-card>
      <template v-slot:button><el-button type="primary">添加分类</el-button></template>
      <template v-slot:pagination>
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination> -->
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
      categoriesList: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 5,
    }
  },
  created() {
    this.getCategoriesList()
  },
  methods: {
    getCategoriesList() {
      this.$http({
        url: '/categories',
        params: this.queryInfo
      }).then( res => {
        console.log(res)
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.queryInfo = res.data.result
        this.total = res.data.total
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>