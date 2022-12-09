import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '/src/assets/scss/app.scss'

const app = createApp(App)

app.config.unwrapInjectedRef = true
app.config.productionTip = false
app.config.warnHandler = function () {
    return null
}

app.use(router)

app.mount('#app')
