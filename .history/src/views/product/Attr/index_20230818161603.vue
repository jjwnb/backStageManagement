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
        <el-form ref="form" :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 25px"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true"> 取消</el-button>
        <el-table
          style="width: 100%; margin: 25px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            prop="prop"
            label="序号"
            width="80"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin: 2px 25px">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
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
      // 收集新增属性或者修改属性使用
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，属性值可以有多个，每个属性值都是一个对象需要attrId  valueName
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //服务器也需要区分几级id
      },
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
    // 添加属性值的回调
    addAttrValue() {
      // // 向属性值的数组里面添加元素
      // attrId是相应属性的id目前而言是添加属性的操作没有相应的属性的id 所以目前带给服务器的id为undefined
      // 
      this.attrInfo.attrValueList.push({ attrId: undefined, valueName: "" });
    },
  },
};
</script>

<style></style>
