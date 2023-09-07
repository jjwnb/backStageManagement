<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header {
  border-bottom: 1px solid #eee;
}
</style>
