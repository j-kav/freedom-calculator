<template>
    <tr>
        <td>{{ budgetInvestmentItem.timeStamp.substring(0, 10) }}</td>
        <td><input v-model="budgetInvestmentItem.amount"></input>
        </td>
        <td><button v-on:click.prevent=updateInvestmentItem()>Update</button></td>
        <td><button v-on:click.prevent=removeInvestmentItem()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetInvestmentItem',
        data: function () {
            return {
                error: false,
                message: null,
                budgetInvestmentItem: this.budgetInvestmentItemModel
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
        props: ['budgetInvestmentItemModel'],
        methods: {
            updateInvestmentItem: function () {
                api.updateInvestmentItem(this.budgetInvestmentItem.budgetInvestmentItemId, this.budgetInvestmentItem).then(() => {
                    this.$store.commit('updateBudgetInvestmentItem', this.budgetInvestmentItem)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeInvestmentItem: function () {
                api.removeInvestmentItem(this.budgetInvestmentItem.budgetInvestmentItemId).then(() => {
                    this.$store.commit('removeBudgetInvestmentItem', this.budgetInvestmentItem)
                    this.error = false
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            }
        }
    }

</script>