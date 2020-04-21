export const mutationPlugins = store => {
  store.subscribe((mutation) => {
    if (mutation.type.includes('change')) {
      window.localStorage.setItem('mutation', JSON.stringify({
        mutationType: mutation.type,
        mutationPayload: mutation.payload
      }));
    }
  })
}