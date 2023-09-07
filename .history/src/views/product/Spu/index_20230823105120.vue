<template>
  <div>
    <el-card style="margin: 30px 0">
      <!-- 三级联动已经注册为全局组件 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scence != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部将来有三部分进行切换 -->
      <div v-show="scene == 0">
        <!-- 展示sup列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 15px"
          :disabled="!category3Id"
          @click="addSpu"
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
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部的实列sku列表"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              ></hint-button>
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
      <SpuForm v-show="scene == 1" @change="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      // 分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动可操作性

      page: 1, //当前页
      limit: 3, //每页展示的条数
      total: 0, //数据的条数
      records: [], //spu列表数据

      scene: 0, //0代表展示spu列表数据  1代表展示spu或者修改spu  2添加sku
    };
  },
  components: {
    SkuForm,
    SpuForm,
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
    // 添加spu按钮回调
    addSpu() {
      this.scene = 1;
    },
    // 修改spu
    updateSpu(row) {
      this.scene = 1;
      // 通过$refs获取子组件spuform组件的方法
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件的回调（spuform）
    changeScene(scence) {
      // 切换结构(场景)
      this.scene = scence;
    },
  },
};
</script>

<style></style>
