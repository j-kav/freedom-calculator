<template>
    <div>
        <h2>Budget details - {{ budget.month }}/{{ budget.year }}</h2>
        <div>
            <label>Projected Net Earned Income</label>
            <div class="field align-right">
                <input type="number" v-model="budget.projectedEarnedIncome" v-on:change.prevent=updateBudget()></input>
            </div>
            <span v-if="message" v-bind:class="messageClass">{{ message }}</span>
        </div>
        <div>
            <label>Net Earned Income</label>
            <div class="field align-right">
                <span class="link" @click="showEarnedIncomeItems=true">{{ utils.usdFormatter.format(budget.totalEarnedIncome) }}</span>
            </div>
            <modal v-if="showEarnedIncomeItems" @close="showEarnedIncomeItems=false">
                <h3 slot="header">Earned Income Items</h3>
                <budgetEarnedIncomeItems slot="body" v-if="showEarnedIncomeItems" v-bind:budget="budget" @close="showEarnedIncomeItems=false"></budgetEarnedIncomeItems>
            </modal>
        </div>
        <div>
            <label>Net Passive Income</label>
            <div class="field align-right">
                <span class="link" @click="showPassiveIncomeItems=true">{{ utils.usdFormatter.format(budget.totalPassiveIncome) }}</span>
            </div>
            <modal v-if="showPassiveIncomeItems" @close="showPassiveIncomeItems=false">
                <h3 slot="header">Passive Income Items</h3>
                <budgetPassiveIncomeItems slot="body" v-if="showPassiveIncomeItems" v-bind:budget="budget" @close="showPassiveIncomeItems=false"></budgetPassiveIncomeItems>
            </modal>
        </div>
        <div>
            <label>Total Income</label>
            <div class="field align-right">
                <span>{{ utils.usdFormatter.format(totalIncome) }}</span>
            </div>
        </div>
        <div>
            <label>Expenses</label>
            <div class="field align-right">
                <span class="link" @click="showExpenses=true">{{ utils.usdFormatter.format(budget.totalActualExpenses) + ' / ' + utils.usdFormatter.format(budget.totalProjectedExpenses) }}</span>
            </div>
            <modal v-if="showExpenses" @close="showExpenses=false">
                <h3 slot="header">Expenses</h3>
                <budgetExpenses slot="body" v-if="showExpenses" v-bind:budget="budget" @close="showExpenses=false"></budgetExpenses>
            </modal>
        </div>
        <div>
            <label>Income Surplus/Deficit</label>
            <div class="field align-right">
                <span v-bind:class="surplusDeficitClass">{{ utils.usdFormatter.format(surplusDeficit) }}</span>
            </div>
        </div>
        <div>
            <label>Investments/Savings</label>
            <div class="field align-right">
                <span class="link" @click="showInvestmentItems=true">{{ utils.usdFormatter.format(budget.totalInvestments) }}</span>
            </div>
            <modal v-if="showInvestmentItems" @close="showInvestmentItems=false">
                <h3 slot="header">Investment Items</h3>
                <budgetInvestmentItems slot="body" v-if="showInvestmentItems" v-bind:budget="budget" @close="showInvestmentItems=false"></budgetInvestmentItems>
            </modal>
        </div>
        <div>
            <label>Savings Rate</label>
            <div class="field align-right">
                <span>{{ budget.savingsRatePercent }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import BudgetEarnedIncomeItems from './BudgetEarnedIncomeItems.vue'
    import BudgetPassiveIncomeItems from './BudgetPassiveIncomeItems.vue'
    import BudgetInvestmentItems from './BudgetInvestmentItems.vue'
    import BudgetExpenses from './BudgetExpenses.vue'
    import Modal from './Modal.vue'
    import utils from '../utils'

    export default {
        name: 'BudgetDetail',
        components: {
            'budgetEarnedIncomeItems': BudgetEarnedIncomeItems,
            'budgetPassiveIncomeItems': BudgetPassiveIncomeItems,
            'budgetInvestmentItems': BudgetInvestmentItems,
            'budgetExpenses': BudgetExpenses,
            'modal': Modal
        },
        created() {
            this.budget = this.$store.getters.budgetById(this.$route.params.id)
        },
        data() {
            return {
                budget: null,
                showEarnedIncomeItems: false,
                showPassiveIncomeItems: false,
                showInvestmentItems: false,
                showExpenses: false,
                utils: utils,
                error: false,
                message: null
            }
        },
        computed: {
            messageClass() {
                return {
                    'error': this.error,
                    'success': !this.error
                }
            },
            totalIncome() {
                return this.budget.totalEarnedIncome + this.budget.totalPassiveIncome
            },
            surplusDeficit() {
                return this.totalIncome - this.budget.totalActualExpenses
            },
            surplusDeficitClass() {
                return {
                    'error': this.surplusDeficit < 0,
                    'success': this.surplusDeficit >= 0
                }
            }
        },
        methods: {
            updateBudget() {
                this.budget.netWorth = this.$store.getters.netWorth
                api.updateBudget(this.budget).then(() => {
                    this.$store.commit('updateBudget', this.budget)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            }
        }
    }

</script>

<style scoped>
    input[type="number"] {
        width: 100px;
    }
</style>