<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column  label="默认图片" width="110">
        <template slot-scope="{row}">
         <img :src="" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
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
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      page: 1, //代表当前页
      limit: 10, //代表每页展示多少条数据
      records: [], //存储sku列表的数据
      total: 0, //存储分页器一个展示的数据
    };
  },
  mounted() {
    // 获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    // 获取sku列表数据
    async getSkuList() {
      // 解构默认参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      //   console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
  },
};
</script>

<style></style>
