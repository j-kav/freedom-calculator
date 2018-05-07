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
                <budgetPassiveIncomeItem v-for="item in parentBudget.passiveIncome" :key="item.budgetPassiveIncomeItemId" :budget-passive-income-item-model="item"/>
            </tbody>
        </table>
        <div>Add new</div>
        <div>
            <label>Amount</label>
            <input v-model="amount" type="text">
            <button @click.prevent="addAmount">Submit</button>
        </div>
    </div>
</template>

<script>
import api from '../api'
import BudgetPassiveIncomeItem from './BudgetPassiveIncomeItem.vue'

export default {
    name: 'BudgetPassiveIncomeItems',
    components: {
        budgetPassiveIncomeItem: BudgetPassiveIncomeItem
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
                const newBudgetPassiveIncomeItem = {
                    BudgetId: this.parentBudget.budgetId,
                    Amount: this.amount,
                    Timestamp: new Date(Date.now())
                }
                const addedBudgetPassiveIncomeItem = await api.addBudgetPassiveIncomeItem(newBudgetPassiveIncomeItem)
                this.$store.commit('addBudgetPassiveIncomeItem', addedBudgetPassiveIncomeItem)
                this.amount = null
            } catch (error) {
                this.error = error.message
            }
        }
    }
}
</script>