import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BaizeUI, {zhCn} from 'baize-ui'
import 'baize-ui/dist/index.css'

createApp(App).use(BaizeUI, {locale: zhCn}).mount('#app')
