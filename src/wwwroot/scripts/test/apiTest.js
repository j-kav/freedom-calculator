import api from '../src/api'
import { expect } from 'chai'
import assert from 'assert'
import fetchMock from 'fetch-mock'

// node doesn't have window so just set a global window object to global
global.window = global

describe('api', () => {
    it('should have a getToken() Function', () => {
        expect(typeof api.getToken).to.equal('function')
    })

    it('should have an addBudget() function', () => {
        expect(typeof api.addBudget).to.equal('function')
    })

    describe('getUser', () => {
        it('should get user from the backend', async () => {
            try {
                fetchMock.get('/api/user', { givenName: 'test', userName: 'testUser' })
                const user = await api.getUser()
                expect(user.givenName).to.equal('test')
                expect(user.userName).to.equal('testUser')
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('getAssets', () => {
        it('should get assets from the backend', async () => {
            fetchMock.get('/api/assets', [{ AssetId: 1 }, { AssetId: 2 }])
            try {
                const assets = await api.getAssets()
                expect(assets.length).to.equal(2)
                expect(assets[0].AssetId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('addAsset', () => {
        it('should get the added asset object with an id', async () => {
            const newAsset = { assetId: 1, value: 200 }
            fetchMock.post('/api/assets', { AssetId: 1, Name: 'test', Value: 300 })
            try {
                const addedAsset = await api.addAsset(newAsset)
                expect(addedAsset.AssetId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('updateAsset', () => {
        it('should get the updated asset object', async () => {
            const asset = { AssetId: 1, Name: 'test', Value: 300 }
            fetchMock.put('/api/assets/1', { AssetId: 1, Name: 'test', Value: 300 })
            try {
                const updatedAsset = await api.updateAsset(1, asset)
                expect(updatedAsset.AssetId).to.equal(1)
                expect(updatedAsset.Value).to.equal(300)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('getExpenses', () => {
        it('should get expenses from the backend', async () => {
            fetchMock.get('/api/expenses', [{ ExpenseId: 1 }, { ExpenseId: 2 }])
            try {
                const expenses = await api.getExpenses()
                expect(expenses.length).to.equal(2)
                expect(expenses[0].ExpenseId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('addExpense', () => {
        it('should get the added expense object with an id', async () => {
            const newExpense = { expenseId: 1, name: 'test' }
            fetchMock.post('/api/expenses', { ExpenseId: 1, Name: 'test' })
            try {
                const addedExpense = await api.addExpense(newExpense)
                expect(addedExpense.ExpenseId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('getLiabilities', () => {
        it('should get liabilities from the backend', async () => {
            fetchMock.get('/api/liabilities', [{ LiabilityId: 1 }, { LiabilityId: 2 }])
            try {
                const liabilities = await api.getLiabilities()
                expect(liabilities.length).to.equal(2)
                expect(liabilities[0].LiabilityId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('addLiability', () => {
        it('should get the added liability object with an id', async () => {
            const newLiability = { LiabilityId: 1, name: 'test', principal: 200 }
            fetchMock.post('/api/liabilities', { LiabilityId: 1, Name: 'test', Principal: 300 })
            try {
                const addedLiability = await api.addLiability(newLiability)
                expect(addedLiability.LiabilityId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('addBudget', () => {
        it('should get the added budget object with an id', async () => {
            const now = new Date(Date.now())
            const month = now.getMonth() + 1
            const year = now.getFullYear()
            const newBudget = {
                budgetId: 1,
                month: month,
                year: year
            }
            fetchMock.post('/api/budgets', newBudget)
            try {
                const addedBudget = await api.addBudget(newBudget)
                expect(addedBudget.budgetId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('getBudgets', async () => {
        it('should get budgets from the backend', async () => {
            fetchMock.get('/api/budgets', [{ budgetId: 1 }, { budgetId: 2 }])
            try {
                const budgets = await api.getBudgets()
                expect(budgets.length).to.equal(2)
                expect(budgets[0].budgetId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('addBudgetEarnedIncomeItem', () => {
        it('should get the added budgetEarnedIncome object with an id', async () => {
            const newBudgetEarnedIncomeItem = { budgetId: 1, amount: 200 }
            fetchMock.post('/api/budgetearnedincomeitems', { budgetEarnedIncomeId: 1, budgetId: 1, amount: 200 })
            try {
                const addedBudgetEarnedIncomeItem = await api.addBudgetEarnedIncomeItem(newBudgetEarnedIncomeItem)
                expect(addedBudgetEarnedIncomeItem.budgetEarnedIncomeId).to.equal(1)
            } catch (error) {
                assert.fail(error)
            }
        })
    })

    describe('updateBudget', () => {
        it('should update the budget object with an id', async () => {
            const updatedBudget = { budgetId: 1, netWorth: 200 }
            fetchMock.put('/api/budgets', { budgetId: 1, netWorth: 200 })
            try {
                await api.updateBudget(updatedBudget)
                expect(updatedBudget.netWorth).to.equal(200)
            } catch (error) {
                assert.fail(error)
            }
        })
    })
})
