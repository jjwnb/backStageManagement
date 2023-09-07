<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="magin: 10px"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <!-- data：表格将来展示的数据---数组类型-->
    <!-- border--添加边框 -->
    <!--column属性 
        lable--设置标题
        width--对应列的宽度 -->
    <el-table style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="100%"> </el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
};
</script>

<style></style>
