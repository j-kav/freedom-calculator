<template>
    <div>
        <h2>Profile</h2>
        <div v-if="loading">
            Loading...
        </div>

        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="user">
            <p>{{ user.givenName }}</p>
            <p>{{ user.userName }}</p>
        </div>
    </div>
</template>

<script>
import api from '../api'

export default {
    name: 'User',
    data() {
        return {
            loading: true,
            error: null,
            user: null
        }
    },
    created() {
        this.getUser()
    },
    methods: {
        async getUser() {
            try {
                const data = await api.getUser()
                this.loading = false
                this.user = data
            } catch (error) {
                this.loading = false
                this.error = error
            }
        }
    }
}
</script>