import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import PickCategory from './pages/PickCategory.vue'
import Game from './pages/Game'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: PickCategory, props: true },
    { path: '/game', name: 'Game', component: Game, props: true }
]

const router = new VueRouter({ routes })

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
