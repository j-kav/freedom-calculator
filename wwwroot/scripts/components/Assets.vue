<template>
    <div>
        <p>Assets</p>
        <div v-if="loading">
            Loading...
        </div>

        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="assets">
            <h2>{{ assets }}</h2>
        </div>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Assets',
        data: function () {
            return {
                loading: true,
                error: null,
                assets: null
            }
        },
        created () {
            this.getAssets()
        },
        methods: {
            getAssets: function () {
                var self = this
                api.getAssets().then((data) => {
                    this.loading = false
                    self.assets = data
                }).catch((error) => {
                    this.loading = false
                    self.error = error
                })
            }
        }
    }
</script>