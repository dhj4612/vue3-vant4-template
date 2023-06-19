import {createApp} from 'vue'
// import './style.css'
import 'nprogress/nprogress.css'
import App from './App.vue'
import pinia from './store'
import router from '@/router'

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
