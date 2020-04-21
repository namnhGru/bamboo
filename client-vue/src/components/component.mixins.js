import { store } from '../store/index.store'

export const watchMutationMixins = {
  created() {
    window.addEventListener('storage', syncMutation)
  },
  beforeDestroy() {
    window.removeEventListener('storage', syncMutation)
  }

}

function syncMutation(event) {
  if (event.key == 'mutation') {
    const data = JSON.parse(window.localStorage.getItem('mutation'))
    const { mutationType, mutationPayload } = data
    store.commit(mutationType, mutationPayload)
  }
}