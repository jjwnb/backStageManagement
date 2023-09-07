<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 头部左侧 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <el-date-picker
        v-mo
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
        <el-col :span="6" class="right">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="rindex">1</span><span>pubg</span
              ><span class="rvalue">111.231</span>
            </li>
            <li>
              <span class="rindex">2</span><span>lol</span
              ><span class="rvalue">231.441</span>
            </li>
            <li>
              <span class="rindex">3</span><span>apex</span
              ><span class="rvalue">142.123</span>
            </li>
            <li>
              <span class="r">4</span><span>overwatch</span
              ><span class="rvalue">167.252</span>
            </li>
            <li>
              <span class="r">5</span><span>刺客信条</span
              ><span class="rvalue">95.331</span>
            </li>
            <li>
              <span class="r">6</span><span>看门狗</span
              ><span class="rvalue">172.988</span>
            </li>
            <li>
              <span class="r">7</span><span>GTA5</span
              ><span class="rvalue">443.502</span>
            </li>
          </ul>
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
      activeName: "sale",
      mycharts: null,
    };
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
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
  computed: {
    // 计算属性--标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  //   监听属性值的变化
  watch: {
    title() {
      // 重新修改图表的配置数据
      //  图表配置的数据可以再次修改，如果有新的数值就用新的数值，没有新的数值还是用以前的数值
      this.mycharts.setOption({
        title: {
          text: this.title,
        },
      });
    },
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
  width: 250px;
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
</style>
