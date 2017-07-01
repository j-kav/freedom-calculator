<template>
    <div>
        <h2>Budget details - {{ budget.month }}/{{ budget.year }}</h2>
        <div>
            <label>Net Earned Income</label>
            <div class="field align-right">
                <span class="link" @click="showEarnedIncomeItems=true">{{ utils.usdFormmater.format(budget.totalEarnedIncome) }}</span>
            </div>
            <modal v-if="showEarnedIncomeItems" @close="showEarnedIncomeItems=false">
                <h3 slot="header">Earned Income Items</h3>
                <budgetEarnedIncomeItems slot="body" v-if="showEarnedIncomeItems" v-bind:budget="budget" @close="showEarnedIncomeItems=false"></budgetEarnedIncomeItems>
            </modal>
        </div>
        <div>
            <label>Net Passive Income</label>
            <div class="field align-right">
                <span class="link" @click="showPassiveIncomeItems=true">{{ utils.usdFormmater.format(budget.totalPassiveIncome) }}</span>
            </div>
            <modal v-if="showPassiveIncomeItems" @close="showPassiveIncomeItems=false">
                <h3 slot="header">Passive Income Items</h3>
                <budgetPassiveIncomeItems slot="body" v-if="showPassiveIncomeItems" v-bind:budget="budget" @close="showPassiveIncomeItems=false"></budgetPassiveIncomeItems>
            </modal>
        </div>
        <div>
            <label>Investments</label>
            <div class="field align-right">
                <span class="link" @click="showInvestmentItems=true">{{ utils.usdFormmater.format(budget.totalInvestments) }}</span>
            </div>
            <modal v-if="showInvestmentItems" @close="showInvestmentItems=false">
                <h3 slot="header">Investment Items</h3>
                <budgetInvestmentItems slot="body" v-if="showInvestmentItems" v-bind:budget="budget" @close="showInvestmentItems=false"></budgetInvestmentItems>
            </modal>
        </div>
        <div>
            <label>Expenses</label>
            <div class="field align-right">
                <span class="link" @click="showExpenses=true">{{ utils.usdFormmater.format(budget.totalActualExpenses) + ' / ' + utils.usdFormmater.format(budget.totalProjectedExpenses) }}</span>
            </div>
            <modal v-if="showExpenses" @close="showExpenses=false">
                <h3 slot="header">Expenses</h3>
                <budgetExpenses slot="body" v-if="showExpenses" v-bind:budget="budget" @close="showExpenses=false"></budgetExpenses>
            </modal>
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
        data: function () {
            return {
                budget: null,
                showEarnedIncomeItems: false,
                showPassiveIncomeItems: false,
                showInvestmentItems: false,
                showExpenses: false,
                utils: utils
            }
        },
        methods: {
            updateBudget: function () {
                api.updateBudget(this.budget.budgetId, this.budget).then(() => {
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