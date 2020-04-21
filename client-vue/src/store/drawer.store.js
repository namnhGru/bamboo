import { AxiosInstance } from '../services/api'

export const drawer = {
  namespace: true,
  state: {
    drawers: []
  },
  mutations: {
    changeDrawerList(state, newDrawerList) {
      state.drawers = newDrawerList.sort(byOrder)
    },
    changeSingleDrawer(state, newDrawer) {
      const index = state.drawers.findIndex(x => x._id == newDrawer._id)
      state.drawers[index] = newDrawer 
      state.drawers.sort(byOrder)
    }
  },
  actions: {
    async getNewDrawerList(context) {
      try {
        const { data } = await AxiosInstance.get(`${process.env.VUE_APP_EXPRESS_API}/menu`) 
        context.commit('changeDrawerList', data.data)
      } catch(err) {
        console.error(err)
      }
    },
    async changeSingleDrawer({state,commit}, index) {
      try {
        await AxiosInstance.put(`${process.env.VUE_APP_EXPRESS_API}/menu/${state.drawers[index]._id}`, { drawer: state.drawers[index].drawer})
        commit('changeSingleDrawer', {
          ...state.drawers[index],
          drawer: state.drawers[index].drawer
        })
      } catch(err) {
        console.error(err)
      }
    }
  },
  getters: {
    currentDrawers: state => state.drawers,
  }
}

function byOrder(a, b) {
  return a.order - b.order
}