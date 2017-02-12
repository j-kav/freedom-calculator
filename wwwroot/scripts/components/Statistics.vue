<template>
    <div>
        <p>Statistics</p>
        <div v-if="loading">
            Loading...
        </div>
        <div v-else>
            <div v-if="error">
                {{ error }}
            </div>
            <div v-else>
                Loaded!
                <p>total assets: {{ totalAssets }}</p>
                <p>total liabilities: {{ totalLiabilities }}</p>
                <p>netWorth: {{ netWorth }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Statistics',
        created() {
            if (!this.$store.state.assets) {
                this.getData()
            }
        },
        data: function () {
            return {
                loading: !this.$store.state.assets,
                error: null
            }
        },
        computed: {
            totalAssets() {
                return this.$store.getters.totalAssets
            },
            totalLiabilities() {
                return this.$store.getters.totalLiabilities
            },
            netWorth() {
                return this.$store.getters.netWorth
            }
        },
        methods: {
            getData: function () {
                var self = this
                api.getAssets().then((data) => {
                    self.$store.commit('setAssets', data)
                }).then(() => {
                    api.getLiabilities().then((data) => {
                        self.$store.commit('setLiabilities', data)
                    })
                }).then(() => {
                    api.getExpenses().then((data) => {
                        self.$store.commit('setExpenses', data)
                        self.loading = false
                    }).catch((error) => {
                        self.loading = false
                        self.error = error
                    })
                })
            }
        }
    }

</script>