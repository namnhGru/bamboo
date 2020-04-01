import axios from 'axios'

export const drawer = {
  state: {
    drawers: []
  },
  mutations: {
    changeDrawerList(state, newDrawerList) {
      state.drawers = newDrawerList
      state.drawers.sort(byOrder)
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
        const { data } = await axios.get(`${process.env.VUE_APP_EXPRESS_API}/menu`) 
        context.commit('changeDrawerList', data.data)
      } catch(err) {
        console.error(err)
      }
    },
    // async getNewSingleDrawerState({commit}, drawer) {
    //   try {
    //     const { data } = await axios.get(`${process.env.VUE_APP_EXPRESS_API}/menu/${drawer._id}`)
    //     commit('changeSingleDrawer', data.data)
    //   } catch(err) {
    //     console.error(err)
    //   }
    // },
    async changeSingleDrawer({state}, index) {
      try {
        await axios.put(`${process.env.VUE_APP_EXPRESS_API}/menu/${state.drawers[index]._id}`, { drawer: state.drawers[index].drawer})
        // await dispatch('getNewSingleDrawerState')
      } catch(err) {
        console.error(err)
      }
    }
  },
  getters: {
    currentDrawers: state => state.drawers,
    singleDrawer: (state, newDrawer) => {
      const index = state.drawers.findIndex(x => x._id == newDrawer._id)
      return state.drawers[index]
    }
  }
}

function byOrder(a, b) {
  return a.order - b.order
}