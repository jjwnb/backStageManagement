<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户用户数</span>
      <svg
        t="1693921940351"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5735"
        width="20"
        height="20"
      >
        <path
          d="M512 96c-229.76 0-416 186.24-416 416s186.24 416 416 416 416-186.24 416-416-186.24-416-416-416zM577.248 665.056c-31.392 47.136-63.328 83.456-117.056 83.456-36.672-5.984-51.744-32.256-43.808-59.04l69.12-228.928c1.696-5.6-1.12-11.584-6.24-13.408-5.088-1.792-15.072 4.832-23.712 14.304l-41.792 50.272c-1.12-8.448-0.128-22.4-0.128-28.032 31.392-47.136 82.976-84.32 117.952-84.32 33.248 3.392 48.992 29.984 43.2 59.2l-69.6 230.048c-0.928 5.184 1.824 10.464 6.528 12.128 5.12 1.792 15.872-4.832 24.544-14.304l41.76-50.24c1.12 8.448-0.768 23.232-0.768 28.864zM567.936 366.048c-26.432 0-47.872-19.264-47.872-47.616s21.44-47.584 47.872-47.584 47.872 19.264 47.872 47.584c0 28.384-21.44 47.616-47.872 47.616z"
          p-id="5736"
          fill="#13227a"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <svg
        t="1693885260060"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5356"
        width="16"
        height="16"
      >
        <path
          d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z"
          fill="#1296db"
          p-id="5357"
        ></path>
      </svg>
      <svg
        t="1693885388892"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7255"
        width="16"
        height="16"
      >
        <path
          d="M257.216 600.832l253.76 279.168 253.76-279.168c21.856-24.064 13.312-43.52-19.04-43.52h-117.408V234.752c0-32.544-26.24-58.752-58.624-58.752h-117.44A58.56 58.56 0 0 0 393.6 234.752v322.592H276.288c-32.288 0-40.896 19.456-19.072 43.488z"
          fill="#d81e06"
          p-id="7256"
        ></path>
      </svg>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "lineCharts",
  mounted() {},
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 8px;
}
.main
.main-title {
  margin-right: 30px;
}
.main-content {

}
</style>
