<template>
  <div>
    <el-card style="margin: 30px 0">
      <!-- 三级联动已经注册为全局组件 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
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
            <template slot-scope="{ row }">
              <!-- 将来这里的按钮用封装的hintbutton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
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
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
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
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
    >
      <!-- table展示sku列表   -->
      <el-table :data="skuList" style="width: 100%" border>
        <el-table-column prop="skuList.skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="skuList.price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="skuList.weight" label="重量" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="默认图片" width="width">
          img
        </el-table-column>
      </el-table>
    </el-dialog>
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

      // 控制sku列表显示与隐藏
      dialogTableVisible: false,
      //
      spu: {},
      skuList: [], //存储sku列表的数据
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
      // 通知子组件发请求--两个 品牌 销售属性
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改spu
    updateSpu(row) {
      this.scene = 1;
      // 通过$refs获取子组件spuform组件的方法
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件的回调（spuform）
    changeScene({ scene, flag }) {
      // 切换结构(场景)
      this.scene = scene;
      // flag是为了区分保存按钮是添加还是修改
      if (flag == "修改") {
        // 子组件通知父组件切换场景，需要再次获取sup列表的数据进行展示
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // 删除spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message.success("删除成功");
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku
    addSku(row) {
      // 切换场景为2 【sku】
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求----三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // skuform通知父组件切换为场景0的回调
    changeScenes(scene) {
      this.scene = scene;
    },
    // 查看sku按钮的回调
    async handler(spu) {
      // 当点击时，dialogFormVisible为真
      this.dialogTableVisible = true;
      // 保存row到sku
      this.spu = spu;
      // 获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      // console.log(result);
      if (result.code == 200) {
        this.skuList = result.data;
      }
    },
  },
};
</script>

<style></style>
