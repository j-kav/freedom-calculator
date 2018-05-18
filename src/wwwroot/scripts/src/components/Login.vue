<template>
    <div>
        <form v-if="showLoginForm" id="loginForm" name="loginForm">
            <fieldset>
                <div>
                    <div>
                        <input v-model="email" type="text" max="100" placeholder="Email address" autofocus="">
                        <input v-model="password" type="password" max="100" placeholder="Password">
                    </div>
                </div>
                <div v-if="error" class="error">
                    {{ error }}
                </div>
                <p>
                    <button @click.prevent="login">Login</button>
                    <modal v-if="loggingIn">
                        <h3 slot="header">Logging In</h3>
                        <loading slot="body"/>
                        <div slot="footer">
                            <span>Please Wait..</span>
                        </div>
                    </modal>
                </p>
                <button @click.prevent="showRegister">Register New User</button>
            </fieldset>
        </form>
        <form v-if="showRegisterForm" id="registerForm" name="registerForm">
            <fieldset>
                <div>
                    <div>
                        <input v-model="name" type="text" max="100" placeholder="Name" autofocus="">
                        <input v-model="email" type="text" max="100" placeholder="Email address" autofocus="">
                        <input v-model="password" type="password" max="100" placeholder="Password">
                        <input v-model="confirmPassword" type="password" max="100" placeholder="Confirm Password">
                    </div>
                </div>
                <div v-if="error" class="error">
                    {{ error }}
                </div>
                <p>
                    <button @click.prevent="createAccount">Register</button>
                </p>
                <button @click.prevent="showLogin">Back to Login</button>
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