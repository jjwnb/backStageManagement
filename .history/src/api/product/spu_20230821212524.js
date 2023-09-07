// 引入二次封装的axios
import request from '@/utils/request'

//获取spu数据列表的接口
//  /admin/product/{page}/{limit}    get  第三级的id
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })

// 获取spu信息