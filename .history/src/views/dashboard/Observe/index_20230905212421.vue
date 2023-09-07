<template>
  <div>
    <el-card>
     <el-row :gutter="10">
        <el-col :span="6"></el-col>
     </el-row>
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
