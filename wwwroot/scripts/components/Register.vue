<template>
    <div>
        <form id="registerForm" name="registerForm">
            <h2>Register</h2>
            <fieldset>
                <div>
                    <div>
                        <input v-model="name" type="text" max="100" placeholder="Name" autofocus="" />
                        <input v-model="email" type="text" max="100" placeholder="Email address" autofocus="" />
                        <input v-model="password" type="password" max="100" placeholder="Password" />
                        <input v-model="confirmPassword" type="password" max="100" placeholder="Confirm Password" />
                    </div>
                </div>
                <p>
                    <button v-on:click.prevent="createAccount">Register</button>
                </p>
            </fieldset>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data: function () {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        },
        methods: {
            createAccount: function () {
                var fetchProps = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ GivenName: this.name, Email: this.email, Password: this.password, ConfirmPassword: this.confirmPassword })
                }
                window.fetch('/api/account', fetchProps).then(function (response) {
                    if (response.ok) {
                        window.alert('ok')
                    } else {
                        window.alert('not ok')
                    }
                    window.alert(JSON.stringify(response))
                }).catch(function (error) {
                    window.alert(error)
                })
            }
        }
    }
</script>