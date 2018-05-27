<template>
    <tr>
        <td>{{ budgetExpenseItem.timeStamp.substring(0, 10) }}</td>
        <td><input v-model="budgetExpenseItem.amount" @change.prevent="updateExpenseItem"></td>
        <td><input type="image" class="deleteButton" src="images/delete.png" @click.prevent="removeExpenseItem"></td>
        <td v-if="message" :class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
import api from '../api'

export default {
    name: 'BudgetExpenseItem',
    props: {
        budgetExpense: {
            type: Object,
            default: null
        },
        budgetExpenseItemModel: {
            type: Object,
            default: null
        }
    },
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