<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU的名称"> 海绵宝宝 </el-form-item>
      <el-form-item label="SKU的名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="model"
          placeholder="规格描述"
          type="textarea"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="label">
            <el-select v-model="model" placeholder="请选择">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table :data="data" style="width: 100%" border>
          <el-table-column prop="prop" label="label" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="label" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="label" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="label" width="width">
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
