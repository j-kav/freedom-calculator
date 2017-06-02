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
                <budgetExpenseItem v-for="item in parentBudgetExpense.budgetExpenseItems" v-bind:budgetExpenseItemModel="item"></budgetExpenseItem>
            </tbody>
        </table>
        <div>Add new</div>
        <div>
            <label>Amount</label>
            <input type="text" v-model="amount"></input>
            <button v-on:click.prevent=addAmount>Submit</button>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import BudgetExpenseItem from './BudgetExpenseItem.vue'

    export default {
        name: 'BudgetExpenseItems',
        components: {
            'budgetExpenseItem': BudgetExpenseItem
        },
        data: function () {
            return {
                amount: null,
                parentBudgetExpense: this.budgetExpense,
                error: null
            }
        },
        props: ['budgetExpense'],
        methods: {
            addAmount: function () {
                // return promise for unit testing purposes
                var p = new Promise((resolve, reject) => {
                    var newBudgetExpenseItem = { BudgetExpenseId: this.parentBudgetExpense.budgetExpenseId, Amount: this.amount, Timestamp: new Date(Date.now()) }
                    api.addBudgetExpenseItem(newBudgetExpenseItem).then((addedBudgetExpenseItem) => {
                        addedBudgetExpenseItem.budgetExpense = this.parentBudgetExpense
                        this.$store.commit('addBudgetExpenseItem', addedBudgetExpenseItem)
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