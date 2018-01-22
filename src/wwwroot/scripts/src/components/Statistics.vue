<template>
    <div>
        <h2>Statistics</h2>
        <div v-if="loading">
            <modal>
                <h3 slot="header">Loading</h3>
                <loading slot="body"></loading>
                <div slot="footer">
                    <span>Please Wait..</span>
                </div>
            </modal>
        </div>
        <div v-else>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <div v-else>
                <table>
                    <tr>
                        <td>
                            <h3 class="table-header">Net Worth</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Total Assets</th>
                                        <th>Total Liabilities</th>
                                        <th>Net Worth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="align-right">{{ totalAssets }}</td>
                                        <td class="align-right">{{ totalLiabilities }}</td>
                                        <td class="align-right">
                                            <span class="link" @click="showNetWorth=true">{{ netWorth }}</span>
                                            <modal v-if="showNetWorth" @close="showNetWorth=false">
                                                <h3 slot="header">Net Worth</h3>
                                                <netWorthChart slot="body"></netWorthChart>
                                            </modal>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                            <span class="link" @click="showAssetBreakdown=true">Asset Breakdown</span>
                            <modal v-if="showAssetBreakdown" @close="showAssetBreakdown=false">
                                <h3 slot="header">Asset Breakdown</h3>
                                <assetBreakdown slot="body"></assetBreakdown>
                            </modal>
                        </td>
                        <td>
                            <canvas id="netWorthBarChart"></canvas>
                        </td>
                    </tr>
                </table>
                <br />
                <h3>Averages</h3>
                <table id="stats-table">
                    <tr>
                        <th>Net Earned Income</th>
                        <th>Passive Income</th>
                        <th>Total Income</th>
                        <th>Investments</th>
                        <th>Savings Rate</th>
                    </tr>
                    <tr>
                        <td class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averageEarnedIncome) }}</td>
                        <td class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averagePassiveIncome) }}</td>
                        <td class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averageEarnedIncome + this.$store.getters.averagePassiveIncome)}}</td>
                        <td class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averageInvestments) }}</td>
                        <td class="align-right">{{ this.$store.state.averageSavingsRate }}</td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Mandatory Expenses</th>
                        <th>Discretionary Expenses</th>
                        <th>Total Expenses</th>
                    </tr>
                    <tr>
                        <td class="align-right">
                            <span class="link" @click="showAverageMandatoryExpenses=true">{{ utils.usdFormatter.format(this.$store.getters.averageMandatoryExpenses) }}</span>
                            <modal v-if="showAverageMandatoryExpenses" @close="showAverageMandatoryExpenses=false">
                                <h3 slot="header">Average Mandatory Expenses</h3>
                                <expenseAverages slot="body" v-bind:mandatory="true" v-if="showAverageMandatoryExpenses" @close="showAverageMandatoryExpenses=false"></expenseAverages>
                            </modal>
                        </td>
                        <td class="align-right">
                            <span class="link" @click="showAverageDiscretionaryExpenses=true">{{ utils.usdFormatter.format(this.$store.getters.averageDiscretionaryExpenses) }}</span>
                            <modal v-if="showAverageDiscretionaryExpenses" @close="showAverageDiscretionaryExpenses=false">
                                <h3 slot="header">Average Discretionary Expenses</h3>
                                <expenseAverages slot="body" v-bind:mandatory="false" v-if="showAverageDiscretionaryExpenses" @close="showAverageDiscretionaryExpenses=false"></expenseAverages>
                            </modal>
                        </td>
                        <td class="align-right">
                            {{ utils.usdFormatter.format(this.$store.getters.averageMandatoryExpenses + this.$store.getters.averageDiscretionaryExpenses)}}
                        </td>
                    </tr>
                </table>
                <br/>
                <h3>Emergency Fund Recommendation</h3>
                <table>
                    <tr>
                        <th>Total cash saved</th>
                        <th>6 months of mandatory expenses</th>
                        <th>Surplus/Deficit</th>
                    </tr>
                    <tr>
                        <td class="align-right">{{ utils.usdFormatter.format(this.$store.getters.totalCash) }}</td>
                        <td class="align-right">{{ utils.usdFormatter.format(sixMonthsExpenses) }}</td>
                        <td class="align-right">{{ utils.usdFormatter.format(surplusDeficit) }}</td>
                    </tr>
                </table>
                <br/>
                <table>
                    <tr>
                        <td>
                            <h3 class="table-header">Freedom Date Estimate</h3>
                            <table>
                                <tr>
                                    <td valign="top">
                                        <table>
                                            <tr>
                                                <td>Amount needed for financial independence</td>
                                                <td class="align-right">{{ utils.usdFormatter.format(amountNeededForFinancialIndependence) }}</td>
                                            </tr>
                                            <tr>
                                                <td>Time Until Financial Independence</td>
                                                <td class="fi-estimate">{{ timeUntilFinancialIndependence }}&nbsp;years</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <canvas id="independenceEstimatePieChart"></canvas>
                        </td>
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
    import ExpenseAverages from './ExpenseAverages.vue'
    import Loading from './Loading.vue'
    import Chart from 'chart.js'
    import NetWorthChart from './NetWorthChart.vue'
    import AssetBreakdown from './AssetBreakdown.vue'

    export default {
        name: 'Statistics',
        components: {
            'modal': Modal,
            'loading': Loading,
            'expenseAverages': ExpenseAverages,
            'netWorthChart': NetWorthChart,
            'assetBreakdown': AssetBreakdown
        },
        created() {
            // if there are no assets in the store, get all the data and then create charts
            if (!this.$store.state.assets) {
                this.getData().then(() => {
                    this.createNetWorthBarChart()
                    this.createIndependenceEstimatePieChart()
                })
            }
        },
        mounted() {
            // if there is already data in the store, just create charts from it
            if (this.$store.state.assets) {
                this.createNetWorthBarChart()
                this.createIndependenceEstimatePieChart()
            }
        },
        data: function () {
            return {
                loading: !this.$store.state.assets,
                error: null,
                showAssetBreakdown: false,
                showNetWorth: false,
                showAverageMandatoryExpenses: false,
                showAverageDiscretionaryExpenses: false,
                utils: utils
            }
        },
        computed: {
            totalAssets() {
                return utils.usdFormatter.format(this.$store.getters.totalAssets)
            },
            totalLiabilities() {
                return utils.usdFormatter.format(this.$store.getters.totalLiabilities)
            },
            netWorth() {
                return utils.usdFormatter.format(this.$store.getters.netWorth)
            },
            sixMonthsExpenses() {
                return this.$store.getters.averageMandatoryExpenses * 6
            },
            surplusDeficit() {
                return this.$store.getters.totalCash - this.sixMonthsExpenses
            },
            amountNeededForFinancialIndependence() {
                return utils.calculateAmountToCoverExpenses(this.$store.getters.averageMandatoryExpenses)
            },
            timeUntilFinancialIndependence() {
                return utils.compoundInterestTime(this.amountNeededForFinancialIndependence, this.$store.getters.netWorth, 12)
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
                            var budget = budgets[0]
                            budget.netWorth = this.$store.getters.netWorth
                            return api.updateBudget(budget).then(() => {
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
                return p
            },
            createNetWorthBarChart: function () {
                const netWorthBarChartContext = document.getElementById('netWorthBarChart')
                new Chart(netWorthBarChartContext, {
                    type: 'bar',
                    data: {
                        labels: ['Assets', 'Liabilities', 'Net Worth'],
                        datasets: [{
                            data: [this.$store.getters.totalAssets, this.$store.getters.totalLiabilities, this.$store.getters.netWorth],
                            backgroundColor: [
                                'rgba(0, 255, 0, 0.2)',
                                'rgba(255, 0, 0, 0.2)',
                                'rgba(0, 0, 255, 0.2)'
                            ]
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    callback: function (label, index, labels) {
                                        return utils.usdFormatter.format(label)
                                    }
                                }
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    return utils.usdFormatter.format(tooltipItem.yLabel)
                                }
                            }
                        }
                    }
                })
            },
            createIndependenceEstimatePieChart: function () {
                const independenceEstimatePieChartContext = document.getElementById('independenceEstimatePieChart')
                const amountRemaining = Math.max(this.amountNeededForFinancialIndependence - this.$store.getters.netWorth, 0)
                new Chart(independenceEstimatePieChartContext, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: [this.$store.getters.netWorth, amountRemaining],
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.2)',
                                'rgba(0, 255, 0, 0.2)'
                            ]
                        }],
                        labels: ['Amount Saved', 'Amount Remaining']
                    },
                    options: {
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    const amount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                                    return utils.usdFormatter.format(amount)
                                }
                            }
                        }
                    }
                })
            }
        }
    }

</script>

<style>
    .fi-estimate {
        font-weight: bold;
    }

    h3.table-header {
        margin-top: 0;
    }
</style>