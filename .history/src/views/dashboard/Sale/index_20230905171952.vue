<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <!-- 头部左侧 -->
      <el-tabs>
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div>
        <span>今日</span>
        <span>本周</span>
        <span></span></span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
}
</style>
