import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import Budgets from '../src/components/BudgetEarnedIncomeItems.vue'
import assert from 'assert'
import { expect } from 'chai'

describe('BudgetEarnedIncomeItems', () => {
    Vue.use(Vuex)

    const mockedStore = {
        state: {
            budgets: [ { BudgetId: 1, BudgetEarnedIncomeItems: [] }]
        },
        getters: {
            budgetById: (state) => (id) => {
                return state.budgets.find(budget => id === budget.BudgetId)
            }
        },
        mutations: {
            addBudgetEarnedIncomeItem(state, budgetEarnedIncomeItem) {
                var budget = state.budgets.find(budget => budget.BudgetId === budgetEarnedIncomeItem.BudgetId)
                budget.BudgetEarnedIncomeItems.push(budgetEarnedIncomeItem)
            }
        }
    }

    it('should add a budgetEarnedIncomeItem to the store when addBudgetEarnedIncomeItem is called', function () {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
            components: {
                'test': Budgets
            }
        }).$mount()
        vm.$refs.test.amount = 200
        expect(vm.$store.getters.budgetById(1).BudgetEarnedIncomeItems.length).to.equal(0)
        return vm.$refs.test.addAmount().then(() => {
            expect(vm.$store.getters.budgetById(1).BudgetEarnedIncomeItems.length).to.equal(1)
            expect(vm.$store.getters.budgetById(1).BudgetEarnedIncomeItems[0].Amount).to.equal(200)
        }).catch((error) => {
            assert.fail(error)
        })
    })
})