import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 首先声明一个状态 state
const state = {
  userName:'',
  count: 0,
  checklogin: 1,  //验证用户是否登录（0为登录）
  checkpower: 0,
  orderselect:0,
  startTime:'',
  endTime:'',
  carSite:'',
  userid:'',
}

// 然后给 actions 注册事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
  increment: ({ commit }) => commit('increment'), // 提交到mutations中处理
  decrement: ({ commit }) => commit('decrement'),
  inchecklogin: ({ commit }) => commit('inchecklogin'),
}
// 更新状态
const mutations = {
  increment (state) {
    state.count = state.count + 5
  },
  decrement (state) {
    state.count = state.count - 3
  },
  inchecklogin (state) {
    state.checklogin = 0
  },
  changeNameme(state,na) {
   state.userName=na
  },
  changeuid(state,uid) {
    state.userid=uid
  },
  incheckpower(state){
    state.checkpower=1
  },
//  修改租车时间、还车时间、租车地点
  changestartTime(state,na) {
    state.startTime=na
  },
  changeendTime(state,na) {
    state.endTime=na
  },
  changecarSite(state,na) {
    state.carSite=na
  },
//  desname:'desname',
//           outlogin:'outlogin',
//           outipower:'outlogin',
//退出时，置空名字，修改退出状态，修改显示状态
  desname(state){
    state.userName=''
  },
  outlogin(state){
    state.checklogin = 1
  },
  outipower(state){
    state.checkpower=0
  },

}
// 获取状态信息
const getters = {
}

// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
