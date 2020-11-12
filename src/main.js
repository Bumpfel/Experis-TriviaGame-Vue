import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import PickCategory from './components/pages/PickCategory'
import Game from './components/pages/Game'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
    { path: '/', component: PickCategory },
    { path: '/game/:categoryId', component: Game, props: true }
]

const router = new VueRouter({ routes })

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
