<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU的名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            v-for="item in tradeMarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU的描述"
          v-model="spu.description"
        ></el-input>
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
      // 初始化的时候是一个空对象 ，在修改spu的时候会向服务器发请求返回spu的信息(对象)，在修改的时候可以利用服务器返回的对象收集最新的数据，提交给服务器进行修改
      //   spu添加，添加spu的时候并没有向服务器发请求数据收集到spu对象，收集对象有哪些字段看文档
      spu: {
        // 三级分类的id
        category3Id: 0,
        // 描述
        description: "",
        // 品牌下拉框的id
        tmId: 0,
        // spu的名称
        spuName: "string",
        // 新增spu图片的信息
        spuImageList: [
          {
            // id: 0,
            // imgName: "string",
            // imgUrl: "string",
            // spuId: 0,
          },
        ],
        // 平台属性与属性值的收集
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "string",
          //         saleAttrName: "string",
          //         saleAttrValueName: "string",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
      }, //存储sup信息属性
      tradeMarkList: [], //存储的是品牌信息
      spuImageList: [], //存储spu图片
      saleAttrList: [], //存储平台销售属性
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
        // 在修改spu的时候是需要向服务器发请求的，把服务器返回的数据赋值给spu属性
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
        this.spuImageList = spuImageResult.data;
      }
      // 获取整个平台的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
  },
};
</script>

<style></style>
