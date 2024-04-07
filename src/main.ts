import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'es6-promise/auto';
import {store} from "./store"


const app = createApp(App)
app.use(store)
app.mount('#app')
