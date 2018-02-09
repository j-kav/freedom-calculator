import Vue from 'vue'
import Vuex from 'vuex'
import assetTypes from './assetTypes'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        assets: null,
        liabilities: null,
        expenses: null,
        budgets: null,
        expenseAverages: null,
        totalEarnedIncome: 0,
        totalPassiveIncome: 0,
        totalInvestments: 0,
        totalActualMandatoryExpenses: 0,
        totalActualDiscretionaryExpenses: 0,
        averageSavingsRate: 0,
        authData: {}
    },
    getters: {
        assetsByType: (state) => (assetTypeArray) => {
            return state.assets.filter(asset => assetTypeArray.includes(asset.assetType))
        },
        totalCash: (state) => {
            let totalCash = 0
            const cashAssets = state.assets.filter(asset => asset.assetType === assetTypes.Cash)
            for (const cashAsset of cashAssets) {
                totalCash += cashAsset.value
            }
            return totalCash
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
        averageEarnedIncome: (state) => {
            return state.totalEarnedIncome === 0 ? 0 : state.totalEarnedIncome / state.budgets.length
        },
        averagePassiveIncome: (state) => {
            return state.totalPassiveIncome === 0 ? 0 : state.totalPassiveIncome / state.budgets.length
        },
        averageInvestments: (state) => {
            return state.totalInvestments === 0 ? 0 : state.totalInvestments / state.budgets.length
        },
        averageMandatoryExpenses: (state) => {
            return state.totalActualMandatoryExpenses === 0 ? 0 : state.totalActualMandatoryExpenses / state.budgets.length
        },
        averageDiscretionaryExpenses: (state) => {
            return state.totalActualDiscretionaryExpenses === 0 ? 0 : state.totalActualDiscretionaryExpenses / state.budgets.length
        },
        expenseAverages: (state) => (mandatory) => {
            const expenseAverages = state.expenseAverages.filter(expenseAverage => expenseAverage.isMandatory === mandatory)
            return expenseAverages
        }
    },
    mutations: {
        login(state, expirationDate) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
            state.assets = null
            state.liabilities = null
            state.expenses = null
            state.budgets = null
            state.expenseAverages = null
            state.totalEarnedIncome = 0
            state.totalPassiveIncome = 0
            state.totalInvestments = 0
            state.totalActualMandatoryExpenses = 0
            state.totalActualDiscretionaryExpenses = 0
            state.authData = {}
        },
        setAssets(state, assets) {
            for (let i = 0; i < assets.length; i++) {
                const asset = assets[i];
                asset.equity = asset.value
                if (asset.liabilityId) {
                    const liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === asset.liabilityId)
                    asset.equity -= state.liabilities[liabilityIndex].principal
                }
            }
            state.assets = assets
        },
        addAsset(state, asset) {
            asset.equity = asset.value
            if (asset.liabilityId) {
                const liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === asset.liabilityId)
                asset.equity -= state.liabilities[liabilityIndex].principal
            }
            state.assets.push(asset)
        },
        updateAsset(state, updatedAsset) {
            updatedAsset.equity = updatedAsset.value
            if (updatedAsset.liabilityId) {
                const liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === updatedAsset.liabilityId)
                updatedAsset.equity -= state.liabilities[liabilityIndex].principal
            }
            const assetIndex = state.assets.findIndex(asset => asset.assetId === updatedAsset.assetId);
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
            const liabilityIndex = state.liabilities.findIndex(liability => liability.liabilityId === updatedLiability.liabilityId)
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
            const expenseIndex = state.expenses.findIndex(expense => expense.expenseId === updatedExpense.expenseId)
            state.expenses[expenseIndex] = updatedExpense;
        },
        removeExpense(state, id) {
            state.expenses = state.expenses.filter(expense => expense.expenseId !== id)
        },
        setExpenseAverages(state, averages) {
            state.expenseAverages = averages
        },
        setBudgets(state, budgets) {
            // calculate totals
            let totalEarnedIncome = 0
            let totalPassiveIncome = 0
            let totalInvestments = 0
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
                    const isMandatory = item.expense.isMandatory
                    projectedExpenses += Number.parseFloat(item.projected)
                    for (const expenseItem of item.budgetExpenseItems) {
                        const amount = Number.parseFloat(expenseItem.amount)
                        actualExpenses += amount
                        if (isMandatory) {
                            state.totalActualMandatoryExpenses += amount
                        } else {
                            state.totalActualDiscretionaryExpenses += amount
                        }
                    }
                }
                budget.totalProjectedExpenses = projectedExpenses
                budget.totalActualExpenses = actualExpenses
                budget.savingsRate = budget.totalEarnedIncome === 0 ? 0 : budget.totalInvestments / budget.totalEarnedIncome
                budget.savingsRatePercent = (budget.savingsRate * 100).toFixed(2) + '%'
                totalEarnedIncome += earnedInc
                totalPassiveIncome += passiveInc
                totalInvestments += investments
            }
            state.budgets = budgets
            state.totalEarnedIncome = totalEarnedIncome
            state.totalPassiveIncome = totalPassiveIncome
            state.totalInvestments = totalInvestments
            state.averageSavingsRate = ((totalEarnedIncome === 0 ? 0 : totalInvestments / totalEarnedIncome) * 100).toFixed(2) + '%'
        },
        addBudget(state, budget) {
            budget.totalEarnedIncome = 0
            budget.totalPassiveIncome = 0
            budget.totalInvestments = 0
            budget.totalActualExpenses = 0
            budget.totalProjectedExpenses = 0
            state.budgets.push(budget)
        },
        updateBudget(state, updatedBudget) {
            const budgetIndex = state.budgets.findIndex(budget => budget.budgetId === updatedBudget.budgetId)
            state.budgets[budgetIndex] = updatedBudget
        },
        removeBudget(state, id) {
            state.budgets = state.budgets.filter(budget => budget.budgetId !== id)
        },
        addBudgetEarnedIncomeItem(state, budgetEarnedIncomeItem) {
            const budget = state.budgets.find(budget => budget.budgetId === budgetEarnedIncomeItem.budgetId)
            budget.earnedIncome.push(budgetEarnedIncomeItem)
            budget.totalEarnedIncome += budgetEarnedIncomeItem.amount
            state.totalEarnedIncome += budgetEarnedIncomeItem.amount
        },
        updateBudgetEarnedIncomeItem(state, budgetEarnedIncomeItem) {
            // recalculate total since we don't know if it's smaller or bigger now
            let totalEarnedIncome = 0
            for (const budget of state.budgets) {
                budget.totalEarnedIncome = 0
                for (const item of budget.earnedIncome) {
                    budget.totalEarnedIncome += Number.parseFloat(item.amount)
                }
                totalEarnedIncome += budget.totalEarnedIncome
            }
            state.totalEarnedIncome = totalEarnedIncome
        },
        removeBudgetEarnedIncomeItem(state, budgetEarnedIncomeItem) {
            const budget = state.budgets.find(budget => budget.budgetId === budgetEarnedIncomeItem.budgetId)
            const position = budget.earnedIncome.indexOf(budgetEarnedIncomeItem)
            budget.earnedIncome.splice(position, 1)
            budget.totalEarnedIncome -= budgetEarnedIncomeItem.amount
            state.totalEarnedIncome -= budgetEarnedIncomeItem.amount
        },
        addBudgetPassiveIncomeItem(state, budgetPassiveIncomeItem) {
            const budget = state.budgets.find(budget => budget.budgetId === budgetPassiveIncomeItem.budgetId)
            budget.passiveIncome.push(budgetPassiveIncomeItem)
            budget.totalPassiveIncome += budgetPassiveIncomeItem.amount
            state.totalPassiveIncome += budgetPassiveIncomeItem.amount
        },
        updateBudgetPassiveIncomeItem(state, budgetPassiveIncomeItem) {
            // recalculate total since we don't know if it's smaller or bigger now
            let totalPassiveIncome = 0
            for (const budget of state.budgets) {
                budget.totalPassiveIncome = 0
                for (const item of budget.passiveIncome) {
                    budget.totalPassiveIncome += Number.parseFloat(item.amount)
                }
                totalPassiveIncome += budget.totalPassiveIncome
            }
            state.totalPassiveIncome = totalPassiveIncome
        },
        removeBudgetPassiveIncomeItem(state, budgetPassiveIncomeItem) {
            const budget = state.budgets.find(budget => budget.budgetId === budgetPassiveIncomeItem.budgetId)
            const position = budget.passiveIncome.indexOf(budgetPassiveIncomeItem)
            budget.passiveIncome.splice(position, 1)
            budget.totalPassiveIncome -= budgetPassiveIncomeItem.amount
            state.totalPassiveIncome -= budgetPassiveIncomeItem.amount
        },
        addBudgetInvestmentItem(state, budgetInvestmentItem) {
            const budget = state.budgets.find(budget => budget.budgetId === budgetInvestmentItem.budgetId)
            budget.investments.push(budgetInvestmentItem)
            budget.totalInvestments += budgetInvestmentItem.amount
            budget.savingsRate = budget.totalEarnedIncome === 0 ? 0 : budget.totalInvestments / budget.totalEarnedIncome
            budget.savingsRatePercent = (budget.savingsRate * 100).toFixed(2) + '%'
            state.totalInvestments += budgetInvestmentItem.amount
            state.averageSavingsRate = ((state.totalEarnedIncome === 0 ? 0 : state.totalInvestments / state.totalEarnedIncome) * 100).toFixed(2) + '%'
        },
        updateBudgetInvestmentItem(state, budgetInvestmentItem) {
            // recalculate total since we don't know if it's smaller or bigger now
            let totalInvestments = 0
            for (const budget of state.budgets) {
                budget.totalInvestments = 0
                for (const item of budget.investments) {
                    budget.totalInvestments += Number.parseFloat(item.amount)
                }
                totalInvestments += budget.totalInvestments
            }
            state.totalInvestments = totalInvestments
        },
        removeBudgetInvestmentItem(state, budgetInvestmentItem) {
            const budget = state.budgets.find(budget => budget.budgetId === budgetInvestmentItem.budgetId)
            const position = budget.investments.indexOf(budgetInvestmentItem)
            budget.investments.splice(position, 1)
            budget.totalInvestments -= budgetInvestmentItem.amount
            state.totalInvestments -= budgetInvestmentItem.amount
        },
        addBudgetExpense(state, budgetExpense) {
            const budget = state.budgets.find(budget => budget.budgetId === budgetExpense.budgetId)
            budget.expenses.push(budgetExpense)
            budget.totalProjectedExpenses += Number.parseFloat(budgetExpense.projected)
        },
        removeBudgetExpense(state, budgetExpense) {
            const budget = state.budgets.find(budget => budget.budgetId === budgetExpense.budgetId)
            const position = budget.expenses.indexOf(budgetExpense)
            budget.expenses.splice(position, 1)
            budget.totalProjectedExpenses -= Number.parseFloat(budgetExpense.projected)
        },
        addBudgetExpenseItem(state, budgetExpenseItem) {
            const budgetId = budgetExpenseItem.budgetExpense.budgetId
            const budgetExpenseId = budgetExpenseItem.budgetExpenseId
            const budget = state.budgets.find(budget => budget.budgetId === budgetId)
            const budgetExpense = budget.expenses.find(budgetExpense => budgetExpense.budgetExpenseId === budgetExpenseId)
            budgetExpense.budgetExpenseItems.push(budgetExpenseItem)
            budget.totalActualExpenses += Number.parseFloat(budgetExpenseItem.amount)
            if (budgetExpense.expense.isMandatory) {
                state.totalActualMandatoryExpenses += budgetExpenseItem.amount
            } else {
                state.totalActualDiscretionaryExpenses += budgetExpenseItem.amount
            }
        },
        updateBudgetExpenseItem(state, budgetExpenseItem) {
            const budgetId = budgetExpenseItem.budgetExpense.budgetId
            const budgetExpenseId = budgetExpenseItem.budgetExpenseId
            const budget = state.budgets.find(budget => budget.budgetId === budgetId)
            const budgetExpense = budget.expenses.find(budgetExpense => budgetExpense.budgetExpenseId === budgetExpenseId)
            const item = budgetExpense.budgetExpenseItems.find(item => item.budgetExpenseItemId === budgetExpenseItem.budgetExpenseItemId)
            item.amount = budgetExpenseItem.amount
            // recalculate all actual expenses
            budget.totalActualExpenses = 0
            for (const item of budgetExpense.budgetExpenseItems) {
                budget.totalActualExpenses += Number.parseFloat(item.amount)
            }
            // TODO update totals for averages
        },
        removeBudgetExpenseItem(state, budgetExpenseItem) {
            const budgetId = budgetExpenseItem.budgetExpense.budgetId
            const budgetExpenseId = budgetExpenseItem.budgetExpenseId
            const budget = state.budgets.find(budget => budget.budgetId === budgetId)
            const budgetExpense = budget.expenses.find(budgetExpense => budgetExpense.budgetExpenseId === budgetExpenseId)
            const position = budgetExpense.budgetExpenseItems.indexOf(budgetExpenseItem)
            budgetExpense.budgetExpenseItems.splice(position, 1)
            budget.totalActualExpenses -= Number.parseFloat(budgetExpenseItem.amount)
            if (budgetExpense.expense.isMandatory) {
                state.totalActualMandatoryExpenses -= budgetExpenseItem.amount
            } else {
                state.totalActualDiscretionaryExpenses -= budgetExpenseItem.amount
            }
        }
    }
})
