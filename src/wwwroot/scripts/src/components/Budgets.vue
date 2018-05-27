<template>
    <div>
        <div class="horizontal-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Projected Net Earned Income</th>
                        <th>Net Earned Income</th>
                        <th>Passive Income</th>
                        <th>Total Income</th>
                        <th>Expenses</th>
                        <th>Income Surplus/Deficit</th>
                        <th>Investments</th>
                        <th>Savings Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <budget v-for="budget in $store.state.budgets" :key="budget.budgetId" :budget-model="budget"/>
                </tbody>
            </table>
        </div>
        <br>
        <button @click.prevent="addBudget">Add New</button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script>
import api from '../api'
import Budget from './Budget.vue'

export default {
    name: 'Budgets',
    components: {
        budget: Budget
    },
    data() {
        return {
            error: null
        }
    },
    methods: {
        async addBudget() {
            const now = new Date(Date.now())
            const month = now.getMonth() + 1
            const year = now.getFullYear()
            const newBudget = {
                month: month,
                year: year
            }
            try {
                if (this.$store.getters.budgetByDate(month, year).length !== 0) {
                    this.error = 'Budget already exists for the current month and year'
                } else {
                    const addedBudget = await api.addBudget(newBudget)
                    this.$store.commit('addBudget', addedBudget)
                }
            } catch (error) {
                this.error = error.message
            }
        }
    }
}
</script>