import mockRequest from '@/utils/mockRequest'
const state = {}
const actions = {
    // 发请求获取首页的mock数据
    async getDate({ commit }) {
        let result = await mockRequest.get('/home/list')
        if (result.code == 20000) {
            commit('GETDATE', result.data)
        }
    }
}
const mutations = {
    GETDATE(state,list){
state.list=
    }
}
const getters = {}

export default {
    state, mutations, actions, getters
}