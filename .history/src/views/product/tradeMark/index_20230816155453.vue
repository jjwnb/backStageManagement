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
      current-page 当前页
      total总数据条数
      page-size:每一页需要展示多少条数据
      page-sizes：设置每一页展示多少条数据
      layout--实现分页器布局
      page-count--连续的页码数 如果设置9则连续的页码数为7
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="6"
      :page-sizes="[10, 20, 50]"
      :page-size="3"
      :page-count="7"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="99"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
        // 代表的是分页器第几页
        page:1,
        // 当前页数展示数据的个数
        limi
    }
  },
  mounted() {
    
    this.getPageList() 
  },
  methods:{
    // 获取数据列表的的数据
    getPageList(){
        // 获取品牌列表的接口
        this.$API.tradMark.reqTradeMarkList()
    }
  }
};
</script>

<style></style>
