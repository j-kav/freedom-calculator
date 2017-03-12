import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Statistics from './components/Statistics.vue'
import Assets from './components/Assets.vue'
import Liabilities from './components/Liabilities.vue'
import Expenses from './components/Expenses.vue'
import User from './components/User.vue'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        assets: null,
        liabilities: null,
        expenses: null
    },
    getters: {
        assetsByType: (state) => (assetTypeArray) => {
            return state.assets.filter(asset => assetTypeArray.includes(asset.assetType))
        },
        totalAssets: (state) => {
            let total = 0
            for (const asset of state.assets) {
                total += parseFloat(asset.value)
            }
            return total
        },
        totalLiabilities: (state) => {
            let total = 0
            for (const liability of state.liabilities) {
                total += parseFloat(liability.principal)
            }
            return total
        },
        netWorth: (state, getters) => {
            return getters.totalAssets - getters.totalLiabilities
        }
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
            state.assets = null
        },
        setAssets(state, assets) {
            state.assets = assets
        },
        addAsset(state, asset) {
            state.assets.push(asset)
        },
        updateAsset(state, updatedAsset) {
            var assetIndex = state.assets.findIndex(asset => asset.assetId === updatedAsset.assetId);
            state.assets[assetIndex] = updatedAsset;
        },
        removeAsset(state, id) {
            state.assets = state.assets.filter(asset => asset.assetId !== id)
        },
        setLiabilities(state, liabilities) {
            state.liabilities = liabilities
        },
        addLiability(state, liability) {
            state.liabilities.push(liability)
        },
        updateLiability(state, updatedLiability) {
            var liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === updatedLiability.liabilityId);
            state.liabilities[liabilityIndex] = updatedLiability;
        },
        removeLiability(state, id) {
            state.liabilities = state.liabilities.filter(liability => liability.liabilityId !== id)
        },
        setExpenses(state, expenses) {
            state.expenses = expenses
        },
        addExpense(state, expense) {
            state.expenses.push(expense)
        },
        updateExpense(state, updatedExpense) {
            var expenseIndex = state.expenses.findIndex(expense => expense.expenseId === updatedExpense.expenseId);
            state.expenses[expenseIndex] = updatedExpense;
        },
        removeExpense(state, id) {
            state.expenses = state.expenses.filter(expense => expense.expenseId !== id)
        }
    }
})

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/statistics', component: Statistics },
    { path: '/assets', component: Assets },
    { path: '/liabilities', component: Liabilities },
    { path: '/expenses', component: Expenses },
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