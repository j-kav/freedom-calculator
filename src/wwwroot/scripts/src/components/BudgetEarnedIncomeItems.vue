<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <budgetEarnedIncomeItem v-for="item in parentBudget.earnedIncome" :key="item.budgetEarnedIncomeItemId" :budget-earned-income-item-model="item"/>
            </tbody>
        </table>
        <div>Add new</div>
        <div>
            <label>Amount</label>
            <input v-model="amount" type="text">
            <button @click.prevent=addAmount>Submit</button>
        </div>
    </div>
</template>

<script>
import api from '../api'
import BudgetEarnedIncomeItem from './BudgetEarnedIncomeItem.vue'

export default {
    name: 'BudgetEarnedIncomeItems',
    components: {
        budgetEarnedIncomeItem: BudgetEarnedIncomeItem
    },
    data() {
        return {
            amount: null,
            parentBudget: this.budget,
            error: null
        }
    },
    props: ['budget'],
    methods: {
        async addAmount() {
            try {
                const newBudgetEarnedIncomeItem = {
                    BudgetId: this.parentBudget.budgetId,
                    Amount: this.amount,
                    Timestamp: new Date(Date.now())
                }
                const addedBudgetEarnedIncomeItem = await api.addBudgetEarnedIncomeItem(newBudgetEarnedIncomeItem)
                this.$store.commit('addBudgetEarnedIncomeItem', addedBudgetEarnedIncomeItem)
                this.amount = null
            } catch (error) {
                this.error = 'error'
            }
        }
    }
}
</script>