<template>
  <el-card>
    <div slot="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio1">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div></div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Category",
};
</script>

<style scoped>
.category-header {
    tex
}
</style>
