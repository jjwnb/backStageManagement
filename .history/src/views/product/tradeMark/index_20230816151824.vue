<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <!-- data：表格将来展示的数据---数组类型-->
    <!-- border--添加边框 -->
    <!--column属性 
        lable--设置标题
        width--对应列的宽度
        align---标题的对其方式
         -->
    <el-table style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>
    <!-- 分页器
    当前页，数据总数，每一页展示的条数，连续页码数
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
     -->
    <el-pagination
      style="margin-top: 20px";text
      :current-page="6"
      :page-sizes="[10, 20, 50]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="99"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
};
</script>

<style></style>
