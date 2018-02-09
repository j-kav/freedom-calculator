<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Expense</th>
                    <th>Projected</th>
                    <th>Actual</th>
                    <th>Remaining</th>
                </tr>
            </thead>
            <tbody>
                <budgetExpense v-for="item in budgetExpenses" :key="item.budgetExpenseId" v-bind:budgetExpenseModel="item"></budgetExpense>
            </tbody>
            <tfoot>
                <td>Total</td>
                <td class="align-right">{{ utils.usdFormatter.format(totalProjectedExpenses) }}</td>
                <td class="align-right">{{ utils.usdFormatter.format(parentBudget.totalActualExpenses) }}</td>
                <td class="align-right" v-bind:class="remainingTotalClass">{{ utils.usdFormatter.format(remainingTotal) }}</td>
            </tfoot>
        </table>
        <br/>
        <div>
            <h3>Add New</h3>
        </div>
        <div>
            <select v-model="expense">
                <option v-for="expense in unprojectedExpenses" :key="expense.expenseId" v-bind:value="expense">
                    {{ expense.name }}
                </option>
            </select>
            <label>Projected Amount</label>
            <input type="text" v-model="projected"></input>
            <button v-on:click.prevent=addExpense>Submit</button>
            <span v-if="message" v-bind:class="messageClass">{{ message }}</span>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import BudgetExpense from './BudgetExpense.vue'
    import utils from '../utils'

    function compareBudgetExpenseByName(a, b) {
        if (a.expense.name < b.expense.name) {
            return -1
        }
        if (a.expense.name > b.expense.name) {
            return 1
        }
        return 0
    }

    function compareExpenseByName(a, b) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    }

    export default {
        name: 'BudgetExpenses',
        components: {
            'budgetExpense': BudgetExpense
        },
        data() {
            return {
                projected: null,
                expense: null,
                parentBudget: this.budget,
                error: null,
                message: null,
                utils: utils
            }
        },
        computed: {
            budgetExpenses() {
                return this.parentBudget.expenses.sort(compareBudgetExpenseByName)
            },
            unprojectedExpenses() {
                const notIn = (expense) => {
                    return this.parentBudget.expenses.find(budgetExpense => budgetExpense.expense.name === expense.name) === undefined
                }
                const unprojected = this.$store.state.expenses.filter(notIn)
                return unprojected.sort(compareExpenseByName)
            },
            totalProjectedExpenses() {
                let total = 0
                for (const item of this.budget.expenses) {
                    total += Number.parseFloat(item.projected)
                }
                return total
            },
            remainingTotal() {
                return this.totalProjectedExpenses - this.parentBudget.totalActualExpenses
            },
            remainingTotalClass() {
                return {
                    'error': this.remainingTotal < 0,
                    'success': this.remainingTotal > 0,
                    '': this.remainingTotal === 0
                }
            },
            messageClass() {
                return {
                    'error': this.error,
                    'success': !this.error
                }
            }
        },
        props: ['budget'],
        methods: {
            addExpense() {
                // return promise for unit testing purposes
                const p = new Promise((resolve, reject) => {
                    const newBudgetExpense = {
                        BudgetId: this.parentBudget.budgetId,
                        Projected: this.projected,
                        ExpenseId: this.expense.expenseId
                    }
                    api.addBudgetExpense(newBudgetExpense).then((addedBudgetExpense) => {
                        addedBudgetExpense.expense = this.expense
                        addedBudgetExpense.budgetExpenseItems = []
                        this.$store.commit('addBudgetExpense', addedBudgetExpense)
                        this.projected = null
                        resolve()
                    }).catch((error) => {
                        this.error = 'error'
                        this.message = error
                        reject(error.message)
                    })
                })
                return p
            }
        }
    }

</script>

<style scoped>
    table {
        border-collapse: collapse;
    }

    td {
        padding: 2px;
    }

    tfoot {
        border-top: 1px solid black;
    }
</style>