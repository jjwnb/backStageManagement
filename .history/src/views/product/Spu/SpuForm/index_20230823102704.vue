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
        <!-- 上传图片：action图片上传的地址  list-type 文件列表的类型  on-preview图片预览的时候触发
         :file-list="fileList"显示多张图片[数组里面务必要有name，url属性] 
         on-preview  图片预览功能  on-remove图片删除触发 on-success文件上传成功 -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          value=""
          style="margin-right: 10px"
          v-model="attrIdAndAttrName"
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
        >
          添加销售属性</el-button
        >
        <el-table
          :data="spu.spuSaleAttrList"
          style="width: 100%; margin-top: 15x"
          border
        >
          <!-- 展示当前spu属于自己的销售属性 -->
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="" label="属性值列表" width="width">
            <!-- @close="handleClose(tag)" -->
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close=
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!--  @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
              >
              </el-input>
              <!--  @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small"
                >+添加属性值</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </template>
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
      saleAttrList: [], //存储平台销售属性（项目全部的销售属性）
      attrIdAndAttrName: [], //收集未选择的销售属性id
    };
  },
  methods: {
    // 图片删除的回调
    handleRemove(file, fileList) {
      // file代表删除的是哪张图片  fileList代表删除后剩余的图片
      console.log(file, fileList);
      // 收集照片墙图片的数据
      // 对于已有的图片{照片墙中显示的图片，有name，和url字段}，因为照片墙务必要有这两个属性
      // 对于服务器而言不需要name和url字段，将来对已有的数据提交给服务器的时候需要处理
      this.spuImageList = fileList;
    },
    // 图片预览的回调
    handlePictureCardPreview(file) {
      // 将图片的地址赋值给这个属性
      this.dialogImageUrl = file.url;
      // 对话框显示
      this.dialogVisible = true;
    },
    // 初始化spuform的数据
    async initSpuData(spu) {
      // 获取spu信息的数据
      let SpuResult = await this.$API.spu.reqSpu(spu.id);
      // console.log(SpuResult.data);
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
      console.log(spuImageResult.data);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        // 由于照片墙显示的图片数据需要数组，照片墙里面的元素需要有name url所以需要把服务器返回的数据进行加工
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // 把整理好的数据赋值给spuimagelist
        this.spuImageList = listArr;
      }
      // 获取整个平台的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      // console.log(response); 上传成功返回的图片url
      // 收集图片的信息
      this.spuImageList = fileList;
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 已经收集到需要添加的销售属性的信息
      // 把已经收集到的销售属性进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      // 向sup对象的spuSaleAttrList 属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
    },
  },
  computed: {
    // 计算出还未选择销售属性
    unSelectSaleAttr() {
      // 整个平台的销售属性一个三个  ----saleAttrList
      // 当前spu用于属于自己的销售属性spu.spuSaleAttrList  ----颜色
      // 从已有的数组当中过滤出用户需要的元素，并且返回一个新的数据
      let result = this.saleAttrList.filter((item) => {
        // console.log(item);
        // every数组的方法会返回一个布尔值 {真，假}
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
    // 通过some方法也可以
    // unSelectSaleAttr() {
    //   let result = this.saleAttrList.filter((item) => {
    //     return !this.spu.spuSaleAttrList.some((item1) => {
    //       return item.name === item1.saleAttrName;
    //     });
    //   });
    //   return result;
    // },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
