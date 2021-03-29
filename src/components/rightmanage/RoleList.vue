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
        <el-button type="primary" @click="addRolesDialogVisible = true">添加角色</el-button>
      </template>
      <template v-slot:table>
        <el-table :data="rolesList" style="width: 100%" stripe border>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <!-- <pre>{{scope.row}}</pre> -->
              <!-- 一级权限 -->
              <el-row v-for="(item1, index1) in scope.row.children" :key="item1.id" 
              :class="['bdbottom','vcenter', index1 == 0 ? 'bdtop' : '']">
                <el-col :span="5">
                  <el-tag closable @close="removeRightById(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
              <!-- 二三级权限 -->
                <el-col :span="19">
                    <el-row v-for="(item2, index2) in item1.children" :key="item2.id" 
                    :class="['vcenter', index2 == 0 ? '' : 'bdtop']">
                      <!-- 二级权限 -->
                      <el-col :span="6">
                        <el-tag type="success" closable @close="removeRightById(scope.row, item1.id)">{{ item2.authName }}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <!-- 三级权限 -->
                      <el-col :span="18">
                        <el-tag type="warning" closable v-for="item3 in item2.children" 
                        :key="item3.id" @close="removeRightById(scope.row, item3.id)">{{ item3.authName }}</el-tag>
                      </el-col>
                    </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editIcoClick(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteIcoClick(scope.row.id)">删除</el-button>
              <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetRightDialong">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </main-card>
    <!-- add rolesList dialog -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRolesDialogVisible" 
      width="50%" @close="addRolesDialogClosed">
      <!-- form -->
      <el-form :model="addRolesListForm" :rules="addRoleRules" ref="addRolesListRef" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesListForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesListForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- edit rolesList dialog -->
    <el-dialog
      title="修改角色"
      :visible.sync="editRolesDialogVisible" 
      width="50%" @close="editRolesDialogClosed">
      <!-- form -->
      <el-form :model="editRolesListForm" :rules="addRoleRules" ref="editRolesListRef" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesListForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesListForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- setRight dialog -->
    <el-dialog
      title="分配角色权限"
      :visible.sync="setRightDialogVisible"
      width="50%">
      <!-- 树形控件 -->
      <el-tree :data="rightList" :props="treeProps" show-checkbox 
        default-expand-all node-key="id" :default-expanded-keys="defKeys"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
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
      addRolesDialogVisible: false,
      editRolesDialogVisible: false,
      setRightDialogVisible: false,
      addRolesListForm: {
        roleName: '',
        roleDesc: ''
      },
      editRolesListForm: {
        roleDesc: '',
        roleId: '',
        roleName: ''
      },
      addRoleRules: {
        roleName: [],
        roleDesc: []
      },
      rightList: [],
      treeProps: {
        label: 'authName',
        children: 'children',
      },
      defKeys: []
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
        data: this.addRolesListForm
      }).then( res=> {
        // console.log(res)
        if(res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success("添加角色成功")
        this.getRolesList()
        this.addRolesDialogVisible = false
      })
    },
    addRolesDialogClosed() {
      this.$refs.addRolesListRef.resetFields()
    },
    editRolesDialogClosed() {
      this.$refs.editRolesListRef.resetFields()
    },
    //根据id查询角色，把数据保存在 editRolesListForm 中
    editIcoClick(id) {
      // console.log(id)
      this.$http({
        url: `roles/${id}`
      }).then( res => {
        // console.log(res)
        if(res.meta.status !== 200) return this.$message.error("未查询到该角色")
        this.editRolesListForm.roleDesc = res.data.roleDesc
        this.editRolesListForm.roleId = res.data.roleId
        this.editRolesListForm.roleName = res.data.roleName
        this.editRolesDialogVisible = true
      })
    },
    //修改角色
    editRoles() {
      this.$http({
        method: 'put',
        url: `/roles/${this.editRolesListForm.roleId}`,
        data: this.editRolesListForm
      }).then( res=> {
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.editRolesDialogVisible = false
        this.getRolesList()
      })
    },
    deleteIcoClick(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'delete',
          url: `roles/${id}`
        }).then( res => {
          if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
          this.$message.success("删除成功")  
          this.getRolesList()
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    removeRightById(role, rightID) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: `roles/${role.id}/rights/${rightID}`
          }).then( res => {
            this.$message({
            type: 'success',
            message: '删除成功!'
            });
            role.children = res.data
          }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
    },
    showSetRightDialong() {
      this.setRightDialogVisible = true
      this.$http({
        url: 'rights/tree'
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
  .el-tag {
   margin: 7px;
 }
  .bdtop {
    border-top: 1px solid #eee;
  }
  .bdbottom {
    border-bottom: 1px solid #eee;
  }
  .vcenter {
  display: flex;
  align-items: center;
  }
</style>