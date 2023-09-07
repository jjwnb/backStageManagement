<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="width">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="width">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            icon="el-icon-caret-bottom"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-caret-top"
            size="mini"
            v-if="row.isSale == 1"
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="$message('正在开发中')"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器  @size-change="handleSizeChange"
      -->
    <el-pagination
      @current-change="getSkuList"
      @size-change="handleSizeChange"
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

    skuInfo
    };
  },
  mounted() {
    // 获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    // 获取sku列表数据
    async getSkuList(pages = 1) {
      this.page = pages;
      // 解构默认参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      //   console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //切换每页显示多少条数据的回调
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      this.getSkuList();
    },
    // 上架
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message.success("上架成功");
      }
    },
    // 下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message.success("下架成功");
      }
    },
    // 获取sku详情
    async getSkuInfo(row) {
      let result = await this.$API.sku.reqSkuById(row.id);
      console.log(result);
    },
  },
};
</script>

<style></style>
