import { store } from './store'

// check if token is expired and refresh it if necessary
function refreshTokenIfNecessary() {
    if (store.state.authData.expirationDate < new Date().getTime()) {
        return fetchTokens(`grant_type=refresh_token&refresh_token=${store.state.authData.refresh_token}&scope=openid offline_access`)
    } else {
        return Promise.resolve()
    }
}

// create a fetch request with url and props passed and return a promise with the data returned
// also add the auth header
function getFetchRequestPromise(url, fetchProps) {
    return refreshTokenIfNecessary().then(() => {
        fetchProps = fetchProps || {}
        fetchProps.headers = fetchProps.headers || {}
        fetchProps.headers.Authorization = `Bearer ${store.state.authData.access_token}`
        const p = new Promise((resolve, reject) => {
            window.fetch(url, fetchProps).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject(response.statusText) // TODO sanitize error
                }
            }).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error.message) // TODO sanitize error
            })
        })
        store.state.authData.lastActivityDate = new Date().getTime()
        return p
    })
}

// create a fetch request with url and props passed and return a promise with the response returned
// also add the auth header
function getNonDataFetchRequestPromise(url, fetchProps) {
    return refreshTokenIfNecessary().then(() => {
        fetchProps = fetchProps || {}
        fetchProps.headers = fetchProps.headers || {}
        fetchProps.headers.Authorization = `Bearer ${store.state.authData.access_token}`
        const p = new Promise((resolve, reject) => {
            window.fetch(url, fetchProps).then((response) => {
                if (response.ok) {
                    resolve(response)
                } else {
                    reject(response.statusText) // TODO sanitize error
                }
            }).catch((error) => {
                reject(error)
            })
        })
        store.state.authData.lastActivityDate = new Date().getTime()
        return p
    })
}

function fetchTokens(fetchBody) {
    const fetchProps = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: fetchBody
    }
    const p = new Promise((resolve, reject) => {
        window.fetch('/connect/token', fetchProps).then((response) => {
            return response.json()
        }).then((data) => {
            if (data.error) {
                reject(data.error_description)
            } else {
                // reuse previous refresh token if a new one isn't issued
                if (store.state.authData.refresh_token && !data.refresh_token) {
                    data.refresh_token = store.state.authData.refresh_token
                }
                const now = new Date().getTime()
                data.lastActivityDate = now
                const expiresInMilliseconds = data.expires_in * 1000
                data.expirationDate = new Date(now + expiresInMilliseconds).getTime()
                store.state.authData = data
                resolve()
            }
        }).catch((error) => {
            reject(error)
        })
    });
    return p;
}

