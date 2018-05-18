<template>
    <tr>
        <td class="budgetDateColumn">
            <router-link :to="{ name: 'budget', params: { id: budget.budgetId } }">
                {{ budget.year }} / {{ budget.month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) }}
            </router-link>
        </td>
        <td class="align-right">{{ utils.usdFormatter.format(budget.projectedEarnedIncome) }}</td>
        <td class="align-right">{{ utils.usdFormatter.format(budget.totalEarnedIncome) }}</td>
        <td class="align-right">{{ utils.usdFormatter.format(budget.totalPassiveIncome) }}</td>
        <td class="align-right">{{ utils.usdFormatter.format(totalIncome) }}</td>
        <td class="align-right">{{ `${utils.usdFormatter.format(budget.totalActualExpenses)} / ${utils.usdFormatter.format(budget.totalProjectedExpenses)}` }}</td>
        <td :class="surplusDeficitClass" class="align-right">{{ utils.usdFormatter.format(surplusDeficit) }}</td>
        <td class="align-right">{{ utils.usdFormatter.format(budget.totalInvestments) }}</td>
        <td class="align-right">{{ budget.savingsRatePercent }}</td>
        <td><input type="image" src="images/delete.png" class="deleteButton" @click.prevent="removeBudget"></td>
        <td v-if="message" :class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
import api from '../api'
import utils from '../utils'

export default {
    name: 'Budget',
    props: {
        budgetModel: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            error: false,
            message: null,
            budget: this.budgetModel,
            utils: utils
        }
    },
    computed: {
        messageClass() {
            return {
                error: this.error,
                success: !this.error
            }
        },
        totalIncome() {
            return this.budget.totalEarnedIncome + this.budget.totalPassiveIncome
        },
        surplusDeficit() {
            return this.totalIncome - this.budget.totalActualExpenses
        },
        surplusDeficitClass() {
            return {
                error: this.surplusDeficit < 0,
                success: this.surplusDeficit >= 0
            }
        }
    },
    methods: {
        async removeBudget() {
            if (window.confirm('Are you sure?')) {
                try {
                    await api.removeBudget(this.budget.budgetId)
                    this.$store.commit('removeBudget', this.budget.budgetId)
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

<style scoped=true>
.budgetDateColumn {
    min-width: 6em;
}
</style>