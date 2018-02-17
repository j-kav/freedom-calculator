<template>
    <tr>
        <td>{{ budgetExpense.expense.name }}</td>
        <td><input v-model="budgetExpense.projected" v-on:change.prevent=updateExpense()></input></td>
        <td class="align-right">
            <span class="link" @click="showExpenseItems=true">{{ utils.usdFormatter.format(expenseItems) }}</span>
            <modal v-if="showExpenseItems" @close="showExpenseItems=false">
                <h3 slot="header">{{ budgetExpense.expense.name }} items</h3>
                <budgetExpenseItems slot="body" v-if="showExpenseItems" v-bind:budgetExpense="budgetExpense" @close="showExpenseItems=false"></budgetExpenseItems>
            </modal>
        </td>
        <td class="align-right" v-bind:class="remainingClass">{{ utils.usdFormatter.format(remaining) }}</td>
        <td><input type="image" class="deleteButton" v-on:click.prevent=removeExpense() src="images/delete.png" /></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'
    import BudgetExpenseItems from './BudgetExpenseItems.vue'
    import Modal from './Modal.vue'
    import utils from '../utils'

    export default {
        name: 'BudgetExpense',
        data() {
            return {
                error: false,
                message: null,
                budgetExpense: this.budgetExpenseModel,
                showExpenseItems: false,
                utils: utils
            }
        },
        components: {
            'budgetExpenseItems': BudgetExpenseItems,
            'modal': Modal
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
                    'error': this.remaining < 0,
                    'success': this.remaining > 0,
                    '': this.remaining === 0
                }
            },
            messageClass() {
                return {
                    'error': this.error,
                    'success': !this.error
                }
            }
        },
        props: ['budgetExpenseModel'],
        methods: {
            updateExpense() {
                api.updateBudgetExpense(this.budgetExpense.budgetExpenseId, this.budgetExpense).then(() => {
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeExpense() {
                if (window.confirm('Are you sure?')) {
                    api.removeBudgetExpense(this.budgetExpense.budgetExpenseId).then(() => {
                        this.$store.commit('removeBudgetExpense', this.budgetExpense)
                        this.error = false
                    }).catch((error) => {
                        this.error = true
                        this.message = error
                    })
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