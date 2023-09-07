<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="magin: 10px 0"
      >添加</el-button
    >
    <!-- 表格组件 -->
    data：bg
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="prop" label="label" width="width">
      </el-table-column>
    </el-table>
    <el-button type="danger" icon="el-icon-delete">删除</el-button>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
};
</script>

<style></style>
