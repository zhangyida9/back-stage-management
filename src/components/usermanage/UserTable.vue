<template>
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
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserClick"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
          <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
        </el-tooltip>
      <!-- </template> -->
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    userList: {
      type: Array,
      default() {
        return []
      }
    },
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
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
    editUserClick() {
      this.dialogVisible
    }
  }
}
</script>

<style lang='scss' scoped>

</style>