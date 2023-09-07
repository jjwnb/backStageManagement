import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    name: '',
    avatar: '',
    // 菜单标记【根据不同的角色返回不同的标记，数组里面的元素是字符串】
    routes: [],
    // 按钮权限信息
    buttons: [],
    // 用户登录后的角色信息
    roles: [],
    // 对比之后【项目中已有的路由与服务器返回的路由的标记的信息进行对比最终需要展示的数据】
    resultAsyncRoutes:[]
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
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.routes = userInfo.routes
    state.buttons = userInfo.buttons
    state.roles = userInfo.roles
  }
  

}

const actions = {
  // user login 处理登录业务
  async login({ commit }, userInfo) {
    // 解构用户名密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // console.log(result);
    // 当前登录的请求现在使用的mock的数据，而mock数据的code时20000
    if (result.code == 20000) {
      commit('SET_TOKEN', result.data.token)
      commit('SET_RESLUTASYNCROUTES')
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

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // vuex存储用户的全部信息  
        commit('SET_USERINFO', data)
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

