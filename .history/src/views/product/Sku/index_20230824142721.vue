<template>
  <div>
    <el-table style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110">
      </el-table-column>
      <el-table-column prop="prop" label="重量(KG)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>
    <!-- 分页器  @size-change="handleSizeChange"
      @current-change="handleCurrentChange"-->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      page: 0,
      limit: 10,
    };
  },
  mounted() {
    // 获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    // 获取sku列表数据
    getSkuList() {
     let resultawait this.$API.sku.reqSkuList(this.page, this.limit);
    },
  },
};
</script>

<style></style>
