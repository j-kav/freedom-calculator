<template>
    <div>
        <form id="loginForm" name="loginForm" v-if="showLoginForm">
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
                        <div slot="footer">
                            <span>Please Wait..</span>
                        </div>
                    </modal>
                </p>
                <button v-on:click.prevent="showRegister">Register New User</button>
            </fieldset>
        </form>
        <form id="registerForm" name="registerForm" v-if="showRegisterForm">
            <fieldset>
                <div>
                    <div>
                        <input v-model="name" type="text" max="100" placeholder="Name" autofocus="" />
                        <input v-model="email" type="text" max="100" placeholder="Email address" autofocus="" />
                        <input v-model="password" type="password" max="100" placeholder="Password" />
                        <input v-model="confirmPassword" type="password" max="100" placeholder="Confirm Password" />
                    </div>
                </div>
                <div v-if="error" class="error">
                    {{ error }}
                </div>
                <p>
                    <button v-on:click.prevent="createAccount">Register</button>
                </p>
                <button v-on:click.prevent="showLogin">Back to Login</button>
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
        loading: Loading,
        modal: Modal
    },
    data() {
        return {
            showLoginForm: true,
            showRegisterForm: false,
            email: '',
            password: '',
            loggingIn: false,
            name: '',
            confirmPassword: '',
            error: null
        }
    },
    methods: {
        showRegister() {
            this.showRegisterForm = true
            this.showLoginForm = false
        },
        showLogin() {
            this.showRegisterForm = false
            this.showLoginForm = true
        },
        async login() {
            this.loggingIn = true
            try {
                await api.getToken(this.email, this.password)
                this.$store.commit('login')
                this.$router.push('/statistics')
            } catch (error) {
                this.loggingIn = false
                this.error = error.message
            }
        },
        async createAccount() {
            try {
                await api.createAccount(this.name, this.email, this.password, this.confirmPassword)
                await api.getToken(this.email, this.password)
                this.$store.commit('login')
                this.$router.push('/statistics')
            } catch (error) {
                this.error = error
            }
        }
    }
}
</script>