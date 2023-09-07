<template>
  <div>
    <el-card style="margin: 30px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 20px 0"
          :disabled="!category3Id"
          @click="addAttr"
        >
          添加属性</el-button
        >
        <!-- 表格:展示平台属性 -->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop " label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 25px"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true"> 取消</el-button>
        <el-table
          style="width: 100%; margin: 25px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            prop="prop"
            label="序号"
            width="80"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的结构需要用到span和input进行来回的切换 -->
              <el-input
                v-model.trim="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                :ref="$index"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span
                v-else
                @click="toggleEditMode(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="margin: 2px 25px"
          @click="addOrUpdateAttr"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 存储服务器返回的平台属性
      attrList: [],
      // 控制表格显示与隐藏
      isShowTable: true,
      // 收集新增属性或者修改属性使用
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，属性值可以有多个，每个属性值都是一个对象需要attrId  valueName
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //服务器也需要区分几级id
      },
    };
  },
  methods: {
    // 自定义事件回调
    getCategoryId({ categoryId, level }) {
      // 区分三级分类相应的id 以及父组件进行存储
      // console.log(categoryId, level);
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;

        // 发请求获取平台属性
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    // 当用户确定三级分类的数据后，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值的回调
    addAttrValue() {
      // // 向属性值的数组里面添加元素
      // attrId是相应属性的id目前而言是添加属性的操作没有相应的属性的id 所以目前带给服务器的id为undefined
      // valueName相应的属性值的名称
      // 对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值(新增属性值的时候需要把已有的属性的id带上)
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        // flag：给每个属性值添加一个标记flag用于切换查看和编辑模式，每一个属性值可以控制模式切换
        // 当前flag是响应式属性（数据变化视图跟着变化）
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性按钮的回调
    addAttr() {
      // 切换table的显示与隐藏
      this.isShowTable = false;
      // 清除数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值，属性值可以有多个，每个属性值都是一个对象需要attrId  valueName
        ],
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3, //服务器也需要区分几级id
      };
    },
    // 修改某一个属性
    updateAttr(row) {
      this.isShowTable = false;
      // 将选择的属性赋值给attrinfo
      // 由于数据结构中存在对象里面套数组 数组里面套对象因此需要使用深拷贝解决这类问题
      // 深拷贝和浅拷贝在面试的时候出现频率很高，切记达到手写深拷贝与浅拷贝
      this.attrInfo = cloneDeep(row);
      // 在修改某一个属性的时候将相应的属性值元素添加上flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        // item.flag=false   这样书写也可以给属性值添加flag但是视图不会跟着变化，因为flag不是响应式的
        // 对象中后追加的属性，Vue默认不做响应式处理
        this.$set(item, "flag", false);
      });
    },
    // 失去焦点事件，切换为查看模式，展示span
    toLook(row) {
      // 如果属性值为空不能作为新的属性值，并且给用户提示输入不能为空
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      // 新增的属性值不能与已有的重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // 需要将row从数组里面判断的时候去除
        // row：最新新增的属性值【数组的最后一项元素】
        // 判断的时候需要把已有的数组当中新增的属性值去除
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return;
      // row:形参是当前用户添加的最新的属性值
      // 由编辑模式切换为查看模式(让input消失显示span)
      row.flag = false;
    },
    // 切换为input并自动聚焦
    toggleEditMode(row, index) {
      // 由查看模式切换为编辑模式(让span消失显示input并且在dom渲染完成之后自动聚焦)
      row.flag = true;

      this.$nextTick(() => {
        this.$refs[index].focus();
        // console.log(this.$refs.inputElement.$refs.input);
      });
    },
    // 气泡确定按钮的回调
    // 最新版本饿了么ui 2.15.13 目前模板中的版本号为2.13.x 所以事件前面加on
    deleteAttrValue(index) {
      // 当前删除属性值的操作是不需要发请求的
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存按钮，进行添加属性或者修改属性的操作
    async addOrUpdateAttr() {
      // 整理参数
      // 1.如果用户添加了很多属性值且属性值为空不应该提交给服务器
      // 2.提交给服务器的数据中不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          // 过滤掉属性不为空的
          if (item.valueName != "") {
            // 属性值不为空的还要删除掉flag
            delete item.flag;
            return true;
          }
        }
      );
      try {
        // 发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        // 
        this.$message.success("保存成功");
        // 再次获取列表数据
        this.getAttrList();
      } catch (error) {
        this.$message("保存失败");
      }
    },
  },
};
</script>

<style></style>
