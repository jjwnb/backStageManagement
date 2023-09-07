<template>
  <el-card>
    <el-row :gutter="30">
      <el-col :span="12">
        <Search></Search>
      </el-col>
      <el-col :span="12">
        <Category></Category>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Search from "./Search";
import Category from "./Category";
export default {
  comp: {
    Search,
    Category,
  },
};
</script>

<style></style>
