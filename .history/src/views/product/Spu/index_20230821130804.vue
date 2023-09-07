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
  methods:{
    getCategoryId()
  }
};
</script>

<style></style>
