<template>
  <div>
    <el-card style="margin: 30px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card> </el-card>
    {{category1Id}}--{{category1Id}}
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
    };
  },
  methods: {
    // 自定义事件回调
    getCategoryId(categoryId, level) {
      // 区分三级分类相应的id 以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
      }
    },
  },
};
</script>

<style></style>
