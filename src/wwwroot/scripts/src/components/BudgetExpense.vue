<template>
    <tr>
        <td>{{ budgetExpense.expense.name }}</td>
        <td><input v-model="budgetExpense.projected"></input>
        </td>
        <td>
            <span class="link" @click="showExpenseItems=true">{{ expenseItems }}</span>
            <modal v-if="showExpenseItems" @close="showExpenseItems=false">
                <h3 slot="header">{{ budgetExpense.expense.name }} items</h3>
                <budgetExpenseItems slot="body" v-if="showExpenseItems" v-bind:budgetExpense="budgetExpense" @close="showExpenseItems=false"></budgetExpenseItems>
            </modal>
        </td>
        <td><button v-on:click.prevent=updateExpense()>Update</button></td>
        <td><button v-on:click.prevent=removeExpense()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'
    import BudgetExpenseItems from './BudgetExpenseItems.vue'
    import Modal from './Modal.vue'

    export default {
        name: 'BudgetExpense',
        data: function () {
            return {
                error: false,
                message: null,
                budgetExpense: this.budgetExpenseModel,
                showExpenseItems: false
            }
        },
        components: {
            'budgetExpenseItems': BudgetExpenseItems,
            'modal': Modal
        },
        computed: {
            expenseItems: function () {
                let expenseItems = 0
                for (const item of this.budgetExpense.budgetExpenseItems) {
                    expenseItems += Number.parseFloat(item.amount)
                }
                return expenseItems
            },
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
                api.updateBudgetExpense(this.budgetExpense.budgetExpenseId, this.budgetExpense).then(() => {
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeExpense: function () {
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

</script>