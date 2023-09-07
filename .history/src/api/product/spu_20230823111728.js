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

// 添加或者修改spu需要给服务器携带的参数  /admin/product/saveSpuInfo  对于修改和添加唯一的区别就是携带的参数是否带有id
export const reqAddOrUpdateSpu=(supinfo)=>{
    // 携带的参数带有id则为修改spu
    if(supinfo.id){
        return request({ url:'/admin/product/updateSpuInfo',method:""})
    }
}
