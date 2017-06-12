<template>
    <tr>
        <td>{{ budgetEarnedIncomeItem.timeStamp.substring(0, 10) }}</td>
        <td><input v-model="budgetEarnedIncomeItem.amount"></input>
        </td>
        <td><button v-on:click.prevent=updateEarnedIncomeItem()>Update</button></td>
        <td><button v-on:click.prevent=removeEarnedIncomeItem()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetEarnedIncomeItem',
        data: function () {
            return {
                error: false,
                message: null,
                budgetEarnedIncomeItem: this.budgetEarnedIncomeItemModel
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
        props: ['budgetEarnedIncomeItemModel'],
        methods: {
            updateEarnedIncomeItem: function () {
                api.updateEarnedIncomeItem(this.budgetEarnedIncomeItem.budgetEarnedIncomeItemId, this.budgetEarnedIncomeItem).then(() => {
                    this.$store.commit('updateBudgetEarnedIncomeItem', this.budgetEarnedIncomeItem)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeEarnedIncomeItem: function () {
                api.removeEarnedIncomeItem(this.budgetEarnedIncomeItem.budgetEarnedIncomeItemId).then(() => {
                    this.$store.commit('removeBudgetEarnedIncomeItem', this.budgetEarnedIncomeItem)
                    this.error = false
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            }
        }
    }

</script>