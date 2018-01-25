<template>
    <div>
        <form id="loginForm" name="loginForm">
            <fieldset>
                <div>
                    <div>
                        <input v-model="email" type="text" max="100" placeholder="Email address" autofocus="" />
                        <input v-model="password" type="password" max="100" placeholder="Password" />
                    </div>
                </div>
                <div v-if="error" class="error">
                    {{ error }}
                </div>
                <p>
                    <button v-on:click.prevent="login">Login</button>
                    <modal v-if="loggingIn">
                        <h3 slot="header">Logging In</h3>
                        <loading slot="body"></loading>
                        <div slot="footer"><span>Please Wait..</span></div>
                    </modal>
                </p>
                <button v-on:click.prevent="register">Register New User</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import api from '../api'
    import Loading from './Loading.vue'
    import Modal from './Modal.vue'

    export default {
        name: 'Login',
        components: {
            'loading': Loading,
            'modal': Modal
        },
        data: function () {
            return {
                email: '',
                password: '',
                loggingIn: false,
                error: null
            }
        },
        methods: {
            register: function () {
                this.$router.push('/register')
            },
            login: function () {
                this.loggingIn = true
                var self = this
                api.getToken(this.email, this.password).then(() => {
                    self.$store.commit('login')
                    self.$router.push('/statistics')
                }).catch(function (error) {
                    self.loggingIn = false
                    self.error = error
                })
            }
        }
    }

</script>