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
      <template v-slot:button>
        <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
      </template>
      <!-- 表格 -->
      <template v-slot:table>
        <!-- <user-table :userList="userList"/> -->
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
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editButtonClick(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUsersById(scope.row.id)"></el-button>
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRoleClick(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页器 -->
      <template v-slot:pagination>
        <main-pagination :queryInfo="queryInfo" :total="total" @getUserList="getUserList"/>
      </template>
    </main-card>
    <!-- addUser dialog -->
     <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClosed">
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
     </el-dialog>
     <!-- editUser dialog -->
     <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%" @close="editDialogClosed">
      <el-form :model="editUserForm" :rules="editUserRules" ref="editUserRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
     </el-dialog>
    <!-- <user-dialog/> -->
    <!-- setRole dialog -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%">
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的用角色：{{ userInfo.role_name }}</p>
        <p>分配新角色：
          <el-select v-model="selectedId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div> 
</template>

<script>
import BreadcrumbNav from "components/common/BreadcrumbNav"
import MainCard from "components/common/MainCard"
import MainPagination from "components/common/MainPagination"
// import UserTable from "./UserTable"
// import UserDialog from "./UserDialog"

export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      //addUser dialog
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      //editUser dialog
      editUserForm: {},
      //添加用户校验
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的手机号码或者座机号',trigger: ['blur', 'change'] }
        ]
      },
      //修改用户校验
      editUserRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的手机号码或者座机号',trigger: ['blur', 'change'] }
        ]
      },
      //添加用户
      username: '',
      password: '',
      setRoleDialogVisible: false,
      userInfo: {},
      roleList: [],
      selectedId: ''
    }
  },
  components: {
    BreadcrumbNav,
    MainCard,
    // UserTable,
    MainPagination,
    // UserDialog
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
    },
    //监听添加用户对话框关闭
    addDialogClosed() {
      this.$refs.addUserRef.resetFields()
    },
    editDialogClosed() {
      this.$refs.editUserRef.resetFields()
    },
    // 点击按钮添加用户
    addUser() {
      this.$refs.addUserRef.validate( value => {
        // console.log(value)
        if(!value) return
        this.$http({
          method: 'post',
          url: '/users',
          data: this.addUserForm
        }).then( res=> {
          // console.log(res)
          if(res.meta.status !== 201) return this.$message.error(res.meta.msg)
          this.$message.success(res.meta.msg)
          this.addDialogVisible = false
          this.getUserList()
        })  
      })
    },
    editButtonClick(id) {
      this.editDialogVisible = true
      // console.log(id)
      this.$http({
        method: 'get',
        url: `/users/${id}`,
      }).then( res => {
        this.editUserForm = res.data
        // console.log(this.editUserForm)
      })
    },
    //点击添加用户
    editUser() {
      this.$refs.editUserRef.validate( value => {
        if(!value) return this.$message.error("请输入正确的信息")
        this.$http({
          method: 'put',
          url: `/users/${this.editUserForm.id}`,
          data: {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile
          }
          }).then( res => {
            if(res.meta.status !== 200) return this.$message.error("更新用户信息失败")
            this.$message.success(res.meta.msg)
            this.getUserList()
            this.editDialogVisible = false
        })
      })
    },
    removeUsersById(id) {
       this.$confirm('此操作将永久删除此用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: `/users/${id}`
          }).then( res=> {
            // console.log(res)
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.getUserList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //分配角色
    setRoleClick(userInfo) {
      this.userInfo = userInfo
      //获取所有角色列表
      this.$http({
        url: '/roles'
      }).then( res=> {
        this.roleList = res.data
        // console.log(this.roleList)
      })
      this.setRoleDialogVisible = true
    },
    saveRoleInfo() {
      if(!this.selectedId) return this.$message.error("请选择要分配的角色")
      this.$http({
        method: 'put',
        url: `users/${this.userInfo.id}/role`,
        data: {rid: this.selectedId}
      }).then( res=> {
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success("分配角色成功")
        this.getUserList()
        this.setRoleDialogVisible = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  p {
    margin-bottom: 10px;
  }
</style>