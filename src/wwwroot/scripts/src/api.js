import { store } from './store'

// check if token is expired and refresh it if necessary
async function refreshTokenIfNecessary() {
    if (store.state.authData.expirationDate < new Date().getTime()) {
        return await refreshToken()
    }
}

// create a fetch request with url and props passed and return the data returned
// also add the auth header
async function execFetchRequest(url, fetchProps) {
    await refreshTokenIfNecessary()
    fetchProps = fetchProps || {}
    fetchProps.headers = fetchProps.headers || {}
    fetchProps.headers.Authorization = `Bearer ${store.state.authData.access_token}`
    const response = await window.fetch(url, fetchProps)
    let data = null
    if (!response.ok) {
        throw new Error(response.statusText) // TODO sanitize error
    }
    data = await response.json()
    store.state.authData.lastActivityDate = new Date().getTime()
    return data
}

// create a fetch request with url and props passed and return the response returned
// also add the auth header
async function execNonDataFetchRequest(url, fetchProps) {
    await refreshTokenIfNecessary()
    fetchProps = fetchProps || {}
    fetchProps.headers = fetchProps.headers || {}
    fetchProps.headers.Authorization = `Bearer ${store.state.authData.access_token}`
    const response = await window.fetch(url, fetchProps)
    if (!response.ok) {
        throw new Error(response.statusText) // TODO sanitize error
    }
    store.state.authData.lastActivityDate = new Date().getTime()
    return response
}

async function fetchToken(fetchBody) {
    const fetchProps = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: fetchBody
    }
    const response = await window.fetch('/api/authenticate', fetchProps)
    const data = await response.json()
    saveToken(data)
}

