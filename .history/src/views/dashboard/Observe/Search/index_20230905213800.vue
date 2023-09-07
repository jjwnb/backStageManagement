<template>
  <el-card>
    <div slot="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <i class="el-icon-more"></i>
      </div>
    </div>
    <div>
        
    </div>
  </el-card>
</template>

<script>
import line from "./lineCharts";
export default {
  name: "earch",
  components: {
    line,
  },
};
</script>

<style>
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>
