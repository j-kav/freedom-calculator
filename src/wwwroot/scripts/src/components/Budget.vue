<template>
    <tr>
        <td><router-link :to="{ name: 'budget', params: { id: budget.budgetId } }">{{ budget.year }} - {{ budget.month }}</router-link></td>
        <td class="align-right">{{ utils.usdFormmater.format(budget.totalEarnedIncome) }}</td>
        <td class="align-right">{{ utils.usdFormmater.format(budget.totalPassiveIncome) }}</td>
        <td class="align-right">{{ utils.usdFormmater.format(budget.totalInvestments) }}</td>
        <td class="align-right">{{ utils.usdFormmater.format(budget.totalActualExpenses) + ' / ' + utils.usdFormmater.format(budget.totalProjectedExpenses) }}</td>
        <td><button v-on:click.prevent=removeBudget()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'
    import utils from '../utils'

    export default {
        name: 'Budget',
        data: function () {
            return {
                error: false,
                message: null,
                budget: this.budgetModel,
                utils: utils
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
        props: ['budgetModel'],
        methods: {
            removeBudget: function () {
                if (window.confirm('Are you sure?')) {
                    api.removeBudget(this.budget.budgetId).then(() => {
                        this.$store.commit('removeBudget', this.budget.budgetId)
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