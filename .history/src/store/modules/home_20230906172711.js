import mockRequest from '@/utils/mockrequest'
const state = {}
const actions = {
    // 发请求获取首页的mock数据
    async getDate({ commit }) {
        let result = await mockRequest.get('/home/list')
        console.log(result);
    }
}
const mutations = {}
const getters = {}

export default {
    state, mutations, actions, getters
}