export default {
    getToken(email, password) {
        return fetchTokens(`grant_type=password&username=${email}&password=${password}&scope=openid offline_access`)
    },
    getUser() {
        return getFetchRequestPromise('/api/user');
    },
    createAccount(name, email, password, confirmPassword) {
        const fetchProps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                GivenName: name,
                Email: email,
                Password: password,
                ConfirmPassword: confirmPassword
            })
        }
        const p = new Promise((resolve, reject) => {
            window.fetch('/api/account', fetchProps).then((response) => {
                if (response.ok) {
                    resolve(response)
                } else {
                    reject()
                }
            }).catch((error) => {
                reject(error)
            })
        })
        return p
    },
    getAssets() {
        return getFetchRequestPromise('/api/assets');
    },
    addAsset(newAsset) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                AssetType: newAsset.assetType,
                Name: newAsset.name,
                Symbol: newAsset.symbol,
                Address: newAsset.address,
                City: newAsset.city,
                State: newAsset.state,
                Zip: newAsset.zip,
                NumShares: newAsset.numShares,
                SharePrice: newAsset.sharePrice,
                Value: newAsset.value,
                LiabilityId: newAsset.liabilityId
            })
        }
        return getFetchRequestPromise('/api/assets', fetchProps);
    },
    removeAsset(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/assets/${id}`, fetchProps);
    },
    updateAsset(id, updatedAsset) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                AssetType: updatedAsset.assetType,
                Name: updatedAsset.name,
                Symbol: updatedAsset.symbol,
                NumShares: updatedAsset.numShares,
                SharePrice: updatedAsset.sharePrice,
                Value: updatedAsset.value,
                LiabilityId: updatedAsset.liabilityId
            })
        }
        return getFetchRequestPromise(`/api/assets/${id}`, fetchProps);
    },
    getLiabilities() {
        return getFetchRequestPromise('/api/liabilities');
    },
    addLiability(newLiability) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: newLiability.name,
                Principal: newLiability.principal
            })
        }
        return getFetchRequestPromise('/api/liabilities', fetchProps);
    },
    removeLiability(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/liabilities/${id}`, fetchProps)
    },
    updateLiability(id, updatedLiability) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: updatedLiability.name,
                Principal: updatedLiability.principal
            })
        }
        return getNonDataFetchRequestPromise(`/api/liabilities/${id}`, fetchProps)
    },
    getExpenses() {
        return getFetchRequestPromise('/api/expenses');
    },
    addExpense(newExpense) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: newExpense.name,
                IsMandatory: newExpense.isMandatory
            })
        }
        return getFetchRequestPromise('/api/expenses', fetchProps);
    },
    removeExpense(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/expenses/${id}`, fetchProps)
    },
    updateExpense(id, updatedExpense) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: updatedExpense.name,
                IsMandatory: updatedExpense.isMandatory
            })
        }
        return getNonDataFetchRequestPromise('/api/expenses/'  id, fetchProps)
    },
    addBudget(newBudget) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Month: newBudget.Month,
                Year: newBudget.Year
            })
        }
        return getFetchRequestPromise('/api/budgets', fetchProps);
    },
    getBudgets() {
        return getFetchRequestPromise('/api/budgets');
    },
    removeBudget(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/budgets/${id}`, fetchProps)
    },
    updateBudget(budget) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: budget.budgetId,
                ProjectedEarnedIncome: budget.projectedEarnedIncome,
                NetWorth: budget.netWorth
            })
        }
        return getNonDataFetchRequestPromise('/api/budgets', fetchProps);
    },
    addBudgetEarnedIncomeItem(newBudgetEarnedIncomeItem) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: newBudgetEarnedIncomeItem.BudgetId,
                Timestamp: newBudgetEarnedIncomeItem.Timestamp,
                Amount: newBudgetEarnedIncomeItem.Amount
            })
        }
        return getFetchRequestPromise('/api/budgetearnedincomeitems', fetchProps);
    },
    updateEarnedIncomeItem(id, updatedBudgetIncomeItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: updatedBudgetIncomeItem.amount
            })
        }
        return getNonDataFetchRequestPromise(`/api/budgetearnedincomeitems/${id}`, fetchProps)
    },
    removeEarnedIncomeItem(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/budgetearnedincomeitems/${id}`, fetchProps)
    },
    addBudgetPassiveIncomeItem(newBudgetPassiveIncomeItem) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: newBudgetPassiveIncomeItem.BudgetId,
                Timestamp: newBudgetPassiveIncomeItem.Timestamp,
                Amount: newBudgetPassiveIncomeItem.Amount
            })
        }
        return getFetchRequestPromise('/api/budgetpassiveincomeitems', fetchProps);
    },
    updatePassiveIncomeItem(id, updatedBudgetIncomeItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: updatedBudgetIncomeItem.amount
            })
        }
        return getNonDataFetchRequestPromise(`/api/budgetpassiveincomeitems/${id}`, fetchProps)
    },
    removePassiveIncomeItem(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/budgetpassiveincomeitems/${id}`, fetchProps)
    },
    addBudgetInvestmentItem(newBudgetInvestmentItem) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: newBudgetInvestmentItem.BudgetId,
                Timestamp: newBudgetInvestmentItem.Timestamp,
                Amount: newBudgetInvestmentItem.Amount
            })
        }
        return getFetchRequestPromise('/api/budgetinvestmentitems', fetchProps);
    },
    updateInvestmentItem(id, updatedBudgetInvestmentItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: updatedBudgetInvestmentItem.amount
            })
        }
        return getNonDataFetchRequestPromise(`/api/budgetinvestmentitems/${id}`, fetchProps)
    },
    removeInvestmentItem(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/budgetinvestmentitems/${id}`, fetchProps)
    },
    addBudgetExpense(newBudgetExpense) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: newBudgetExpense.BudgetId,
                ExpenseId: newBudgetExpense.ExpenseId,
                Projected: newBudgetExpense.Projected
            })
        }
        return getFetchRequestPromise('/api/budgetexpenses', fetchProps);
    },
    updateBudgetExpense(id, updatedBudgetExpense) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Projected: updatedBudgetExpense.projected
            })
        }
        return getNonDataFetchRequestPromise(`/api/budgetexpenses/${id}`, fetchProps)
    },
    removeBudgetExpense(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/budgetexpenses/${id}`, fetchProps)
    },
    addBudgetExpenseItem(newBudgetExpenseItem) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetExpenseId: newBudgetExpenseItem.BudgetExpenseId,
                Amount: newBudgetExpenseItem.Amount,
                Timestamp: newBudgetExpenseItem.Timestamp
            })
        }
        return getFetchRequestPromise('/api/budgetexpenseitems', fetchProps);
    },
    updateBudgetExpenseItem(id, updatedBudgetExpenseItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: updatedBudgetExpenseItem.amount
            })
        }
        return getNonDataFetchRequestPromise(`/api/budgetexpenseitems/${id}`, fetchProps)
    },
    removeBudgetExpenseItem(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise(`/api/budgetexpenseitems/${id}`, fetchProps)
    },
    getExpenseAverages() {
        return getFetchRequestPromise('/api/expenseaverages');
    }
}
