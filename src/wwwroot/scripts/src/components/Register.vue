<template>
    <div>
        <form id="registerForm" name="registerForm">
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
            </fieldset>
        </form>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Register',
        data: function () {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: null
            }
        },
        methods: {
            createAccount: function () {
                var self = this
                api.createAccount(this.name, this.email, this.password, this.confirmPassword).then(() => {
                    api.getToken(this.email, this.password).then(() => {
                        self.$store.commit('login')
                        self.$router.push('/statistics')
                    }).catch((error) => {
                        self.error = error
                    })
                }).catch((error) => {
                    self.error = error
                })
            }
        }
    }
</script>