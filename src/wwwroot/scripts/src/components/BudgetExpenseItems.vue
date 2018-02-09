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
                <budgetExpenseItem v-for="item in parentBudgetExpense.budgetExpenseItems"
                                   :key="item.budgetExpenseItemId"
                                   v-bind:budgetExpenseItemModel="item"
                                   v-bind:budgetExpense="parentBudgetExpense">
                </budgetExpenseItem>
            </tbody>
            <tfoot>
                <td>Total</td>
                <td>{{ total }}</td>
            </tfoot>
        </table>
        <br/>
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
    import utils from '../utils'

    export default {
        name: 'BudgetExpenseItems',
        components: {
            'budgetExpenseItem': BudgetExpenseItem
        },
        data() {
            return {
                amount: null,
                parentBudgetExpense: this.budgetExpense,
                error: null
            }
        },
        props: ['budgetExpense'],
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
            addAmount() {
                // return promise for unit testing purposes
                const p = new Promise((resolve, reject) => {
                    const newBudgetExpenseItem = { BudgetExpenseId: this.parentBudgetExpense.budgetExpenseId, Amount: this.amount, Timestamp: new Date(Date.now()) }
                    api.addBudgetExpenseItem(newBudgetExpenseItem).then((addedBudgetExpenseItem) => {
                        addedBudgetExpenseItem.budgetExpense = this.parentBudgetExpense
                        this.$store.commit('addBudgetExpenseItem', addedBudgetExpenseItem)
                        this.amount = null
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