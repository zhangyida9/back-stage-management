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
        <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
      </template>
      <!-- 表格 -->
      <template v-slot:table>
        <user-table :userList="userList"/>
      </template>
      <!-- 分页器 -->
      <template v-slot:pagination>
        <main-pagination :queryInfo="queryInfo" :total="total" @getUserList="getUserList"/>
      </template>
    </main-card>
    <!-- addUser dialog -->
     <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
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
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="addUserForm.telephone"></el-input>
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
      :visible.sync="dialogVisible"
      width="50%" @close="editDialogClosed" :dialogVisible="!dialogVisible">
      <el-form :model="editUserForm" :rules="editUserRules" ref="editUserRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="editUserForm.telephone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
     </el-dialog>
    <!-- <user-dialog/> -->
  </div> 
</template>

<script>
import BreadcrumbNav from "components/common/BreadcrumbNav"
import MainCard from "components/common/MainCard"
import MainPagination from "components/common/MainPagination"
import UserTable from "./UserTable"
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
      dialogVisible: false,
      //addUser dialog
      addUserForm: {
        username: '',
        password: '',
        email: '',
        telephone: ''
      },
      //editUser dialog
      editUserForm: {
        username: '',
        email: '',
        telephone: ''
      },
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
        telephone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的手机号码或者座机号',trigger: ['blur', 'change'] }
        ]
      },
      editUserRules: this.addUserRules,
      //添加用户
      username: '',
      password: '',

    }
  },
  components: {
    BreadcrumbNav,
    MainCard,
    UserTable,
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
    //监听添加用户对话框关闭
    addDialogClosed() {
      this.$refs.addUserRef.resetFields()
    },
    editDialogClosed() {
      this.$refs.editUserRules.resetFields()
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
          this.dialogVisible = false
          this.getUserList()
        })  
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>