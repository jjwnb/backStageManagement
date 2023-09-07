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
        prop:对应内容的字段名
         -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column label="序号" width="80px" align="center" type="index">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="warning" icon="el-icon-edit" size="mini"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
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
      注意：饿了么ui  table展示数据是以一列一列进行展示数据
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      :page-count="7"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="handleCurrentChange"
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
      page: 1,
      // 当前页数展示数据的个数
      limit: 3,
      // 接收服务器返回的数据
      total: 0,
      // 列表展示的数据
      list: [],
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取数据列表的的数据
    async getPageList() {
      // 解构data数据
      const { page, limit } = this;
      // 获取品牌列表的接口服务器发请求的时候服务器需要带参数
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },

    handleCurrentChange(page) {
        // 修改参数
        this.page=page
        this.getPageList
      console.log(page);
    },
  },
};
</script>

<style></style>
