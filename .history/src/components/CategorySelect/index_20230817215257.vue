<template>
  <div>
    <!-- inline代表行内表单 代表一行上可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="hendler1"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id">
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in list3"
            :key="c3.id"
          ></el-option>
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
      // 收集相应的一级二级三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      // 二级分类的数据
      list2: [],
      // 三级分类的数据
      list3: [],
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
    // 一级分类的select的事件回调当一级分类的option发生变化时候获取相应二级分类的数据
    async hendler1() {
      // 解构出一级分类的id
      const { category1Id } = this.cForm;
      // 通过一级分类的id获取二级分类的数据
      let result = await this.$API.attr.reqCategory2List(category1Id);
      console.log(result);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    // 一级分类的select的事件回调当一级分类的option发生变化时候获取相应二级分类的数据
    async handler2() {
      // 解构出二级分类的id
      const { category2Id } = this.cForm;
      // 通过二级分类的id获取s级分类的数据
      let result = await this.$API.attr.reqCategory3List(category2Id);
      console.log(result);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
  },
};
</script>

<style></style>
