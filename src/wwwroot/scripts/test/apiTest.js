import api from '../src/api'
import { expect } from 'chai'
import fetchMock from 'fetch-mock'

// node doesn't have window so just set a global window object to global
global.window = global

describe('api', function () {
    it('should have a getToken() Function', function () {
        expect(typeof api.getToken).to.equal('function')
    })

    it('should have an addBudget() function', function () {
        expect(typeof api.addBudget).to.equal('function')
    })

    describe('getAssets', function () {
        it('should get assets from the backend', function () {
            var newBudget = {}
            fetchMock.get('/api/assets', [{ AssetId: 1 }, { AssetId: 2 }])
            return api.getAssets().then((assets) => {
                expect(assets.length).to.equal(2)
                expect(assets[0].AssetId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('getExpenses', function () {
        it('should get expenses from the backend', function () {
            var newBudget = {}
            fetchMock.get('/api/expenses', [{ ExpenseId: 1 }, { ExpenseId: 2 }])
            return api.getExpenses().then((expenses) => {
                expect(expenses.length).to.equal(2)
                expect(expenses[0].ExpenseId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('getLiabilities', function () {
        it('should get liabilities from the backend', function () {
            var newBudget = {}
            fetchMock.get('/api/liabilities', [{ LiabilityId: 1 }, { LiabilityId: 2 }])
            return api.getLiabilities().then((liabilities) => {
                expect(liabilities.length).to.equal(2)
                expect(liabilities[0].LiabilityId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('addBudget', function () {
        it('should get the added budget object with an id', function () {
            var newBudget = {}
            fetchMock.post('/api/budgets', { BudgetId: 1, Month: 4, Year: 2017 })
            return api.addBudget(newBudget).then((addedBudget) => {
                expect(addedBudget.BudgetId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('getBudgets', function () {
        it('should get budgets from the backend', function () {
            var newBudget = {}
            fetchMock.get('/api/budgets', [{ BudgetId: 1 }, { BudgetId: 2 }])
            return api.getBudgets().then((budgets) => {
                expect(budgets.length).to.equal(2)
                expect(budgets[0].BudgetId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })
})