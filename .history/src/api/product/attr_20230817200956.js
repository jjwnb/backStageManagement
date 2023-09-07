// 平台属性管理模块的请求文件
import request from "@/utils/request"

// 获取一级分类的数据接口
// /admin/product / getCategory1     get
export const reqCategory1List = () => request({
    url: '/admin/product/getCategory1', method: 'get'
})

// 获取二级分类数据接口

export const reqCategory2List = () => request({
    url: '/admin/product/getCategory2/{category1Id}', method: 'get'
})