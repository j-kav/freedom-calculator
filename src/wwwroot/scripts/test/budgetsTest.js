import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import Budgets from '../src/components/Budgets.vue'
import assert from 'assert'
import { expect } from 'chai'

describe('Budgets', () => {
    Vue.use(Vuex)

    const mockedStore = {
        state: {
            budgets: []
        },

        mutations: {
            addBudget(state, budget) {
                state.budgets.push(budget)
            }
        }
    }

    it('should be named Budgets', function () {
        assert.equal(Budgets.name, 'Budgets')
    })

    it('should have an addBudgets method', function () {
        assert.ok(Budgets.methods.addBudget, 'function')
    })

    it('should add a budget to the store when addBudget is called', function () {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
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
})