// 引入axios(axios进行二次封装)
import request from '@/utils/request'
// 暴露对外的登录接口函数
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}
// 暴露对外获取用户信息的函数
export function getInfo(token) {
  return request({
    url: '',
    method: 'get',
    params: { token }
  })
}
// 暴露对外退出登录的函数
export function logout() {
  return request({
    url: '/admin/acl/index/logout/admin/acl/index/logout',
    method: 'post'
  })
}
