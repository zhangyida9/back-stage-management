<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="9">
        <slot name="search"/>
      </el-col>
      <el-col :span="4">
        <el-button type="primary"><slot name="button"/></el-button>
      </el-col>    
    </el-row>
    <slot name="table"/>
    <slot name="pagination"/>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
 .el-row {
   margin-bottom: 20px;
 }

</style>