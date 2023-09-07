// 引入axios(axios进行二次封装)
import request from '@/utils/request'
// 暴露对外的登录接口函数
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}
// 暴露对外获取=y'h函数
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}
// 暴露对外的登录接口函数
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
