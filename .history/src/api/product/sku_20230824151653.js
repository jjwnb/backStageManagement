// 引入二次封装的axios
import request from '@/utils/request'

// 获取sku列表   /admin/product/list/{page}/{limit}  get
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// 上架  /admin/product/onSale/{skuId}   get 
export const reqSale=(sku)

// 下架  /admin/product/cancelSale/{skuId}   get