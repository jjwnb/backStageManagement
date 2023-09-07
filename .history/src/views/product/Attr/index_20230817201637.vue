<template>
  <div>
    <el-card style="margin: 30px 0">
      <CategorySelect></CategorySelect>
    </el-card>
    <el-card> </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  // 当组件挂载完毕应该向服务器发请求相应获取一级分类的数据
  mounted() {
    // 获取一级分类的方法
    this.getCategory1List();
  },
  methods: {
    // 获取一级分类数据的方法
 async   getCategory1List() {
 let result    await this.$API.Attr.reqCategory1List;
    
    },
  },
};
</script>

<style></style>
