// 引入二次封装的axios
import request from '@/utils/request'

//获取spu数据列表的接口
//  /admin/product/{page}/{limit}    get  第三级的id
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })

// 获取spu信息  /admin/product/getSpuById/{spuId}   get
export const reqSpu = (supId) => request({ url: `/admin/product/getSpuById/${supId}`, method: 'get' })

// 获取品牌信息  /admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

// 获取sup图片的接口  /admin/product/spuImageList/{spuId}   get
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" })

// 获取平台的全部销售属性--整个平台销售属性一共是三个 /admin/product/baseSaleAttrList  get
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: "get" })

// 添加或者修改spu需要给服务器携带的参数  /admin/product/saveSpuInfo   /admin/product/updateSpuInfo 对于修改和添加唯一的区别就是携带的参数是否带有id
export const reqAddOrUpdateSpu = (supinfo) => {
    // 携带的参数带有id则为---修改spu
    if (supinfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: "post", data: supinfo })
    } else {
        //携带给服务器的参数没有id 则为---添加sup
        return request({ url: "/admin/product/saveSpuInfo", method: 'post', data: supinfo })

    }
}

// 删除spu  /admin/product/deleteSpu/{spuId}   delete
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })



// 获取图片接口  /admin/product/spuImageList/{spuId}  get
export const reqSkuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" })

// 获取销售属性的数据 /admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取平台属性的数据 由于在attr API中已经写了所以这里就不写了   reqAttrList
// 获取平台属性数据  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}   get
export const reqAttrList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })


// 将保存的数据提交给服务器  /admin/product/saveSkuInfo   post
export const reqAddSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: "post", data: skuInfo })

// 获取s