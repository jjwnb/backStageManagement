<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥126560">
            <!-- 作用域插槽 -->
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%
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
              </span>
              &nbsp;&nbsp;
              <span>
                日同比&nbsp;&nbsp;19.16%
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
              </span>
            </template>
            <template slot="footer">
               <span></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460"></Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460"></Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%"></Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
export default {
  components: {
    Detail,
  },
};
</script>

<style></style>
