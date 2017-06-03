<template>
    <div>
        <p>Budget details</p>
        <div>
            <label>Date</label>
            <span>{{ budget.month }}/{{ budget.year }}</span>
        </div>
        <div>
            <label>Net Earned Income</label>
            <span class="link" @click="showEarnedIncomeItems=true">{{ earnedIncome }}</span>
            <modal v-if="showEarnedIncomeItems" @close="showEarnedIncomeItems=false">
                <h3 slot="header">Earned Income Items</h3>
                <budgetEarnedIncomeItems slot="body" v-if="showEarnedIncomeItems" v-bind:budget="budget" @close="showEarnedIncomeItems=false"></budgetEarnedIncomeItems>
            </modal>
        </div>
        <div>
            <label>Net Passive Income</label>
            <span class="link" @click="showPassiveIncomeItems=true">{{ passiveIncome }}</span>
            <modal v-if="showPassiveIncomeItems" @close="showPassiveIncomeItems=false">
                <h3 slot="header">Passive Income Items</h3>
                <budgetPassiveIncomeItems slot="body" v-if="showPassiveIncomeItems" v-bind:budget="budget" @close="showPassiveIncomeItems=false"></budgetPassiveIncomeItems>
            </modal>
        </div>
        <div>
            <label>Investments</label>
            <span class="link" @click="showInvestmentItems=true">{{ investments }}</span>
            <modal v-if="showInvestmentItems" @close="showInvestmentItems=false">
                <h3 slot="header">Investment Items</h3>
                <budgetInvestmentItems slot="body" v-if="showInvestmentItems" v-bind:budget="budget" @close="showInvestmentItems=false"></budgetInvestmentItems>
            </modal>
        </div>
        <div>
            <label>Expenses</label>
            <span class="link" @click="showExpenses=true">{{ expenses }}</span>
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
                showExpenses: false
            }
        },
        computed: {
            earnedIncome() {
                let earnedInc = 0
                for (const item of this.budget.earnedIncome) {
                    earnedInc += Number.parseFloat(item.amount)
                }
                return earnedInc
            },
            passiveIncome() {
                let passiveInc = 0
                for (const item of this.budget.passiveIncome) {
                    passiveInc += Number.parseFloat(item.amount)
                }
                return passiveInc
            },
            investments() {
                let investments = 0
                for (const item of this.budget.investments) {
                    investments += Number.parseFloat(item.amount)
                }
                return investments
            },
            expenses() {
                // get the actual and projected expenses for the budget
                let expenses = 0
                let expenseItems = 0
                for (const item of this.budget.expenses) {
                    expenses += Number.parseFloat(item.projected)
                    for (const expenseItem of item.budgetExpenseItems) {
                        expenseItems += Number.parseFloat(expenseItem.amount)
                    }
                }
                return expenseItems + ' / ' + expenses
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