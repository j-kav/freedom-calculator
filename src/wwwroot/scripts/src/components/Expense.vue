<template>
    <tr>
        <td><input v-model="expense.name" v-on:change.prevent=updateExpense()></input></td>
        <td><input type="checkbox" v-model="expense.isMandatory" v-on:change.prevent=updateExpense()></input></td>
        <td><input type="image" class="deleteButton" v-on:click.prevent=removeExpense() src="images/delete.png" /></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Expense',
        data: function () {
            return {
                error: false,
                message: null,
                expense: this.expenseModel
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
        props: ['expenseModel'],
        methods: {
            updateExpense: function () {
                api.updateExpense(this.expense.expenseId, this.expense).then(() => {
                    this.$store.commit('updateExpense', this.expense)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeExpense: function () {
                if (window.confirm('Are you sure?')) {
                    api.removeExpense(this.expense.expenseId).then(() => {
                        this.$store.commit('removeExpense', this.expense.expenseId)
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