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
            <budgetEarnedIncomeItems v-if="showEarnedIncomeItems" v-bind:budget="budget" @close="showEarnedIncomeItems=false"></budgetEarnedIncomeItems>
        </div>
        <div>
            <label>Net Passive Income</label>
            <span class="link" @click="showPassiveIncomeItems=true">{{ passiveIncome }}</span>
            <budgetPassiveIncomeItems v-if="showPassiveIncomeItems" v-bind:budget="budget" @close="showPassiveIncomeItems=false"></budgetPassiveIncomeItems>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import BudgetEarnedIncomeItems from './BudgetEarnedIncomeItems.vue'
    import BudgetPassiveIncomeItems from './BudgetPassiveIncomeItems.vue'

    export default {
        name: 'BudgetDetail',
        components: {
            'budgetEarnedIncomeItems': BudgetEarnedIncomeItems,
            'budgetPassiveIncomeItems': BudgetPassiveIncomeItems
        },
        created() {
            this.budget = this.$store.getters.budgetById(this.$route.params.id)
        },
        data: function () {
            return {
                budget: null,
                showEarnedIncomeItems: false,
                showPassiveIncomeItems: false
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

<style scoped>
    span.link {
        text-decoration: underline;
        cursor: pointer;
    }
</style>