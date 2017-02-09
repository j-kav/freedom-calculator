var token

export default {
    getToken: function (email, password) {
        var fetchProps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'grant_type=password&username=' + email + '&password=' + password
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/connect/token', fetchProps).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.error) {
                    reject(data.error_description)
                } else {
                    token = data.access_token
                    resolve()
                }
            }).catch((error) => {
                reject(error)
            })
        });
        return p;
    },
    getUser: function () {
        var fetchProps = {
            headers: { Authorization: 'Bearer ' + token }
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/api/user', fetchProps).then((response) => {
                return response.json()
            }).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
        return p
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
        var fetchProps = {
            headers: { Authorization: 'Bearer ' + token }
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/api/assets', fetchProps).then((response) => {
                return response.json()
            }).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
        return p
    },
    addAsset: function (newAsset) {
        var fetchProps = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
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
                Value: newAsset.value
            })
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/api/assets', fetchProps).then((response) => {
                return response.json()
            }).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error.message) // TODO sanitize error
            })
        })
        return p
    },
    removeAsset: function (id) {
        var fetchProps = {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + token }
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/api/assets/' + id, fetchProps).then((response) => {
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
    },
    updateAsset: function (id, updatedAsset) {
        var fetchProps = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: updatedAsset.name,
                Symbol: updatedAsset.symbol,
                NumShares: updatedAsset.numShares,
                SharePrice: updatedAsset.sharePrice,
                Value: updatedAsset.value
            })
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/api/assets/' + id, fetchProps).then((response) => {
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
    },
    getLiabilities: function () {
        var fetchProps = {
            headers: { Authorization: 'Bearer ' + token }
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/api/liabilities', fetchProps).then((response) => {
                return response.json()
            }).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
        return p
    }
}
