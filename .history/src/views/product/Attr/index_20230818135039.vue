<template>
  <div>
    <el-card style="margin: 30px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card> </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      category1Id:''
      category2Id:''
      category3Id:''
    }
  },
  methods: {
    // 自定义事件回调
    getCategoryId(categoryId, level) {
      if (level == 1) {

      } else if (level == 2) {

      } else {
      }
    },
  },
};
</script>

<style></style>
