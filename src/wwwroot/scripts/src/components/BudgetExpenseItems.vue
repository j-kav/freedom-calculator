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
                <budgetExpenseItem v-for="item in parentBudgetExpense.budgetExpenseItems" :key="item.budgetExpenseItemId" :budget-expense-item-model="item" :budget-expense="parentBudgetExpense" />
            </tbody>
            <tfoot>
                <td>Total</td>
                <td>{{ total }}</td>
            </tfoot>
        </table>
        <br>
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
import BudgetExpenseItem from './BudgetExpenseItem.vue'
import utils from '../utils'

export default {
    name: 'BudgetExpenseItems',
    components: {
        budgetExpenseItem: BudgetExpenseItem
    },
    props: {
        budgetExpense: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            amount: null,
            parentBudgetExpense: this.budgetExpense,
            error: null
        }
    },
    computed: {
        total() {
            let total = 0
            for (const item of this.budgetExpense.budgetExpenseItems) {
                total += parseFloat(item.amount)
            }
            return utils.usdFormatter.format(total)
        }
    },
    methods: {
        async addAmount() {
            try {
                const newBudgetExpenseItem = {
                    BudgetExpenseId: this.parentBudgetExpense.budgetExpenseId,
                    Amount: this.amount,
                    Timestamp: new Date(Date.now())
                }
                const addedBudgetExpenseItem = await api.addBudgetExpenseItem(newBudgetExpenseItem)
                addedBudgetExpenseItem.budgetExpense = this.parentBudgetExpense
                this.$store.commit('addBudgetExpenseItem', addedBudgetExpenseItem)
                this.amount = null
            } catch (error) {
                this.error = error.message
            }
        }
    }
}
</script>