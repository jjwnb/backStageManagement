<template>
  <div>
    <!-- inline代表行内表单 代表一行上可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" value="">
          <el-option
            :label="ce"
            value="shanghai"
            v-for="c1 in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" value="">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" value="">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //一级分类的数据
      list1: [],
      // 二级分类的数据
      list2: [],
    };
  },
  name: "CategorySelect",
  // 当组件挂载完毕应该向服务器发请求相应获取一级分类的数据
  mounted() {
    // 获取一级分类的方法
    this.getCategory1List();
  },
  methods: {
    // 获取一级分类数据的方法
    async getCategory1List() {
      // 获取一级分类的请求不需要带参数
      let result = await this.$API.attr.reqCategory1List();
      // console.log(result);
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
  },
};
</script>

<style></style>
