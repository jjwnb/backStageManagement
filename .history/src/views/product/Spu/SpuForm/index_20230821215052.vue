<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU的名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" value="">
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
        <el-input type="textarea" rows="4" placeholder="SPU的描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          placeholder="还有3未选择"
          value=""
          style="margin-right: 10px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus"> 添加销售属性</el-button>
        <el-table :data="data" style="width: 100%; margin-top: 15x" border>
          <el-table-column type="index" label="label" width="80" align="center">
          </el-table-column>
          <el-table-column prop="" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="" label="属性值列表" width="width">
          </el-table-column>
          <el-table-column prop="" label="操作" width="width">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('change', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {}, //存储sup信息属性
      tradeMarkList: [], //存储的是匹配信息
      spuImageList: [], //存储spu图片

    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 初始化spuform的数据
    async initSpuData(spu) {
      // 获取spu信息的数据
      let SpuResult = await this.$API.spu.reqSpu(spu.id);
      if (SpuResult.code == 200) {
        this.spu = SpuResult.data;
      }
      // 获取匹配信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取spu图片
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        this.spuImageList=sp
      }
      // 获取整个平台的销售属性
      this.$API.spu.reqBaseSaleAttrList();
    },
  },
};
</script>

<style></style>
