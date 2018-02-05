import { store } from './store'

// check if token is expired and refresh it if necessary
function refreshTokenIfNecessary() {
    if (store.state.authData.expirationDate < new Date().getTime()) {
        return fetchTokens('grant_type=refresh_token&refresh_token=' + store.state.authData.refresh_token + '&scope=openid offline_access')
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
        fetchProps.headers.Authorization = 'Bearer ' + store.state.authData.access_token
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
        fetchProps.headers.Authorization = 'Bearer ' + store.state.authData.access_token
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
    getToken: function (email, password) {
        return fetchTokens('grant_type=password&username=' + email + '&password=' + password + '&scope=openid offline_access')
    },
    getUser: function () {
        return getFetchRequestPromise('/api/user');
    },
    createAccount: function (name, email, password, confirmPassword) {
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
    getAssets: function () {
        return getFetchRequestPromise('/api/assets');
    },
    addAsset: function (newAsset) {
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
    removeAsset: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/assets/' + id, fetchProps);
    },
    updateAsset: function (id, updatedAsset) {
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
        return getFetchRequestPromise('/api/assets/' + id, fetchProps);
    },
    getLiabilities: function () {
        return getFetchRequestPromise('/api/liabilities');
    },
    addLiability: function (newLiability) {
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
    removeLiability: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/liabilities/' + id, fetchProps)
    },
    updateLiability: function (id, updatedLiability) {
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
        return getNonDataFetchRequestPromise('/api/liabilities/' + id, fetchProps)
    },
    getExpenses: function () {
        return getFetchRequestPromise('/api/expenses');
    },
    addExpense: function (newExpense) {
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
    removeExpense: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/expenses/' + id, fetchProps)
    },
    updateExpense: function (id, updatedExpense) {
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
        return getNonDataFetchRequestPromise('/api/expenses/' + id, fetchProps)
    },
    addBudget: function (newBudget) {
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
    getBudgets: function () {
        return getFetchRequestPromise('/api/budgets');
    },
    removeBudget: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgets/' + id, fetchProps)
    },
    updateBudget: function (budget) {
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
    addBudgetEarnedIncomeItem: function (newBudgetEarnedIncomeItem) {
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
    updateEarnedIncomeItem: function (id, updatedBudgetIncomeItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: updatedBudgetIncomeItem.amount
            })
        }
        return getNonDataFetchRequestPromise('/api/budgetearnedincomeitems/' + id, fetchProps)
    },
    removeEarnedIncomeItem: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetearnedincomeitems/' + id, fetchProps)
    },
    addBudgetPassiveIncomeItem: function (newBudgetPassiveIncomeItem) {
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
    updatePassiveIncomeItem: function (id, updatedBudgetIncomeItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: updatedBudgetIncomeItem.amount
            })
        }
        return getNonDataFetchRequestPromise('/api/budgetpassiveincomeitems/' + id, fetchProps)
    },
    removePassiveIncomeItem: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetpassiveincomeitems/' + id, fetchProps)
    },
    addBudgetInvestmentItem: function (newBudgetInvestmentItem) {
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
    updateInvestmentItem: function (id, updatedBudgetInvestmentItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: updatedBudgetInvestmentItem.amount
            })
        }
        return getNonDataFetchRequestPromise('/api/budgetinvestmentitems/' + id, fetchProps)
    },
    removeInvestmentItem: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetinvestmentitems/' + id, fetchProps)
    },
    addBudgetExpense: function (newBudgetExpense) {
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
    updateBudgetExpense: function (id, updatedBudgetExpense) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Projected: updatedBudgetExpense.projected
            })
        }
        return getNonDataFetchRequestPromise('/api/budgetexpenses/' + id, fetchProps)
    },
    removeBudgetExpense: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetexpenses/' + id, fetchProps)
    },
    addBudgetExpenseItem: function (newBudgetExpenseItem) {
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
    updateBudgetExpenseItem: function (id, updatedBudgetExpenseItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: updatedBudgetExpenseItem.amount
            })
        }
        return getNonDataFetchRequestPromise('/api/budgetexpenseitems/' + id, fetchProps)
    },
    removeBudgetExpenseItem: function (id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetexpenseitems/' + id, fetchProps)
    },
    getExpenseAverages: function () {
        return getFetchRequestPromise('/api/expenseaverages');
    }
}
