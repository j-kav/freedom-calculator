import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import Statistics from '../src/components/Statistics.vue'
import { expect } from 'chai'

describe('Statistics', () => {
    Vue.use(Vuex)

    const mockedStore = {
        state: {
            budgets: []
        },

        mutations: {
            setBudgets(state, budgets) {
                state.budgets = budgets
            }
        }
    }

    it('has a created hook', () => {
        expect(typeof Statistics.created).to.equal('function')
    })

    // TODO fetch-mock stuff
    // it('should populate budgets in the store when created', function () {
    //     const vm = new Vue({
    //         template: '<div><test ref="test"></test></div>',
    //         store: new Vuex.Store(mockedStore),
    //         components: {
    //             'test': Statistics
    //         }
    //     }).$mount()
    //     // TODO expect(vm.$store.state.budgets.length).to.equal(...
    // })
})