async function refreshToken() {
    const fetchProps = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${store.state.authData.access_token}` }
    }
    const response = await window.fetch('/api/refreshToken', fetchProps)
    const data = await response.json()
    saveToken(data)
}

const saveToken = (data) => {
    if (data.error) {
        throw new Error(data.error_description)
    } else {
        const now = new Date().getTime()
        let parsedToken = parseJwt(data)
        const expiresInMilliseconds = parsedToken.exp * 1000
        store.state.authData = { lastActivityDate: now, access_token: data, expirationDate: expiresInMilliseconds }
    }
}

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export default {
    async getToken(email, password) {
        return await fetchToken(`{"Username":"${email}","Password":"${password}"}`)
    },
    async extendSession() {
        return await refreshToken()
    },
    async getUser() {
        return await execFetchRequest('/api/user')
    },
    async createAccount(name, email, password, confirmPassword) {
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
        const response = await window.fetch('/api/account', fetchProps)
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response
    },
    async getAssets() {
        return await execFetchRequest('/api/assets')
    },
    async addAsset(newAsset) {
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
                SharePrice: Number(newAsset.sharePrice),
                Value: Number(newAsset.value),
                LiabilityId: newAsset.liabilityId
            })
        }
        return await execFetchRequest('/api/assets', fetchProps)
    },
    async removeAsset(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/assets/${id}`, fetchProps)
    },
    async updateAsset(id, updatedAsset) {
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
                SharePrice: Number(updatedAsset.sharePrice),
                Value: Number(updatedAsset.value),
                LiabilityId: updatedAsset.liabilityId
            })
        }
        return await execFetchRequest(`/api/assets/${id}`, fetchProps)
    },
    async getLiabilities() {
        return await execFetchRequest('/api/liabilities')
    },
    async addLiability(newLiability) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: newLiability.name,
                Principal: Number(newLiability.principal)
            })
        }
        return await execFetchRequest('/api/liabilities', fetchProps)
    },
    async removeLiability(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/liabilities/${id}`, fetchProps)
    },
    async updateLiability(id, updatedLiability) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: updatedLiability.name,
                Principal: Number(updatedLiability.principal)
            })
        }
        return await execNonDataFetchRequest(`/api/liabilities/${id}`, fetchProps)
    },
    async getExpenses() {
        return await execFetchRequest('/api/expenses')
    },
    async addExpense(newExpense) {
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
        return await execFetchRequest('/api/expenses', fetchProps)
    },
    async removeExpense(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/expenses/${id}`, fetchProps)
    },
    async updateExpense(id, updatedExpense) {
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
        return await execNonDataFetchRequest(`/api/expenses/${id}`, fetchProps)
    },
    async addBudget(newBudget) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Month: newBudget.month,
                Year: newBudget.year
            })
        }
        return await execFetchRequest('/api/budgets', fetchProps)
    },
    async getBudgets() {
        return await execFetchRequest('/api/budgets')
    },
    async removeBudget(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/budgets/${id}`, fetchProps)
    },
    async updateBudget(budget) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: budget.budgetId,
                ProjectedEarnedIncome: Number(budget.projectedEarnedIncome),
                NetWorth: Number(budget.netWorth)
            })
        }
        return await execNonDataFetchRequest('/api/budgets', fetchProps)
    },
    async addBudgetEarnedIncomeItem(newBudgetEarnedIncomeItem) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: newBudgetEarnedIncomeItem.BudgetId,
                Timestamp: newBudgetEarnedIncomeItem.Timestamp,
                Amount: Number(newBudgetEarnedIncomeItem.Amount)
            })
        }
        return await execFetchRequest('/api/budgetearnedincomeitems', fetchProps)
    },
    async updateEarnedIncomeItem(id, updatedBudgetIncomeItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: Number(updatedBudgetIncomeItem.amount)
            })
        }
        return await execFetchRequest(`/api/budgetearnedincomeitems/${id}`, fetchProps)
    },
    async removeEarnedIncomeItem(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/budgetearnedincomeitems/${id}`, fetchProps)
    },
    async addBudgetPassiveIncomeItem(newBudgetPassiveIncomeItem) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: newBudgetPassiveIncomeItem.BudgetId,
                Timestamp: newBudgetPassiveIncomeItem.Timestamp,
                Amount: Number(newBudgetPassiveIncomeItem.Amount)
            })
        }
        return await execFetchRequest('/api/budgetpassiveincomeitems', fetchProps)
    },
    async updatePassiveIncomeItem(id, updatedBudgetIncomeItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: Number(updatedBudgetIncomeItem.amount)
            })
        }
        return await execNonDataFetchRequest(`/api/budgetpassiveincomeitems/${id}`, fetchProps)
    },
    async removePassiveIncomeItem(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/budgetpassiveincomeitems/${id}`, fetchProps)
    },
    async addBudgetInvestmentItem(newBudgetInvestmentItem) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: newBudgetInvestmentItem.BudgetId,
                Timestamp: newBudgetInvestmentItem.Timestamp,
                Amount: Number(newBudgetInvestmentItem.Amount)
            })
        }
        return await execFetchRequest('/api/budgetinvestmentitems', fetchProps)
    },
    async updateInvestmentItem(id, updatedBudgetInvestmentItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: Number(updatedBudgetInvestmentItem.amount)
            })
        }
        return await execNonDataFetchRequest(`/api/budgetinvestmentitems/${id}`, fetchProps)
    },
    async removeInvestmentItem(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/budgetinvestmentitems/${id}`, fetchProps)
    },
    async addBudgetExpense(newBudgetExpense) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetId: newBudgetExpense.BudgetId,
                ExpenseId: newBudgetExpense.ExpenseId,
                Projected: Number(newBudgetExpense.Projected)
            })
        }
        return await execFetchRequest('/api/budgetexpenses', fetchProps)
    },
    async updateBudgetExpense(id, updatedBudgetExpense) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Projected: Number(updatedBudgetExpense.projected)
            })
        }
        return await execNonDataFetchRequest(`/api/budgetexpenses/${id}`, fetchProps)
    },
    async removeBudgetExpense(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/budgetexpenses/${id}`, fetchProps)
    },
    async addBudgetExpenseItem(newBudgetExpenseItem) {
        const fetchProps = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BudgetExpenseId: newBudgetExpenseItem.BudgetExpenseId,
                Amount: Number(newBudgetExpenseItem.Amount),
                Timestamp: newBudgetExpenseItem.Timestamp
            })
        }
        return await execFetchRequest('/api/budgetexpenseitems', fetchProps)
    },
    async updateBudgetExpenseItem(id, updatedBudgetExpenseItem) {
        const fetchProps = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Amount: Number(updatedBudgetExpenseItem.amount)
            })
        }
        return await execNonDataFetchRequest(`/api/budgetexpenseitems/${id}`, fetchProps)
    },
    async removeBudgetExpenseItem(id) {
        const fetchProps = {
            method: 'DELETE'
        }
        return await execNonDataFetchRequest(`/api/budgetexpenseitems/${id}`, fetchProps)
    },
    async getExpenseAverages() {
        return await execFetchRequest('/api/expenseaverages')
    }
}
