<template>
    <div>
        <div v-if="loading">
            Loading...
        </div>

        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="user">
            <h2>{{ user.givenName }}</h2>
            <p>{{ user.userName }}</p>
        </div>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Login',
        data: function () {
            return {
                loading: true,
                error: null,
                user: null
            }
        },
        created () {
            this.getUser()
        },
        methods: {
            getUser: function () {
                var self = this
                api.getUser().then((data) => {
                    this.loading = false
                    self.user = data
                }).catch((error) => {
                    this.loading = false
                    self.error = error
                })
            }
        }
    }
</script>