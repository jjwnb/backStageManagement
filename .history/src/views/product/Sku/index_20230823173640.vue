<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU的名称"> 海绵宝宝 </el-form-item>
      <el-form-item label="SKU的名称">
        <el-input v-model="model" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="model" placeholder="SKU名称"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "Sku",
};
</script>

<style></style>
