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
                <budgetInvestmentItem v-for="item in parentBudget.investments" :key="item.budgetInvestmentItemId" :budget-investment-item-model="item" />
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
import BudgetInvestmentItem from './BudgetInvestmentItem.vue'

export default {
    name: 'BudgetInvestmentItems',
    components: {
        budgetInvestmentItem: BudgetInvestmentItem
    },
    props: {
        budget: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            amount: null,
            parentBudget: this.budget,
            error: null
        }
    },
    methods: {
        async addAmount() {
            try {
                const newBudgetInvestmentItem = {
                    BudgetId: this.parentBudget.budgetId,
                    Amount: this.amount,
                    Timestamp: new Date(Date.now())
                }
                const addedBudgetInvestmentItem = await api.addBudgetInvestmentItem(newBudgetInvestmentItem)
                this.$store.commit('addBudgetInvestmentItem', addedBudgetInvestmentItem)
                this.amount = null
            } catch (error) {
                this.error = error.message
            }
        }
    }
}
</script>