import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import BudgetEarnedIncomeItems from '../src/components/BudgetEarnedIncomeItems.vue'
import assert from 'assert'
import { expect } from 'chai'

describe('BudgetEarnedIncomeItems', () => {
    Vue.use(Vuex)

    const mockedStore = {
        state: {
            budgets: [{ budgetId: 1, earnedIncome: [] }]
        },
        getters: {
            budgetById: (state) => (id) => {
                return state.budgets.find(budget => id === budget.budgetId)
            }
        },
        mutations: {
            addBudgetEarnedIncomeItem(state, budgetEarnedIncomeItem) {
                const budget = state.budgets.find(budget => budget.budgetId === budgetEarnedIncomeItem.budgetId)
                budget.earnedIncome.push(budgetEarnedIncomeItem)
            }
        }
    }

    it('should add a budgetEarnedIncomeItem to the store when addBudgetEarnedIncomeItem is called', async () => {
        const vm = new Vue({
            store: new Vuex.Store(mockedStore),
            components: {
                'test': BudgetEarnedIncomeItems
            },
            data() {
                return {
                    budget: { budgetId: 1, earnedIncome: [] }
                }
            },
            template: '<div><test ref="test" :budget="budget"></test></div>'
        }).$mount()
        vm.$refs.test.amount = 200
        expect(vm.$store.getters.budgetById(1).earnedIncome.length).to.equal(0)
        try {
            await vm.$refs.test.addAmount()
            expect(vm.$store.getters.budgetById(1).earnedIncome.length).to.equal(1)
            expect(vm.$store.getters.budgetById(1).earnedIncome[0].amount).to.equal(200)
        } catch (error) {
            assert.fail(error)
        }
    })
})
