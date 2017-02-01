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
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        var p = new Promise((resolve, reject) => {
            window.fetch('/api/assets/' + id, fetchProps).then((response) => {
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
    }
}
