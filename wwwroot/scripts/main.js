import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Statistics from './components/Statistics.vue'
import Register from './components/Register.vue'
import User from './components/User.vue'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    mutations: {
        login (state) {
            state.isLoggedIn = true
        },
        logout (state) {
            state.isLoggedIn = false
        }
    }
})

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/statistics', component: Statistics },
    { path: '/user', component: User }
]

const router = new VueRouter({
    routes
})

new Vue({
    name: 'Main',
    store,
    router,
    render: h => h(App)
}).$mount('#app')
