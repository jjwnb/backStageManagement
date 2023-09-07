<template>
  <div>
    <el-card style="margin: 30px 0">
      <!-- 三级联动已经注册为全局组件 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!isShowTable"
      ></CategorySelect>
    </el-card>
    <el-card> </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      // f'l
      category1Id: "",
      category2Id: "",
      category3Id: "",
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

        // 发请求获取平台属性
        this.getAttrList();
      }
    },
  },
};
</script>

<style></style>
