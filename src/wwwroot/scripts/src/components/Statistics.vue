<template>
    <div>
        <h2>Statistics</h2>
        <div v-if="loading">
            Loading...
        </div>
        <div v-else>
            <div v-if="error">
                {{ error }}
            </div>
            <div v-else>
                Loaded!
                <h3>Averages</h3>
                <table>
                    <tr>
                        <th>Net Earned Income</th>
                        <th>Passive Income</th>
                        <th>Total Income</th>
                        <th>Mandatory Expenses</th>
                        <th>Discretionary Expenses</th>
                        <th>Total Expenses</th>
                        <th>Investments</th>
                    </tr>
                    <tr>
                        <td class="align-right">{{ utils.usdFormmater.format(this.$store.getters.averageEarnedIncome) }}</td>
                        <td class="align-right">{{ utils.usdFormmater.format(this.$store.getters.averagePassiveIncome) }}</td>
                        <td class="align-right">{{ utils.usdFormmater.format(this.$store.getters.averageEarnedIncome + this.$store.getters.averagePassiveIncome) }}</td>
                        <td class="align-right"></td>
                        <td class="align-right"></td>
                        <td class="align-right"></td>
                        <td class="align-right">{{ utils.usdFormmater.format(this.$store.getters.averageInvestments) }}</td>
                    </tr>
                </table>
                <h3>Emergency Fund Recommendation</h3>
                <table>
                    <tr>
                        <th>Total cash saved</th>
                        <th>6 months of mandatory expenses</th>
                        <th>Surplus/Deficit</th>
                    </tr>
                    <tr>
                        <td class="align-right">{{ utils.usdFormmater.format(this.$store.getters.totalCash) }}</td>
                        <td class="align-right"></td>
                        <td class="align-right"></td>
                    </tr>
                </table>
                <h3>Net Worth</h3>
                <table>
                    <tr>
                        <th>Total Assets</th>
                        <th>Total Liabilities</th>
                        <th>Net Worth</th>
                    </tr>
                    <tr>
                        <td class="align-right">{{ totalAssets }}</td>
                        <td class="align-right">{{ totalLiabilities }}</td>
                        <td class="align-right">
                            <span class="link" @click="showNetWorth=true">{{ netWorth }}</span>
                            <modal v-if="showNetWorth" @close="showNetWorth=false">
                                <h3 slot="header">Net Worth</h3>
                                <!--TODO show graph of historical net worth. For now just show list-->
                                <ul slot="body">
                                    <li v-for="budget in $store.state.budgets">{{ budget.year }} - {{ budget.month }} : {{ budget.netWorth }}</li>
                                </ul>
                            </modal>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"><router-link v-if="$store.state.isLoggedIn && $store.state.assets" to="/assetbreakdown">Asset Breakdown</router-link></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import utils from '../utils'
    import Modal from './Modal.vue'

    export default {
        name: 'Statistics',
        components: {
            'modal': Modal
        },
        created() {
            if (!this.$store.state.assets) {
                this.getData()
            }
        },
        data: function () {
            return {
                loading: !this.$store.state.assets,
                error: null,
                showNetWorth: false,
                utils: utils
            }
        },
        computed: {
            totalAssets() {
                return utils.usdFormmater.format(this.$store.getters.totalAssets)
            },
            totalLiabilities() {
                return utils.usdFormmater.format(this.$store.getters.totalLiabilities)
            },
            netWorth() {
                return utils.usdFormmater.format(this.$store.getters.netWorth)
            }
        },
        methods: {
            getData: function () {
                // get all data needed sequentially, and set "show it" when done.
                var self = this
                var p = new Promise((resolve, reject) => {
                    api.getLiabilities().then((data) => {
                        self.$store.commit('setLiabilities', data)
                    }).then(() => {
                        return api.getAssets().then((data) => {
                            self.$store.commit('setAssets', data)
                        })
                    }).then(() => {
                        return api.getExpenses().then((data) => {
                            self.$store.commit('setExpenses', data)
                        })
                    }).then(() => {
                        return api.getBudgets().then((data) => {
                            self.$store.commit('setBudgets', data)
                        })
                    }).then(() => {
                        const now = new Date(Date.now())
                        const month = now.getMonth() + 1
                        const year = now.getFullYear()
                        const budgets = this.$store.getters.budgetByDate(month, year)
                        if (budgets.length >= 1) {
                            const id = budgets[0].budgetId
                            return api.updateBudget(id, this.$store.getters.netWorth).then(() => {
                                self.loading = false
                                resolve()
                            })
                        } else {
                            var p = new Promise((resolve, reject) => {
                                self.loading = false
                                resolve()
                            })
                            return p.then(() => { resolve() })
                        }
                    }).catch((error) => {
                        self.loading = false
                        self.error = error
                        reject()
                    })
                })
                return p // return promise for unit testing purposes
            }
        }
    }

</script>