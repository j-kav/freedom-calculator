<template>
    <tr>
        <td><input v-model="expense.name" @change.prevent="updateExpense"></td>
        <td><input v-model="expense.isMandatory" type="checkbox" @change.prevent="updateExpense"></td>
        <td><input type="image" src="images/delete.png" class="deleteButton" @click.prevent="removeExpense"></td>
        <td v-if="error && message" class="error">{{ message }}</td>
        <td v-else-if="message" class="success-icon-container"><img src="images/success.png" class="success-icon"></td>
    </tr>
</template>

<script>
import api from '../api'

export default {
    name: 'Expense',
    props: {
        expenseModel: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            error: false,
            message: null,
            expense: this.expenseModel
        }
    },
    methods: {
        async updateExpense() {
            try {
                await api.updateExpense(this.expense.expenseId, this.expense)
                this.$store.commit('updateExpense', this.expense)
                this.error = false
                this.message = 'updated'
            } catch (error) {
                this.error = true
                this.message = error
            }
        },
        async removeExpense() {
            if (window.confirm('Are you sure?')) {
                try {
                    await api.removeExpense(this.expense.expenseId)
                    this.$store.commit('removeExpense', this.expense.expenseId)
                    this.error = false
                } catch (error) {
                    this.error = true
                    this.message = error
                }
            }
        }
    }
}
</script>