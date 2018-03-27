import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Budgets from '../src/components/Budgets.vue'
import BudgetDetail from '../src/components/BudgetDetail.vue'
import assert from 'assert'
import { expect } from 'chai'

describe('Budgets', () => {
    Vue.use(Vuex)
    Vue.use(VueRouter)
    const routes = [{ name: 'budget', path: '/budgets/:id', component: BudgetDetail }]
    const router = new VueRouter({ routes })

    const mockedStore = {
        state: {
            budgets: []
        },
        getters: {
            budgetByDate: (state) => (month, year) => {
                return state.budgets.filter(budget => month === budget.month && year === budget.year)
            }
        },
        mutations: {
            addBudget(state, budget) {
                state.budgets.push(budget)
            }
        }
    }

    it('should be named Budgets', () => {
        assert.equal(Budgets.name, 'Budgets')
    })

    it('should have an addBudgets method', () => {
        assert.ok(Budgets.methods.addBudget, 'function')
    })

    it('should add a budget to the store when addBudget is called', () => {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
            router: router,
            components: {
                'test': Budgets
            }
        }).$mount()
        expect(vm.$store.state.budgets.length).to.equal(0)
        return vm.$refs.test.addBudget().then(() => {
            expect(vm.$store.state.budgets.length).to.equal(1)
        }).catch((error) => {
            assert.fail(error)
        })
    })

    it('should fail to duplicate budgets gracefully', () => {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
            router: router,
            components: {
                'test': Budgets
            }
        }).$mount()
        expect(vm.$store.state.budgets.length).to.equal(1)
        return vm.$refs.test.addBudget().then(() => {
            expect(vm.$store.state.budgets.length).to.equal(1)
            expect(vm.$refs.test.error).to.equal('Budget already exists for the current month and year')
        }).catch((error) => {
            assert.fail(error)
        })
    })
})
