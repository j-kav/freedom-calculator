import Vue from 'vue'
import Vuex from 'vuex'
import Budgets from '../src/components/Budgets.vue'

Vue.use(Vuex)

const mockedStore = {
    state: {
        budgets: []
    },

    mutations: {
        addBudget(state, budget) {
            state.budgets.push(budget)
        },
    }
}

describe('Budgets.vue', () => {
    it('should add a budget to the store when addBudget is called', function () {
       // TODO
    })
})