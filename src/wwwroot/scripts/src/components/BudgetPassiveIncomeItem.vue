<template>
    <tr>
        <td>{{ budgetPassiveIncomeItem.timeStamp.substring(0, 10) }}
        <td><input v-model="budgetPassiveIncomeItem.amount"></input>
        </td>
        <td><button v-on:click.prevent=updatePassiveIncomeItem()>Update</button></td>
        <td><button v-on:click.prevent=removePassiveIncomeItem()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetPassiveIncomeItem',
        data: function () {
            return {
                error: false,
                message: null,
                budgetPassiveIncomeItem: this.budgetPassiveIncomeItemModel
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
        props: ['budgetPassiveIncomeItemModel'],
        methods: {
            updatePassiveIncomeItem: function () {
                api.updatePassiveIncomeItem(this.budgetPassiveIncomeItem.budgetPassiveIncomeItemId, this.budgetPassiveIncomeItem).then(() => {
                    this.$store.commit('updateBudgetPassiveIncomeItem', this.budgetPassiveIncomeItem)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removePassiveIncomeItem: function () {
                api.removePassiveIncomeItem(this.budgetPassiveIncomeItem.budgetPassiveIncomeItemId).then(() => {
                    this.$store.commit('removeBudgetPassiveIncomeItem', this.budgetPassiveIncomeItem)
                    this.error = false
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            }
        }
    }

</script>