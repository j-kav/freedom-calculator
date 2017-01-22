<template>
    <div>
        <form id="loginForm" name="loginForm">
            <h2>Login</h2>
            <fieldset>
                <div>
                    <div>
                        <input v-model="email" type="text" max="100" placeholder="Email address" autofocus="" />
                        <input v-model="password" type="password" max="100" placeholder="Password" />
                    </div>
                </div>
                <p>
                    <button v-on:click.prevent="getToken">Login</button>
                </p>
                <button v-on:click.prevent="createAccount">Register New User</button>

                <button v-on:click.prevent="getUser">Get User</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
    var token

    export default {
        name: 'Login',
        data: function () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            createAccount: function () {
                this.$router.push('/register')
            },
            getToken: function () {
                var fetchProps = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'grant_type=password&username=' + this.email + '&password=' + this.password
                }
                var self = this
                window.fetch('/connect/token', fetchProps).then(function (response) {
                    return response.json()
                }).then(function (data) {
                    window.alert(JSON.stringify(data))
                    token = data.access_token
                    self.$router.push('/')
                }).catch(function (error) {
                    window.alert(error)
                })
            },
            getUser: function () {
                var fetchProps = {
                    headers: { Authorization: 'Bearer ' + token }
                }
                window.fetch('/api/user', fetchProps).then(function (response) {
                    return response.json()
                }).then(function (data) {
                    window.alert(JSON.stringify(data))
                }).catch(function (error) {
                    window.alert(error)
                })
            }
        }
    }
</script>