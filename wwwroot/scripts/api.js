var token

export default {
    getToken: function (email, password) {
        var fetchProps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'grant_type=password&username=' + email + '&password=' + password
        }

        var p = new Promise(function (resolve, reject) {
            window.fetch('/connect/token', fetchProps).then(function (response) {
                return response.json()
            }).then(function (data) {
                if (data.error) {
                    reject(data.error_description)
                } else {
                    token = data.access_token
                    resolve()
                }
            }).catch(function (error) {
                reject(error)
            })
        });

        return p;
    },
    getUser: function () {
        var fetchProps = {
            headers: { Authorization: 'Bearer ' + token }
        }
        var p = new Promise(function (resolve, reject) {
            window.fetch('/api/user', fetchProps).then(function (response) {
                return response.json()
            }).then(function (data) {
                resolve(data)
            }).catch(function (error) {
                reject(error)
            })
        });

        return p;
    }
}
