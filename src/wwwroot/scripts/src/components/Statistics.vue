<template>
    <div>
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
                <div class="grid-2-container">
                    <div>
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
                    </div>
                    <div>
                        <canvas id="netWorthBarChart"></canvas>
                    </div>
                </div>
                <br />
                <h3>Averages</h3>
                <div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Net Earned Income</div>
                        <div class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averageEarnedIncome) }}</div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Passive Income</div>
                        <div class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averagePassiveIncome) }}</div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Total Income</div>
                        <div class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averageEarnedIncome + this.$store.getters.averagePassiveIncome) }}
                        </div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Investments</div>
                        <div class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averageInvestments) }}</div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Savings Rate</div>
                        <div class="align-right">{{ this.$store.state.averageSavingsRate }}</div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Mandatory Expenses</div>
                        <div class="align-right">
                            <span class="link" @click="showAverageMandatoryExpenses=true">{{ utils.usdFormatter.format(this.$store.getters.averageMandatoryExpenses) }}</span>
                            <modal v-if="showAverageMandatoryExpenses" @close="showAverageMandatoryExpenses=false">
                                <h3 slot="header">Average Mandatory Expenses</h3>
                                <expenseAverages slot="body" :mandatory="true" v-if="showAverageMandatoryExpenses" @close="showAverageMandatoryExpenses=false"></expenseAverages>
                            </modal>
                        </div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Discretionary Expenses</div>
                        <div class="align-right">
                            <span class="link" @click="showAverageDiscretionaryExpenses=true">{{ utils.usdFormatter.format(this.$store.getters.averageDiscretionaryExpenses) }}</span>
                            <modal v-if="showAverageDiscretionaryExpenses" @close="showAverageDiscretionaryExpenses=false">
                                <h3 slot="header">Average Discretionary Expenses</h3>
                                <expenseAverages slot="body" :mandatory="false" v-if="showAverageDiscretionaryExpenses" @close="showAverageDiscretionaryExpenses=false"></expenseAverages>
                            </modal>
                        </div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Total Expenses</div>
                        <div class="align-right">{{ utils.usdFormatter.format(this.$store.getters.averageMandatoryExpenses + this.$store.getters.averageDiscretionaryExpenses)}}</div>
                    </div>
                </div>
                <br/>
                <h3>Emergency Fund Recommendation</h3>
                <div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Total cash saved</div>
                        <div class="align-right">{{ utils.usdFormatter.format(this.$store.getters.totalCash) }}</div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">6 months of expenses</div>
                        <div class="align-right">{{ utils.usdFormatter.format(sixMonthsExpenses) }}</div>
                    </div>
                    <div class="content-width-container">
                        <div class="content-width-container-header">Surplus/Deficit</div>
                        <div class="align-right">{{ utils.usdFormatter.format(surplusDeficit) }}</div>
                    </div>
                </div>
                <br/>
                <div class="grid-2-container">
                    <div>
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
                    </div>
                    <div>
                        <canvas id="independenceEstimatePieChart"></canvas>
                    </div>
                </div>
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
        modal: Modal,
        loading: Loading,
        expenseAverages: ExpenseAverages,
        netWorthChart: NetWorthChart,
        assetBreakdown: AssetBreakdown
    },
    async created() {
        // if there are no assets in the store, get all the data and then create charts
        if (!this.$store.state.assets) {
            try {
                await this.getData()
                this.createNetWorthBarChart()
                this.createIndependenceEstimatePieChart()
                this.loading = false
            } catch (error) {
                this.loading = false
                this.error = error
            }
        }
    },
    mounted() {
        // if there is already data in the store, just create charts from it
        if (this.$store.state.assets) {
            this.createNetWorthBarChart()
            this.createIndependenceEstimatePieChart()
        }
    },
    data() {
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
            return utils.compoundInterestTime(
                this.amountNeededForFinancialIndependence,
                this.$store.getters.netWorth,
                12
            )
        }
    },
    methods: {
        async getData() {
            // get all data needed concurrently, and set in store as it is received.
            const promises = []
            promises.push(
                api.getAssets().then(data => {
                    this.$store.commit('setAssets', data)
                })
            )
            promises.push(
                api.getLiabilities().then(data => {
                    this.$store.commit('setLiabilities', data)
                })
            )
            promises.push(
                api.getExpenses().then(data => {
                    this.$store.commit('setExpenses', data)
                })
            )
            promises.push(
                api.getBudgets().then(data => {
                    this.$store.commit('setBudgets', data)
                })
            )

            await Promise.all(promises)
            const now = new Date(Date.now())
            const month = now.getMonth() + 1
            const year = now.getFullYear()
            const budgets = this.$store.getters.budgetByDate(month, year)
            if (budgets && budgets.length >= 1) {
                const budget = budgets[0]
                budget.netWorth = this.$store.getters.netWorth
                await api.updateBudget(budget)
            }
        },
        createNetWorthBarChart() {
            const netWorthBarChartContext = document.getElementById('netWorthBarChart')
            if (!netWorthBarChartContext) {
                return
            }
            new Chart(netWorthBarChartContext, {
                type: 'bar',
                data: {
                    labels: ['Assets', 'Liabilities', 'Net Worth'],
                    datasets: [
                        {
                            data: [
                                this.$store.getters.totalAssets,
                                this.$store.getters.totalLiabilities,
                                this.$store.getters.netWorth
                            ],
                            backgroundColor: ['rgba(0, 255, 0, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(0, 0, 255, 0.2)']
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    callback(label, index, labels) {
                                        return utils.usdFormatter.format(label)
                                    }
                                }
                            }
                        ]
                    },
                    tooltips: {
                        callbacks: {
                            label(tooltipItem, data) {
                                return utils.usdFormatter.format(tooltipItem.yLabel)
                            }
                        }
                    }
                }
            })
        },
        createIndependenceEstimatePieChart() {
            const independenceEstimatePieChartContext = document.getElementById('independenceEstimatePieChart')
            if (!independenceEstimatePieChartContext) {
                return
            }
            const amountRemaining = Math.max(
                this.amountNeededForFinancialIndependence - this.$store.getters.netWorth,
                0
            )
            new Chart(independenceEstimatePieChartContext, {
                type: 'pie',
                data: {
                    datasets: [
                        {
                            data: [this.$store.getters.netWorth, amountRemaining],
                            backgroundColor: ['rgba(0, 0, 255, 0.2)', 'rgba(0, 255, 0, 0.2)']
                        }
                    ],
                    labels: ['Amount Saved', 'Amount Remaining']
                },
                options: {
                    tooltips: {
                        callbacks: {
                            label(tooltipItem, data) {
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

<style scoped=true>
table {
    width: 100%;
}

.fi-estimate {
    font-weight: bold;
}

h3.table-header {
    margin-top: 0;
}

.grid-2-container {
    display: grid;
    grid-gap: 1em;
    margin: 1em;
}

canvas {
    align-self: center;
}

@media screen and (min-width: 680px) {
    .grid-2-container {
        align-items: center;
        grid-template-columns: 1fr 1fr;
        margin: 0;
    }
}
</style>