<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <!-- data：表格将来展示的数据---数组类型-->
    <!-- border--添加边框 -->
    <!--column属性 
        lable--设置标题
        width--对应列的宽度
        align---标题的对其方式
        prop:对应内容的字段名
         -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column label="序号" width="80px" align="center" type="index">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
    当前页，数据总数，每一页展示的条数，连续页码数
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      current-page 当前页
      total总数据条数
      page-size:每一页需要展示多少条数据
      page-sizes：设置每一页展示多少条数据
      layout--实现分页器布局
      page-count--连续的页码数 如果设置9则连续的页码数为7
      注意：饿了么ui  table展示数据是以一列一列进行展示数据
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :page-count="7"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="getPageList"
      @size-change="getPageList"
    >
    </el-pagination>
    <!-- 对话框
    :visible.sync--控制对话框显示与隐藏用的
     -->
    <el-dialog
      :title="tmfrom.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- form展示表单  :model这个属性的作用是把收集的表单的数据收集到哪个对象身上，将来饿了么iu要进行表单验证-->
      <el-form style="width: 80%" :model="tmfrom" :rules="rules">
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="tmfrom.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth">
          <!--  :on-success="handleAvatarSuccess"图片上传成功会执行一次
                :before-upload="beforeAvatarUpload"  图片上传之前会执行一次
             -->
          <!-- 这里收集数据：不能使用v-model,因为不是表单元素 
             action:设置图片上传的地址
             -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmfrom.logoUrl" :src="tmfrom.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 代表的是分页器第几页
      page: 1,
      // 当前页数展示数据的个数
      limit: 3,
      // 接收服务器返回的数据
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      // 收集品牌信息---对象身上的属性，不能瞎写，需要和文档对应
      tmfrom: {
        logoUrl: "",
        tmName: "",
      },
      //   表单验证规则
      rules: {
        // 品牌名称验证规则
        tmName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "change" },
        ],
        // 品牌logo验证规则 
        logoUrl: [
          { required: true, message: "请选择品牌的图片", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取数据列表的的数据
    async getPageList(pager = 1, limits = 3) {
      this.page = pager;
      this.limit = limits;
      // 解构data数据
      const { page, limit } = this;
      // 获取品牌列表的接口服务器发请求的时候服务器需要带参数
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 两种方法 ，1是直接在getpagelist修改并重新请求 2。自己调用方法修改data并重新请求
    handleCurrentChange(page) {
      // 修改参数
      this.page = page;
      this.getPageList();
      //   console.log(page);
    },
    // 当分页器某一页需要展示数据的条数发生变化的时候会触发
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      this.getPageList();
    },
    // 添加品牌按钮
    showDialog() {
      // 先清空之前的数据
      this.tmfrom = { logoUrl: "", tmName: "" };
      // 显示对话框
      this.dialogFormVisible = true;
    },
    // 修改某一个品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      //   row，当前用户选中的品牌信息
      console.log(row);
      //   将已有的品牌信息赋值给tmfrom进行展示
      //将服务器返回的信息直接给了tmfrom进行展示 也就是tmfrom存储的即为服务器返回的品牌信息
      this.tmfrom = { ...row };
    },
    // 上传logo成功
    handleAvatarSuccess(res, file) {
      // res上传成功之后返回前端数据
      // file也是返回的数据 里面包含res
      //   收集品牌图片的数据，将来需要带个服务器
      this.tmfrom.logoUrl = URL.createObjectURL(file.raw);
    },
    // 上传logo之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加按钮（修改品牌|添加品牌）
    async addOrUpdateTradeMark() {
      this.dialogFormVisible = false;
      // 发请求(添加，修改)
      let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(
        this.tmfrom
      );
      if (result.code == 200) {
        // 弹出一个信息:添加品牌成功，修改品牌成功
        this.$message({
          message: this.tmfrom.id ? "修改品牌成功" : "添加品牌成功",
          type: "success",
        });
        // 添加或者修改品牌成功之后重新获取匹配列表并展示
        // 如果添加品牌成功停留在第一页，如果是修改品牌应该留在当前页面
        this.getPageList(this.tmfrom.id ? this.page : 1);
      }
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
