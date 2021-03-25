<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb-nav>
      <template v-slot:left>权限管理</template>
      <template v-slot:right>权限列表</template>
    </breadcrumb-nav>
    <!-- 表格 -->
    <main-card>
      <!-- 按钮 -->
      <template v-slot:button>
        <el-button type="primary" @click="rolesDialogVisible = true">添加角色</el-button>
      </template>
      <template v-slot:table>
        <el-table :data="rolesList" style="width: 100%" stripe border>
          <el-table-column type="expand"></el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
          <el-table-column label="操作" width="300px">
            <!-- <template slot-scope="scope"> -->
              <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
              <el-button type="warning" size="mini" icon="el-icon-setting">分配权限</el-button>
            <!-- </template> -->
          </el-table-column>
        </el-table>
      </template>
    </main-card>
    <!-- rolesList dialog -->
    <el-dialog
      title="添加角色"
      :visible.sync="rolesDialogVisible" 
      width="50%" @close="addRolesDialogClosed">
      <!-- form -->
      <el-form :model="rolesListForm" :rules="addRoleRules" ref="rolesListRef" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="rolesListForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="rolesListForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
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
      rolesList: [],
      rolesDialogVisible: false,
      rolesListForm: {
        roleName: '',
        roleDesc: ''
      },
      addRoleRules: {
        roleName: [],
        roleDesc: []
      }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    getRolesList() {
      this.$http({
        url: '/roles'
      }).then( res=> {
        // console.log(res)
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success("获取角色列表成功")
        this.rolesList = res.data
      })
    },
    addRoles() {
      this.$http({
        method: 'post',
        url: '/roles',
        data: this.rolesListForm
      }).then( res=> {
        console.log(res)
        if(res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success("添加角色成功")
        this.getRolesList()
        this.rolesDialogVisible = false
      })
    },
    addRolesDialogClosed() {
      this.$refs.rolesListRef.resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>