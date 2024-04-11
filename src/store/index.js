import { createStore } from 'vuex'
import { authModule } from './authModule'

const store = createStore({
  modules: {
    auth: authModule
  }
})


export default store;