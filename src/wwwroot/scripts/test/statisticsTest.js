import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import Statistics from '../src/components/Statistics.vue'
import { expect } from 'chai'

describe('Statistics', () => {
    Vue.use(Vuex)

    const mockedStore = {
        state: {
            assets: null,
            liabilities: null,
            expenses: null,
            budgets: null
        },

        mutations: {
            setAssets(state, assets) {
                state.assets = assets
            },
            setLiabilities(state, liabilities) {
                state.liabilities = liabilities
            },
            setExpenses(state, expenses) {
                state.expenses = expenses
            },
            setBudgets(state, budgets) {
                state.budgets = budgets
            }
        }
    }

    it('has a created hook', () => {
        expect(typeof Statistics.created).to.equal('function')
    })

    it('should populate budgets in the store when created', function () {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
            components: {
                'test': Statistics
            }
        }).$mount()
        return vm.$refs.test.getData().then(() => {
            expect(vm.$store.state.budgets.length).to.equal(2)
        }).catch((error) => {
            assert.fail(error)
        })
    })
})