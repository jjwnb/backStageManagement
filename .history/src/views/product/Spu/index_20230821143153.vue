<template>
  <div>
    <el-card style="margin: 30px 0">
      <!-- 三级联动已经注册为全局组件 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!show"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部将来有三部分进行切换 -->
      <div>
        <!-- 展示sup列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 15px"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" :data="records" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 将来这里的按钮用封装的hintbutton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
              ></hint-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部的实列sku列表"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
        >
        </el-pagination>
      </div>
      <div>添加|修改spu</div>
      <div>添加sku</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      // 分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动可操作性
      show: true,

      page: 1, //当前页
      limit: 3, //每页展示的条数
      total: 0, //数据的条数
      records: [], //spu列表数据

      scene:0 //0代表展示sku列表数据  1
    };
  },
  methods: {
    // 三级联动自定义事件回调  可以把子组件的id传递给父组件
    getCategoryId({ categoryId, level }) {
      // 区分三级分类相应的id 以及父组件进行存储
      // console.log(categoryId, level);
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;

        // 获取spu列表数据展示
        this.getSpuList();
      }
    },
    // 获取spu列表
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      // 携带三个参数 page limit category3ID
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 点击分页器的第几页按钮的回调
    // handleCurrentChange(page) {
    //   this.page = page;
    //   this.getSpuList();
    // },
    // 当分页的某一页展示条数发生变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
  },
};
</script>

<style></style>
