// 获取品牌管理数据的模块
import request from '@/utils/request'
// 获取匹配列表接口
// /admin/product / baseTrademark / { page } / { limit }
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 处理添加品牌的操作  /admin/product/baseTrademark/save  post
export c
