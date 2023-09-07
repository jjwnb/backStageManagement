import mockRquest from '@/utils/mockrequest'
const state = {}
const actions = {
    // 发请求获取首页的mock数据
    getDate({ commit }) {
        mockRquest.get('/home')
    }
}
const mutations = {}
const getters = {}

export default {
    state, mutations, actions, getters
}