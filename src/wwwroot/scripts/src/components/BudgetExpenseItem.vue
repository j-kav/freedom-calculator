<template>
    <tr>
        <td>{{ budgetExpenseItem.timeStamp.substring(0, 10) }}</td>
        <td><input v-model="budgetExpenseItem.amount"></input>
        </td>
        <td><button v-on:click.prevent=updateExpenseItem()>Update</button></td>
        <td><button v-on:click.prevent=removeExpenseItem()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetExpenseItem',
        data: function () {
            return {
                error: false,
                message: null,
                budgetExpenseItem: this.budgetExpenseItemModel,
                parentBudgetExpense: this.budgetExpense
            }
        },
        computed: {
            messageClass: function () {
                return {
                    'error': this.error,
                    'success': !this.error
                }
            }
        },
        props: ['budgetExpense', 'budgetExpenseItemModel'],
        methods: {
            updateExpenseItem: function () {
                api.updateBudgetExpenseItem(this.budgetExpenseItem.budgetExpenseItemId, this.budgetExpenseItem).then(() => {
                    this.budgetExpenseItem.budgetExpense = this.parentBudgetExpense
                    this.$store.commit('updateBudgetExpenseItem', this.budgetExpenseItem)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error.message
                })
            },
            removeExpenseItem: function () {
                api.removeBudgetExpenseItem(this.budgetExpenseItem.budgetExpenseItemId).then(() => {
                    this.budgetExpenseItem.budgetExpense = this.parentBudgetExpense
                    this.$store.commit('removeBudgetExpenseItem', this.budgetExpenseItem)
                    this.error = false
                }).catch((error) => {
                    this.error = true
                    this.message = error.message
                })
            }
        }
    }

</script>