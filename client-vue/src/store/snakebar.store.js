export const snakeBar = {
  namespace: true,
  state: {
    show: false,
    text: '',
    color: '',
    setting: {
      timeout: 2000
    } 
  },
  mutations: {
    changeShowState(state, newState) {
      state.show = newState
    },
    changeText(state, newText) {
      state.text = newText
    },
    changeColor(state, newColor) {
      state.color = newColor
    }
  },
  actions: {
  },
  getters: {
    currentShowState: state => state.show,
    currentText: state => state.text,
    currentSetting: state => state.setting,
    currentColor: state => state.color,
  }
}