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
        it('should get user from the backend', () => {
            const newBudget = {}
            fetchMock.get('/api/user', { givenName: 'test', userName: 'testUser' })
            return api.getUser().then((user) => {
                expect(user.givenName).to.equal('test')
                expect(user.userName).to.equal('testUser')
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('getAssets', () => {
        it('should get assets from the backend', () => {
            const newBudget = {}
            fetchMock.get('/api/assets', [{ AssetId: 1 }, { AssetId: 2 }])
            return api.getAssets().then((assets) => {
                expect(assets.length).to.equal(2)
                expect(assets[0].AssetId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('addAsset', () => {
        it('should get the added asset object with an id', () => {
            const newAsset = { assetId: 1, value: 200 }
            fetchMock.post('/api/assets', { AssetId: 1, Name: 'test', Value: 300 })
            return api.addAsset(newAsset).then((addedAsset) => {
                expect(addedAsset.AssetId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('updateAsset', () => {
        it('should get the updated asset object', () => {
            const asset = { AssetId: 1, Name: 'test', Value: 300 }
            fetchMock.put('/api/assets/1', { AssetId: 1, Name: 'test', Value: 300 })
            return api.updateAsset(1, asset).then((updatedAsset) => {
                expect(updatedAsset.AssetId).to.equal(1)
                expect(updatedAsset.Value).to.equal(300)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('getExpenses', () => {
        it('should get expenses from the backend', () => {
            const newBudget = {}
            fetchMock.get('/api/expenses', [{ ExpenseId: 1 }, { ExpenseId: 2 }])
            return api.getExpenses().then((expenses) => {
                expect(expenses.length).to.equal(2)
                expect(expenses[0].ExpenseId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('addExpense', () => {
        it('should get the added expense object with an id', () => {
            const newExpense = { expenseId: 1, name: 'test' }
            fetchMock.post('/api/expenses', { ExpenseId: 1, Name: 'test' })
            return api.addExpense(newExpense).then((addedExpense) => {
                expect(addedExpense.ExpenseId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('getLiabilities', () => {
        it('should get liabilities from the backend', () => {
            const newBudget = {}
            fetchMock.get('/api/liabilities', [{ LiabilityId: 1 }, { LiabilityId: 2 }])
            return api.getLiabilities().then((liabilities) => {
                expect(liabilities.length).to.equal(2)
                expect(liabilities[0].LiabilityId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('addLiability', () => {
        it('should get the added liability object with an id', () => {
            const newLiability = { LiabilityId: 1, name: 'test', principal: 200 }
            fetchMock.post('/api/liabilities', { LiabilityId: 1, Name: 'test', Principal: 300 })
            return api.addLiability(newLiability).then((addedLiability) => {
                expect(addedLiability.LiabilityId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('addBudget', () => {
        it('should get the added budget object with an id', () => {
            const now = new Date(Date.now())
            const month = now.getMonth() + 1
            const year = now.getFullYear()
            const newBudget = {
                BudgetId: 1,
                Month: month,
                Year: year
            }
            fetchMock.post('/api/budgets', newBudget)
            return api.addBudget(newBudget).then((addedBudget) => {
                expect(addedBudget.BudgetId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('getBudgets', () => {
        it('should get budgets from the backend', () => {
            const newBudget = {}
            fetchMock.get('/api/budgets', [{ BudgetId: 1 }, { BudgetId: 2 }])
            return api.getBudgets().then((budgets) => {
                expect(budgets.length).to.equal(2)
                expect(budgets[0].BudgetId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('addBudgetEarnedIncomeItem', () => {
        it('should get the added budgetEarnedIncome object with an id', () => {
            const newBudgetEarnedIncomeItem = { budgetId: 1, amount: 200 }
            fetchMock.post('/api/budgetearnedincomeitems', { budgetEarnedIncomeId: 1, budgetId: 1, amount: 200 })
            return api.addBudgetEarnedIncomeItem(newBudgetEarnedIncomeItem).then((addedBudgetEarnedIncomeItem) => {
                expect(addedBudgetEarnedIncomeItem.budgetEarnedIncomeId).to.equal(1)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })

    describe('updateBudget', () => {
        it('should update the budget object with an id', () => {
            const updatedBudget = { budgetId: 1, netWorth: 200 }
            fetchMock.put('/api/budgets', { budgetId: 1, netWorth: 200 })
            return api.updateBudget(updatedBudget).then(() => {
                expect(updatedBudget.netWorth).to.equal(200)
            }).catch((error) => {
                assert.fail(error)
            })
        })
    })
})