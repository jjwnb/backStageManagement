// 平台属性管理模块的请求文件
import request from "@/utils/request"

// 获取一级分类的数据接口  // /admin/product / getCategory1     get
export const reqCategory1List = () => request({
    url: '/admin/product/getCategory1', method: 'get'
})

// 获取二级分类数据接口  /admin/product/getCategory2/{category1Id}  get
export const reqCategory2List = (category1Id) => request({
    url: `/admin/product/getCategory2/${category1Id}`, method: 'get'
})

// 获取三级级分类数据接口  /admin/product/getCategory2/{category1Id}  get
export const reqCategory3List = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`, method: 'get'
})


// 获取平台属性数据  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}   ge't