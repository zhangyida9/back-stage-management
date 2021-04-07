<template>
  <div>
    <breadcrumb-nav>
      <template v-slot:left>商品管理</template>
      <template v-slot:right>商品分类</template>
    </breadcrumb-nav>
    <main-card>
      <template v-slot:button><el-button type="primary" @click="showAddCateDialog">添加分类</el-button></template>
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
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed">
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px">
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            @change="parentCateChanged"
            :props="cascaderProps"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
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
      ],
      addCateDialogVisible: false,
      addCateForm: {
        // 父级分类id
        cat_pid: 0,
        // 分类名称
        cat_name: '',
        // 分类层级 默认1级分类
        cat_level: 0,
      },
      // 验证表单规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      // 父级分类列表
      parentCateList: [],
      // 指定级联选择器 配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      // 被选中项 父级分类id
      selectedKeys: [],
      // 编辑 分类 数据对象
      editCateForm: {},
      // 编辑提示框 弹出
      editCateDialogVisible: false,
      // 编辑 表单 验证
      editCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      }
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
  },
    // 获取父级列表数据
    getParentCateList() {
      this.$http({ url: '/categories', params: { type: 2 } }).then((res) => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('请求父级分类列表失败')
        }
        this.parentCateList = res.data
      })
    },
    // 点击选择
    parentCateChanged() {
      console.log(this.selectedKeys)
      //当 有选择后 selectedKeys 有长度
      if (this.selectedKeys.length > 0) {
        // 父级分类id 赋值
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        //为当前  分类等级 赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        // 父级分类id
        this.addCateForm.cat_pid = 0
        // 当前分类等级
        this.addCateForm.cat_level = 0
      }
    },
    // 点击确定 添加
    addCate() {
      console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate((vaild) => {
        if (!vaild) return
        this.$http({
          url: '/categories',
          method: 'post',
          data: this.addCateForm,
        }).then((res) => {
          console.log(res)
          if (res.meta.status !== 201) {
            return this.$message.error('添加分类失败')
          }
          this.$message.success('添加分类成功')
          this.getCateList()
          this.addCateDialogVisible = false
        })
      })
    },
    // 监听对话框的 关闭事件
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
    // 点击编辑 按钮 弹出对话框
    showEditCateDialog(item) {
      this.editCateForm = item
      this.editCateDialogVisible = true
    },
    // 点击编辑中的确定 提交
    editCate() {
      console.log(this.editCateForm)
      this.$http({
        url: '/categories/' + this.editCateForm.cat_id,
        method: 'put',
        data: { cat_name: this.editCateForm.cat_name },
      }).then((res) => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('修改失败')
        }
        this.$message.success('修改成功')
        this.getCateList()
        this.editCateDialogVisible = false
      })
    },
    // 监听 编辑对话框关闭事件
    editCateDialogClosed() {
      this.$refs.editCateFormRef.resetFields()
    },
    removeCate(id) {
      this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http({ url: '/categories/' + id, method: 'delete' }).then(
            (res) => {
              if (res.meta.status !== 200) {
                return this.$message.error('取消失败')
              }
              this.$message.success('删除成功')
              this.getCateList()
            }
          )
        })
        .catch(() => {
          this.$message('取消删除')
        })
    }
}
</script>

<style lang='scss' scoped>
 .el-pagination {
   margin-top: 15px;
 }
</style>