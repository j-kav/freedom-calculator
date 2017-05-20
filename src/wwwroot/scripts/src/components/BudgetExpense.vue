<template>
    <tr>
        <!--<td>{{ budgetExpense.expense.name }}</td>-->
        <td><input v-model="budgetExpense.projected"></input>
        </td>
        <td><button v-on:click.prevent=updateExpense()>Update</button></td>
        <td><button v-on:click.prevent=removeExpense()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    // import api from '../api'

    export default {
        name: 'BudgetExpense',
        data: function () {
            return {
                error: false,
                message: null,
                budgetExpense: this.budgetExpenseModel
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
        props: ['budgetExpenseModel'],
        methods: {
            updateExpense: function () {
                // api.updateExpense(this.budgetEarnedIncomeItem.budgetEarnedIncomeItemId, this.budgetEarnedIncomeItem).then(() => {
                //     this.error = false
                //     this.message = 'updated'
                // }).catch((error) => {
                //     this.error = true
                //     this.message = error
                // })
            },
            removeExpense: function () {
                // api.removeEarnedIncomeItem(this.budgetEarnedIncomeItem.budgetEarnedIncomeItemId).then(() => {
                //     this.$store.commit('removeBudgetEarnedIncomeItem', this.budgetEarnedIncomeItem)
                //     this.error = false
                // }).catch((error) => {
                //     this.error = true
                //     this.message = error
                // })
            }
        }
    }

</script>