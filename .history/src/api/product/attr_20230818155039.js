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


// 获取平台属性数据  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}   get
export const reqAttrList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })


// 添加属性与属性值的接口  /admin/product/saveAttrInfo post
export const reqAddAttr = (data) => request({ url: "/admin/product/saveAttrInfo", data, method: 'post' })
/**
{
  "attrName": "",  //属性名
  "attrValueList": [  //属性名中的属性值 因为属性值可以是多个，因此需要的是数组
    {
      "attrId": 0,   属性的id
      "valueName": "string"   属性值
       }
  ],
  "categoryId": 0, category3Id
  "categoryLevel": 3,  
}
 */