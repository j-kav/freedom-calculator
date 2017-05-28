<template>
    <tr>
        <td>{{ budgetExpenseItem.timeStamp }}</td>
        <td><input v-model="budgetExpenseItem.amount"></input>
        </td>
        <td><button v-on:click.prevent=updateExpenseItem()>Update</button></td>
        <td><button v-on:click.prevent=removeExpnseItem()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetExpenseItem',
        data: function () {
            return {
                error: false,
                message: null,
                budgetExpenseItem: this.budgetExpenseItemModel
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
        props: ['budgetExpenseItemModel'],
        methods: {
            updateExpenseItem: function () {
                api.updateExpenseItem(this.budgetExpenseItem.budgetExpenseItemId, this.budgetExpenseItem).then(() => {
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeExpenseItem: function () {
                api.removeExpenseItem(this.budgetExpenseItem.budgetExpenseItemId).then(() => {
                    this.$store.commit('removeBudgetExpenseItem', this.budgetExpenseItem)
                    this.error = false
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            }
        }
    }

</script>