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
    this.
    this.$API.Attr.reqCategory1List;
  },
  methods:{

  }
};
</script>

<style></style>
