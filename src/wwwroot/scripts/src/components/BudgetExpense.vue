<template>
    <tr>
        <td>{{ budgetExpense.expense.name }}</td>
        <td><input v-model="budgetExpense.projected" @change.prevent="updateExpense"></td>
        <td class="align-right">
            <span class="link" @click="showExpenseItems=true">{{ utils.usdFormatter.format(expenseItems) }}</span>
            <modal v-if="showExpenseItems" @close="showExpenseItems=false">
                <h3 slot="header">{{ budgetExpense.expense.name }} items</h3>
                <budgetExpenseItems v-if="showExpenseItems" slot="body" :budget-expense="budgetExpense" @close="showExpenseItems=false" />
            </modal>
        </td>
        <td :class="remainingClass" class="align-right">{{ utils.usdFormatter.format(remaining) }}</td>
        <td><input type="image" class="deleteButton" src="images/delete.png" @click.prevent="removeExpense"></td>
        <td v-if="message" :class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
import api from '../api'
import BudgetExpenseItems from './BudgetExpenseItems.vue'
import Modal from './Modal.vue'
import utils from '../utils'

export default {
    name: 'BudgetExpense',
    components: {
        budgetExpenseItems: BudgetExpenseItems,
        modal: Modal
    },
    props: {
        budgetExpenseModel: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            error: false,
            message: null,
            budgetExpense: this.budgetExpenseModel,
            showExpenseItems: false,
            utils: utils
        }
    },
    computed: {
        expenseItems() {
            let expenseItems = 0
            for (const item of this.budgetExpense.budgetExpenseItems) {
                expenseItems += Number.parseFloat(item.amount)
            }
            return expenseItems
        },
        remaining() {
            return this.budgetExpense.projected - this.expenseItems
        },
        remainingClass() {
            return {
                error: this.remaining < 0,
                success: this.remaining > 0,
                '': this.remaining === 0
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
        async updateExpense() {
            try {
                await api.updateBudgetExpense(this.budgetExpense.budgetExpenseId, this.budgetExpense)
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
                    await api.removeBudgetExpense(this.budgetExpense.budgetExpenseId)
                    this.$store.commit('removeBudgetExpense', this.budgetExpense)
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

<style scoped>
input {
    width: 100px;
}
</style>