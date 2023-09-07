<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  mounted() {
    // 初始化echarts实列
    echarts.init(this.$refs.charts,dar)
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
