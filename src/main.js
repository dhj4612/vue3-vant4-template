import {createApp} from 'vue'
// import './style.css'
import 'nprogress/nprogress.css'
import App from './App.vue'
import pinia from './store'
import router from '@/router'
import 'vant/lib/index.css'; // vant-css
import VantComponent from 'vant'
import JsonViewer from 'vue-json-viewer'

createApp(App)
    .use(pinia)
    .use(JsonViewer)
    .use(router)
    .use(VantComponent)
    .mount('#app')
