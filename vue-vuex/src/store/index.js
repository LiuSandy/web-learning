import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  /**
   * 提供唯一数据源
   * 1. 访问全局state 值 this.$store.state.count
   * 2. 使用 mapState : import { mapState } from 'vuex';
   *    computed:{ ...mapState(['count']) }
   */
  state: {
    count: 0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
