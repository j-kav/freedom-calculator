<template>
    <div>
        <p>Budget details</p>
        <div>
            <label>Date</label>
            <span>{{ budget.month }}/{{ budget.year }}</span>
        </div>
        <div>
            <label>Net Earned Income</label>
            <button @click="showEarnedIncomeItems=true">Amount</button>
            <budgetEarnedIncomeItems v-if="showEarnedIncomeItems" v-bind:budget="budget" @close="showEarnedIncomeItems=false"></budgetEarnedIncomeItems>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import BudgetEarnedIncomeItems from './BudgetEarnedIncomeItems.vue'

    export default {
        name: 'BudgetDetail',
        components: {
            'budgetEarnedIncomeItems': BudgetEarnedIncomeItems
        },
        created() {
            this.budget = this.$store.getters.budgetById(this.$route.params.id)
        },
        data: function () {
            return {
                budget: null,
                showEarnedIncomeItems: false
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