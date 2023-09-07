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
  // 当组件挂载完毕
  mounted() {
    this.$API.Attr.reqCategory1List;
  },
  methods:{

  }
};
</script>

<style></style>
