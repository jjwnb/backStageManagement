// 引入二次封装的axios
import request from '@/utils/request'

// 获取图片接口  /admin/product/spuImageList/{spuId}  get
export const reqSkuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" })

// 获取销售属性的数据 /admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取平台属性的数据 由于在attr API中已经写了所以这里就不写了   reqAttrList

// 将保存的数据提交给服务器
