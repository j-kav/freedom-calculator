<template>
    <div>
        <p>Budget details</p>
        <div>
            <label>Date</label>
            <span>{{ budget.month }}/{{ budget.year }}</span>
        </div>
        <div>
            <label>Net Earned Income</label>
        </div>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetDetail',
        created() {
            this.budget = this.$store.getters.budgetById(this.$route.params.id)
        },
        data: function () {
            return {
                budget: null
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