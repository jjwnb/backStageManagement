<template>
  <div>
    <el-card style="margin: 30px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 20px 0"
          :disabled="!category3Id"
          @click="isShowTable = false"
        >
          添加属性</el-button
        >
        <!-- 表格:展示平台属性 -->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop " label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template v-slot:default="slotProps">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="isShowTable = false"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="属性名">
            <el-input  placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-p">添加属性值</el-button>
        <el-button type="primary"></el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 存储服务器返回的平台属性
      attrList: [],
      // 控制表格显示与隐藏
      isShowTable: false,
    };
  },
  methods: {
    // 自定义事件回调
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

        // 发请求获取平台属性
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    // 当用户确定三级分类的数据后，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
  },
};
</script>

<style></style>
