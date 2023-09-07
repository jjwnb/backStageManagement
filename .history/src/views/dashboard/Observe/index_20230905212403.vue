<template>
  <div>
    <el-card>
      <Search></Search>
      <Category></Category>
    </el-card>
  </div>
</template>

<script>
import Search from "./Search";
import Category from "./Category";
export default {
  comments: {
    Search,
    Category,
  },
};
</script>

<style></style>
