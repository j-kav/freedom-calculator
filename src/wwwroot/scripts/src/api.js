var accessToken
var accessTokenExpirationDate

// create a fetch request with url and props passed and return a promise with the data returned
// also add the auth header
function getFetchRequestPromise(url, fetchProps) {
    var nowTime = new Date().getTime()
    window.alert('now: ' + nowTime + ' expiration date: ' + accessTokenExpirationDate + 'diff: ' + (accessTokenExpirationDate - nowTime))
    fetchProps = fetchProps || {}
    fetchProps.headers = fetchProps.headers || {}
    fetchProps.headers.Authorization = 'Bearer ' + accessToken
    var p = new Promise((resolve, reject) => {
        window.fetch(url, fetchProps).then((response) => {
            return response.json()
        }).then((data) => {
            resolve(data)
        }).catch((error) => {
            reject(error.message) // TODO sanitize error
        })
    })
    return p
}

// create a fetch request with url and props passed and return a promise with the response returned
// also add the auth header
function getNonDataFetchRequestPromise(url, fetchProps) {
    fetchProps = fetchProps || {}
    fetchProps.headers = fetchProps.headers || {}
    fetchProps.headers.Authorization = 'Bearer ' + accessToken
    var p = new Promise((resolve, reject) => {
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
    return p
}

export default {
    getToken: function (email, password) {
        var fetchProps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'grant_type=password&username=' + email + '&password=' + password + '&scope=openid offline_access'
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/connect/token', fetchProps).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.error) {
                    reject(data.error_description)
                } else {
                    accessToken = data.access_token
                    accessTokenExpirationDate = new Date().getTime() + data.expires_in
                    resolve()
                }
            }).catch((error) => {
                reject(error)
            })
        });
        return p;
    },
    getUser: function () {
        return getFetchRequestPromise('/api/user');
    },
    createAccount: function (name, email, password, confirmPassword) {
        var fetchProps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                GivenName: name,
                Email: email,
                Password: password,
                ConfirmPassword: confirmPassword
            })
        }
        var p = new Promise((resolve, reject) => {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/assets/' + id, fetchProps);
    },
    updateAsset: function (id, updatedAsset) {
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/liabilities/' + id, fetchProps)
    },
    updateLiability: function (id, updatedLiability) {
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/expenses/' + id, fetchProps)
    },
    updateExpense: function (id, updatedExpense) {
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgets/' + id, fetchProps)
    },
    updateBudget: function (budget) {
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetearnedincomeitems/' + id, fetchProps)
    },
    addBudgetPassiveIncomeItem: function (newBudgetPassiveIncomeItem) {
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetpassiveincomeitems/' + id, fetchProps)
    },
    addBudgetInvestmentItem: function (newBudgetInvestmentItem) {
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetinvestmentitems/' + id, fetchProps)
    },
    addBudgetExpense: function (newBudgetExpense) {
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetexpenses/' + id, fetchProps)
    },
    addBudgetExpenseItem: function (newBudgetExpenseItem) {
        var fetchProps = {
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
        var fetchProps = {
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
        var fetchProps = {
            method: 'DELETE'
        }
        return getNonDataFetchRequestPromise('/api/budgetexpenseitems/' + id, fetchProps)
    },
    getExpenseAverages: function () {
        return getFetchRequestPromise('/api/expenseaverages');
    }
}
