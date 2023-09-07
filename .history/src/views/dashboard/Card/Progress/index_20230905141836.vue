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
        // 最小值与最大值
        min: 0,
        max: 100,
      },
      yAxis: {
        // 隐藏y轴
        show: false,
        // 均分
        type: "category",
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [78],
          color: "orange",
          //   柱状图宽度
          barWidth: 10,
          //   背景颜色
          backgroundStyle: "	#E6E6FA",
        },
      ],
      //   布局的调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      //   提示
      tooltip: {},
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
