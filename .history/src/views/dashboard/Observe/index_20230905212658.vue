<template>
  <div>
    <el-card>
      <el-row :gutter="30">
        <el-col :span="12">
            <Search></Search>
  
        </el-col>
        <el-col :span="12">
          <el-card>
            <Category></Category>
          </el-card>
        </el-col>
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
