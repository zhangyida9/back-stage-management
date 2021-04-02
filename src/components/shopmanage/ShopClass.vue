<template>
  <div>
    <breadcrumb-nav>
      <template v-slot:left>商品管理</template>
      <template v-slot:right>商品分类</template>
    </breadcrumb-nav>
    <main-card>
      <template v-slot:button><el-button type="primary">添加分类</el-button></template>
    <!-- 表格 -->
      <template v-slot:tree-table>
        <tree-table
          class="treeTable"
          :data="categoriesList"
          :columns="columns"
          border
          :expand-type="false"
          :selection-type="false"
          show-index
          index-text="#">
          <!-- 是否有效 -->
          <template v-slot:isok="scoped">
            <i v-if="scoped.row.cat_deleted === false" class="el-icon-success" style="color: lightgreen"></i>
            <i v-else class="el-icon-error" style="color: red"></i>
          </template>
          <!-- 排序 -->
          <template v-slot:order="scope">
            <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
          </template>
          <!-- 操作 -->
          <template v-slot:opt="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-danger" size="mini">删除</el-button>
          </template>
        </tree-table>
      <!-- 分页器 -->
      </template>
      <template v-slot:pagination>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
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
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ]
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
        this.categoriesList = res.data.result
        this.total = res.data.total
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCategoriesList()
    },
    //监听页码发生变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCategoriesList()
    }
  }
}
</script>

<style lang='scss' scoped>
 .el-pagination {
   margin-top: 15px;
 }
</style>