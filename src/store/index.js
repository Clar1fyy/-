import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    id: 5,
    listState: 'all'
  },
  getters: {
    overplusItem (state) {
      return state.list.filter(item => {
        return item.done === false
      }).length
    },
    infoList (state) {
      if (state.listState === 'all') {
        return state.list
      }
      if (state.listState === 'undone') {
        return state.list.filter(item => item.done === false)
      }
      if (state.listState === 'done') {
        return state.list.filter(item => item.done === true)
      }
      return state.list
    }
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    valueChange (state, value) {
      state.inputValue = value
    },
    addList (state) {
      const ph = {
        info: state.inputValue.trim(),
        id: state.id,
        done: false
      }
      state.list.push(ph)
      state.inputValue = ''
      state.id++
    },
    remove (state, id) {
      state.list = state.list.filter(item => {
        return item.id !== id
      })
    },
    checkedBox (state, checked) {
      const i = state.list.findIndex(item => item.id === checked.id)
      if (i !== -1) state.list[i].done = checked.status
    },
    cleanItem (state) {
      state.list = state.list.filter(item => {
        return item.done === false
      })
    },
    changeViewKey (state, key) {
      state.listState = key
    }
  },
  actions: {
    async getList ($store, item) {
      const { data: res } = await axios.get('./list.json')
      $store.commit('initList', res)
    }
  },
  modules: {
  }
})
