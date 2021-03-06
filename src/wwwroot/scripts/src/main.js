import Vue from 'vue'
import { store } from './store'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Statistics from './components/Statistics.vue'
import Assets from './components/Assets.vue'
import Liabilities from './components/Liabilities.vue'
import Expenses from './components/Expenses.vue'
import Budgets from './components/Budgets.vue'
import BudgetDetail from './components/BudgetDetail.vue'
import User from './components/User.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/statistics', component: Statistics },
    { path: '/assets', component: Assets },
    { path: '/liabilities', component: Liabilities },
    { path: '/expenses', component: Expenses },
    { path: '/budgets', component: Budgets },
    { name: 'budget', path: '/budgets/:id', component: BudgetDetail },
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
