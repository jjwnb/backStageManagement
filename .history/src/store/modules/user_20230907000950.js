import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// 路由模块中重置路由的方法
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router';
import cloneDeep from 'lodash/cloneDeep'
const getDefaultState = () => {
  return {
    //获取token
    token: getToken(),
    //存储用户名
    name: '',
    //存储用户头像
    avatar: '',
    //服务器返回的菜单信息【根据不同的角色：返回的标记信息，数组里面的元素是字符串】
    routes: [],
    //角色信息
    roles: [],
    //按钮权限的信息
    buttons: [],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的理由】
    resultAsyncRoutes: [],
    //用户最终需要展示全部路由
    resultAllRputes: []
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    //用户名
    state.name = userInfo.name;
    //用户头像
    state.avatar = userInfo.avatar;
    //菜单权限标记
    state.routes = userInfo.routes;
    //按钮权限标记
    state.buttons = userInfo.buttons;
    //角色
    state.roles = userInfo.roles;
  },
  // 最终计算处理的异步路由
  SET_RESLUTASYNCROUTES: (state, asyncRoutes) => {
    state.resultAsyncRoutes = asyncRoutes
  }

}

// 定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // console.log(asyncRoutes, routes);
  // g
}

// actions
const actions = {
  // user login 处理登录业务
  async login({ commit }, userInfo) {
    // 解构用户名密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // console.log(result);
    // 当前登录的请求现在使用的mock的数据，而mock数据的code时20000
    if (result.code == 20000) {
      //vuex存储token
      commit('SET_TOKEN', result.data.token)
      //本地持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取用户信息：返回的数据包含用户名name, 头像avater , routes返回的标记 不同的用户展示不同的菜单,roles(用户的角色) ，buttons[按钮的信息：按钮权限用的标记]
        const { data } = response
        // vuex存储用户的全部信息  
        commit('SET_USERINFO', data)
        commit('SET_RESLUTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

