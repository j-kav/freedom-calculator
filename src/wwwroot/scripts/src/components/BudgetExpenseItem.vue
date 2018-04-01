<template>
    <tr>
        <td>{{ budgetExpenseItem.timeStamp.substring(0, 10) }}</td>
        <td><input v-model="budgetExpenseItem.amount" v-on:change.prevent=updateExpenseItem()>
        </td>
        <td><input type="image" class="deleteButton" v-on:click.prevent=removeExpenseItem() src="images/delete.png" /></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
import api from '../api'

export default {
    name: 'BudgetExpenseItem',
    data() {
        return {
            error: false,
            message: null,
            budgetExpenseItem: this.budgetExpenseItemModel,
            parentBudgetExpense: this.budgetExpense
        }
    },
    computed: {
        messageClass() {
            return {
                error: this.error,
                success: !this.error
            }
        }
    },
    props: ['budgetExpense', 'budgetExpenseItemModel'],
    methods: {
        async updateExpenseItem() {
            try {
                await api.updateBudgetExpenseItem(this.budgetExpenseItem.budgetExpenseItemId, this.budgetExpenseItem)
                this.budgetExpenseItem.budgetExpense = this.parentBudgetExpense
                this.$store.commit('updateBudgetExpenseItem', this.budgetExpenseItem)
                this.error = false
                this.message = 'updated'
            } catch (error) {
                this.error = true
                this.message = error.message
            }
        },
        async removeExpenseItem() {
            if (window.confirm('Are you sure?')) {
                try {
                    await api.removeBudgetExpenseItem(this.budgetExpenseItem.budgetExpenseItemId)
                    this.budgetExpenseItem.budgetExpense = this.parentBudgetExpense
                    this.$store.commit('removeBudgetExpenseItem', this.budgetExpenseItem)
                    this.error = false
                } catch (error) {
                    this.error = true
                    this.message = error.message
                }
            }
        }
    }
}
</script>