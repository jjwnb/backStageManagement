// 获取品牌管理数据的模块
import request from '@/utils/request'
// 获取匹配列表接口
// /admin/product / baseTrademark / { page } / { limit }
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 处理添加品牌的操作  /admin/product/baseTrademark/save  post  携带两个参数：品牌名称，品牌logo
// 对于新增的品牌，给服务器传递数据不需要传递id，id由服务器生成
export const req


// 修改品牌操作 /admin/product/baseTrademark/update   put  携带三个参数：品牌id，品牌名称，品牌logo
export const  

