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
                    <button v-on:click.prevent="login">Login</button>
                </p>
                <button v-on:click.prevent="register">Register New User</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Login',
        data: function () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            register: function () {
                this.$router.push('/register')
            },
            login: function () {
                var self = this
                api.getToken(this.email, this.password).then(function () {
                    self.$store.commit('login')
                    self.$router.push('/statistics')
                }).catch(function (error) {
                    window.alert(error)
                })
            }
        }
    }
</script>