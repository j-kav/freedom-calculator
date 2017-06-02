<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Expense</th>
                    <th>Projected</th>
                    <th>Actual</th>
                </tr>
            </thead>
            <tbody>
                <budgetExpense v-for="item in parentBudget.expenses" v-bind:budgetExpenseModel="item"></budgetExpense>
            </tbody>
        </table>
        <div>Add new</div>
        <div>
            <select v-model="expense">
                <option v-for="expense in $store.state.expenses" v-bind:value="expense">
                    {{ expense.name }}
                </option>
            </select>
            <label>Projected Amount</label>
            <input type="text" v-model="projected"></input>
            <button v-on:click.prevent=addExpense>Submit</button>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import BudgetExpense from './BudgetExpense.vue'

    export default {
        name: 'BudgetExpenses',
        components: {
            'budgetExpense': BudgetExpense
        },
        data: function () {
            return {
                projected: null,
                expense: null,
                parentBudget: this.budget,
                error: null
            }
        },
        props: ['budget'],
        methods: {
            addExpense: function () {
                // return promise for unit testing purposes
                var p = new Promise((resolve, reject) => {
                    var newBudgetExpense = {
                        BudgetId: this.parentBudget.budgetId,
                        Projected: this.projected,
                        ExpenseId: this.expense.expenseId
                    }
                    api.addBudgetExpense(newBudgetExpense).then((addedBudgetExpense) => {
                        addedBudgetExpense.expense = this.expense
                        addedBudgetExpense.budgetExpenseItems = []
                        this.$store.commit('addBudgetExpense', addedBudgetExpense)
                        resolve()
                    }).catch((error) => {
                        this.error = 'error'
                        reject(error.message) // TODO sanitize error
                    })
                })
                return p
            }
        }
    }

</script>