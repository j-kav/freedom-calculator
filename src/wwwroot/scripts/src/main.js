import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Statistics from './components/Statistics.vue'
import Assets from './components/Assets.vue'
import AssetBreakdown from './components/AssetBreakdown.vue'
import Liabilities from './components/Liabilities.vue'
import Expenses from './components/Expenses.vue'
import Budgets from './components/Budgets.vue'
import BudgetDetail from './components/BudgetDetail.vue'
import User from './components/User.vue'
import assetTypes from './assetTypes'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        assets: null,
        liabilities: null,
        expenses: null,
        budgets: null
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
        totalAssetEquity: (state) => {
            let total = 0
            for (const asset of state.assets) {
                if (asset.assetType === assetTypes.RealEstate) {
                    total += parseFloat(asset.equity)
                } else {
                    total += parseFloat(asset.value)
                }
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
        },
        budgetByDate: (state) => (month, year) => {
            return state.budgets.filter(budget => month === budget.month && year === budget.year)
        },
        budgetById: (state) => (id) => {
            return state.budgets.find(budget => budget.budgetId === id)
        },
        averageInvestments: (state) => {
            const budgets = state.budgets
            let totalInvestments = 0
            for (const budget of budgets) {
                for (const investment of budget.investments) {
                    totalInvestments += investment.amount
                }
            }
            return totalInvestments / budgets.length
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
            for (var i = 0; i < assets.length; i++) {
                var asset = assets[i];
                asset.equity = asset.value
                if (asset.liabilityId) {
                    var liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === asset.liabilityId)
                    asset.equity -= state.liabilities[liabilityIndex].principal
                }
            }
            state.assets = assets
        },
        addAsset(state, asset) {
            asset.equity = asset.value
            if (asset.liabilityId) {
                var liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === asset.liabilityId)
                asset.equity -= state.liabilities[liabilityIndex].principal
            }
            state.assets.push(asset)
        },
        updateAsset(state, updatedAsset) {
            updatedAsset.equity = updatedAsset.value
            if (updatedAsset.liabilityId) {
                var liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === updatedAsset.liabilityId)
                updatedAsset.equity -= state.liabilities[liabilityIndex].principal
            }
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
            var liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === updatedLiability.liabilityId)
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
            var expenseIndex = state.expenses.findIndex(expense => expense.expenseId === updatedExpense.expenseId)
            state.expenses[expenseIndex] = updatedExpense;
        },
        removeExpense(state, id) {
            state.expenses = state.expenses.filter(expense => expense.expenseId !== id)
        },
        setBudgets(state, budgets) {
            // calculate totals
            for (const budget of budgets) {
                let earnedInc = 0
                for (const item of budget.earnedIncome) {
                    earnedInc += Number.parseFloat(item.amount)
                }
                budget.totalEarnedIncome = earnedInc
                let passiveInc = 0
                for (const item of budget.passiveIncome) {
                    passiveInc += Number.parseFloat(item.amount)
                }
                budget.totalPassiveIncome = passiveInc
                let investments = 0
                for (const item of budget.investments) {
                    investments += Number.parseFloat(item.amount)
                }
                budget.totalInvestments = investments
                let projectedExpenses = 0
                let actualExpenses = 0
                for (const item of budget.expenses) {
                    projectedExpenses += Number.parseFloat(item.projected)
                    for (const expenseItem of item.budgetExpenseItems) {
                        actualExpenses += Number.parseFloat(expenseItem.amount)
                    }
                }
                budget.totalProjectedExpenses = projectedExpenses
                budget.totalActualExpenses = actualExpenses
            }
            state.budgets = budgets
        },
        addBudget(state, budget) {
            state.budgets.push(budget)
        },
        updateBudget(state, updatedBudget) {
            var budgetIndex = state.budgets.findIndex(budget => budget.budgetId === updatedBudget.budgetId)
            state.budgets[budgetIndex] = updatedBudget
        },
        removeBudget(state, id) {
            state.budgets = state.budgets.filter(budget => budget.budgetId !== id)
        },
        addBudgetEarnedIncomeItem(state, budgetEarnedIncomeItem) {
            var budget = state.budgets.find(budget => budget.budgetId === budgetEarnedIncomeItem.budgetId)
            budget.earnedIncome.push(budgetEarnedIncomeItem)
            budget.totalEarnedIncome += budgetEarnedIncomeItem.amount
        },
        removeBudgetEarnedIncomeItem(state, budgetEarnedIncomeItem) {
            var budget = state.budgets.find(budget => budget.budgetId === budgetEarnedIncomeItem.budgetId)
            var position = budget.earnedIncome.indexOf(budgetEarnedIncomeItem)
            budget.earnedIncome.splice(position, 1)
            budget.totalEarnedIncome -= budgetEarnedIncomeItem.amount
        },
        addBudgetPassiveIncomeItem(state, budgetPassiveIncomeItem) {
            var budget = state.budgets.find(budget => budget.budgetId === budgetPassiveIncomeItem.budgetId)
            budget.passiveIncome.push(budgetPassiveIncomeItem)
            budget.totalPassiveIncome += budgetPassiveIncomeItem.amount
        },
        removeBudgetPassiveIncomeItem(state, budgetPassiveIncomeItem) {
            var budget = state.budgets.find(budget => budget.budgetId === budgetPassiveIncomeItem.budgetId)
            var position = budget.passiveIncome.indexOf(budgetPassiveIncomeItem)
            budget.passiveIncome.splice(position, 1)
            budget.totalPasiveIncome += budgetPassiveIncomeItem.amount
        },
        addBudgetInvestmentItem(state, budgetInvestmentItem) {
            var budget = state.budgets.find(budget => budget.budgetId === budgetInvestmentItem.budgetId)
            budget.investments.push(budgetInvestmentItem)
            budget.totalInvestments += budgetInvestmentItem.amount
        },
        removeBudgetInvestmentItem(state, budgetInvestmentItem) {
            var budget = state.budgets.find(budget => budget.budgetId === budgetInvestmentItem.budgetId)
            var position = budget.investments.indexOf(budgetInvestmentItem)
            budget.investments.splice(position, 1)
            budget.totalInvestments -= budgetInvestmentItem.amount
        },
        addBudgetExpense(state, budgetExpense) {
            var budget = state.budgets.find(budget => budget.budgetId === budgetExpense.budgetId)
            budget.expenses.push(budgetExpense)
            budget.totalProjectedExpenses += budgetExpense.amount
        },
        removeBudgetExpense(state, budgetExpense) {
            var budget = state.budgets.find(budget => budget.budgetId === budgetExpense.budgetId)
            var position = budget.expenses.indexOf(budgetExpense)
            budget.expenses.splice(position, 1)
            budget.totalProjectedExpenses -= budgetExpense.amount
        },
        addBudgetExpenseItem(state, budgetExpenseItem) {
            var budgetId = budgetExpenseItem.budgetExpense.budgetId
            var budgetExpenseId = budgetExpenseItem.budgetExpenseId
            var budget = state.budgets.find(budget => budget.budgetId === budgetId)
            var budgetExpense = budget.expenses.find(budgetExpense => budgetExpense.budgetExpenseId === budgetExpenseId)
            budgetExpense.budgetExpenseItems.push(budgetExpenseItem)
            budget.totalActualExpenses += budgetExpenseItem.amount
        },
        updateBudgetExpenseItem(state, budgetExpenseItem) {
            var budgetId = budgetExpenseItem.budgetExpense.budgetId
            var budgetExpenseId = budgetExpenseItem.budgetExpenseId
            var budget = state.budgets.find(budget => budget.budgetId === budgetId)
            var budgetExpense = budget.expenses.find(budgetExpense => budgetExpense.budgetExpenseId === budgetExpenseId)
            const item = budgetExpense.budgetExpenseItems.find(item => item.budgetExpenseItemId === budgetExpenseItem.budgetExpenseItemId)
            item.amount = budgetExpenseItem.amount
            // recalculate all actual expenses
            budget.totalActualExpenses = 0
            for (const item of budgetExpense.budgetExpenseItems) {
                budget.totalActualExpenses += item.amount
            }
        },
        removeBudgetExpenseItem(state, budgetExpenseItem) {
            var budgetId = budgetExpenseItem.budgetExpense.budgetId
            var budgetExpenseId = budgetExpenseItem.budgetExpenseId
            var budget = state.budgets.find(budget => budget.budgetId === budgetId)
            var budgetExpense = budget.expenses.find(budgetExpense => budgetExpense.budgetExpenseId === budgetExpenseId)
            var position = budgetExpense.budgetExpenseItems.indexOf(budgetExpenseItem)
            budgetExpense.budgetExpenseItems.splice(position, 1)
            budget.totalActualExpenses -= budgetExpenseItem.amount
        }
    }
})

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/statistics', component: Statistics },
    { path: '/assets', component: Assets },
    { path: '/assetbreakdown', component: AssetBreakdown },
    { path: '/liabilities', component: Liabilities },
    { path: '/expenses', component: Expenses },
    { path: '/budgets', component: Budgets },
    { name: 'budget', path: '/budget/:id', component: BudgetDetail },
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
