import mockRquest from '@/utils/mockrequest'
const state = {}
const actions = {
    // 发请求获取首页的mock数据
    async getDate({ commit }) {
       let res await mockRquest.get('/home/list')
    }
}
const mutations = {}
const getters = {}

export default {
    state, mutations, actions, getters
}