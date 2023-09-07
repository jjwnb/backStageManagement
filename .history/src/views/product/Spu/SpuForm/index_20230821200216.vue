<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU的名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="model" placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
