<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 头部左侧 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <el-date-picker
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>门店访问量排名</h3>
            <ul>
              <li>
                <span class="rindex">1</span><span class="game">pubg</span
                ><span class="rvalue">111.231</span>
              </li>
              <li>
                <span class="rindex">2</span><span class="game">lol</span
                ><span class="rvalue">231.441</span>
              </li>
              <li>
                <span class="rindex">3</span><span class="game">apex</span
                ><span class="rvalue">142.123</span>
              </li>
              <li>
                <span style="flot:lef">4</span><span class="game">overwatch</span
                ><span class="rvalue">167.252</span>
              </li>
              <li>
                <span>5</span><span class="game">刺客信条</span
                ><span class="rvalue">95.331</span>
              </li>
              <li>
                <span>6</span><span class="game">看门狗</span
                ><span class="rvalue">172.988</span>
              </li>
              <li>
                <span>7</span><span class="game">GTA5</span
                ><span class="rvalue">443.502</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      activeName: "销售额",
    };
  },
  mounted() {
    let mycharts = echarts.init(this.$refs.charts);
    mycharts.setOption({
      title: { text: "销售额趋势" },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [45, 52, 200, 334, 190, 330, 220, 110, 98, 177, 23, 58],
          color: "#9932CC",
        },
      ],
    });
  },
};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 200px;
  margin: 0px 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: #eee;
  text-align: center;
}
.rvalue {
  float: right;
}
.game {
  margin-left: 30px;
  margin-right: 50px;
}
</style>
