import {defineStore, createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useStore = defineStore('main', {
    state: () => ({
        counter: 0
    }),

    actions: {
        increment() {
            this.counter += 1
        }
    },
    persist: {
        paths: ['counter'],
        storage: sessionStorage,
        serializer: {
            serialize: JSON.stringify,
            deserialize: JSON.parse
        }
    }
})
const pinia = createPinia().use(piniaPluginPersistedstate)

export default pinia


