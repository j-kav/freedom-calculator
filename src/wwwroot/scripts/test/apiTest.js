import api from '../src/api'
import assert from 'assert'
import fetchMock from 'fetch-mock'

// node doesn't have window so just set a global window object to global
global.window = global

describe('api', function () {
    it('should have a getToken() Function', function () {
        assert.ok(typeof api.getToken == 'function', 'getToken function not found')
    })

    it('should have an addBudget() function', function () {
        assert.ok(typeof api.addBudget == 'function', 'addBudget function not found')
    })

    describe('addBudget', function () {
        it('should get the added budget object with an id', function () {
            var newBudget = {}
            fetchMock.post('/api/budgets', { BudgetId: 1 })
            return api.addBudget(newBudget).then((addedBudget) => {
                assert.ok(addedBudget.BudgetId === 1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })
})