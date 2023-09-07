// 获取品牌管理数据的模块
import request from '@/utils/request'
// 获取匹配列表接口
// /admin/product / baseTrademark / { page } / { limit }
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 处理添加品牌的操作  /admin/product/baseTrademark/save  post  携带两个参数：品牌名称，品牌logo
// 对于新增的品牌，给服务器传递数据不需要传递id，id由服务器生成


// 修改品牌操作 /admin/product/baseTrademark/update   put  携带三个参数：品牌id，品牌名称，品牌logo
// 对于修改某个品牌的操作，前端需要带上品牌id，需要告诉服务器修改的是哪个品牌
export const reqAddOrUpdateTradeMark = (tradmark) => {
    //    带给服务器的数据有携带id---修改
    if (tradmark.id) {
        return request({ url:'/admin/product/baseTrademark/update',me})
    }
}

