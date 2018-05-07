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
                <budgetExpense v-for="item in budgetExpenses" :key="item.budgetExpenseId" :budget-expense-model="item"/>
            </tbody>
            <tfoot>
                <td>Total</td>
                <td class="align-right">{{ utils.usdFormatter.format(totalProjectedExpenses) }}</td>
                <td class="align-right">{{ utils.usdFormatter.format(parentBudget.totalActualExpenses) }}</td>
                <td :class="remainingTotalClass" class="align-right">{{ utils.usdFormatter.format(remainingTotal) }}</td>
            </tfoot>
        </table>
        <br>
        <div>
            <h3>Add New</h3>
        </div>
        <div>
            <select v-model="expense">
                <option v-for="expense in unprojectedExpenses" :key="expense.expenseId" :value="expense">
                    {{ expense.name }}
                </option>
            </select>
            <label>Projected Amount</label>
            <input v-model="projected" type="text">
            <button @click.prevent="addExpense">Submit</button>
            <span v-if="message" :class="messageClass">{{ message }}</span>
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
        budgetExpense: BudgetExpense
    },
    props: {
        budget: {
            type: Object,
            default: null
        }
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
            let parentBudgetExpenses = this.parentBudget.expenses;
            let sortedExpenses = parentBudgetExpenses.sort(compareBudgetExpenseByName);
            return sortedExpenses;
        },
        unprojectedExpenses() {
            const notIn = expense => {
                return (
                    this.parentBudget.expenses.find(budgetExpense => budgetExpense.expense.name === expense.name) ===
                    undefined
                )
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
                error: this.remainingTotal < 0,
                success: this.remainingTotal > 0,
                '': this.remainingTotal === 0
            }
        },
        messageClass() {
            return {
                error: this.error,
                success: !this.error
            }
        }
    },
    methods: {
        async addExpense() {
            try {
                const newBudgetExpense = {
                    BudgetId: this.parentBudget.budgetId,
                    Projected: this.projected,
                    ExpenseId: this.expense.expenseId
                }
                const addedBudgetExpense = await api.addBudgetExpense(newBudgetExpense)
                addedBudgetExpense.expense = this.expense
                addedBudgetExpense.budgetExpenseItems = []
                this.$store.commit('addBudgetExpense', addedBudgetExpense)
                this.projected = null
            } catch (error) {
                this.error = error.message
            }
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