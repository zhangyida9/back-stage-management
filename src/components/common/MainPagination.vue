<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[1, 2, 5, 10]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
export default {
  props: {
    queryInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    total: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  methods: {
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.$emit('getUserList')
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.$emit('getUserList')
    }
  }
}
</script>

<style lang='scss' scoped>
 .el-pagination {
   margin-top: 15px;
 }
</style>