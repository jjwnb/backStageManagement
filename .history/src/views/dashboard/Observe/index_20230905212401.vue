<template>
  <div>
   <el-card>
    <div slot="header"></div>
    <div></div>
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
