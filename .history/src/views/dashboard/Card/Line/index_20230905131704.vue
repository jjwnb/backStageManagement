<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  name: "",
  mounted() {
    // 初始化echarts实列
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
      },
      yAxis: {
        // 隐藏y轴
        show
      },
      // 系列
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 88, 9],
        },
      ],
      //   布局的调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
