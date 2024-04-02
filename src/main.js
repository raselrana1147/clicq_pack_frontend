import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'element-plus/dist/index.css'
import './style.css'
import './script.js'
import "nprogress/nprogress.css";
import router from "./router"
import App from './App.vue'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app=createApp(App)
    app.use(router)
    app.use(pinia)
    app.use(ElementPlus)


app.config.globalProperties.$filters={

    makeImagePath(img){
        return import.meta.env.VITE_APP_URL+"/"+img;
    },

}
app.mount('#app')
