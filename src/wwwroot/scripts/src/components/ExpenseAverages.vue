<template>
    <div v-if="loading">
        Loading...
    </div>
    <div v-else>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Average Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="expenseAverage in $store.getters.expenseAverages(isMandatory)" :key="expenseAverage.budgetExpenseAverageId">
                    <td>{{ expenseAverage.name }}</td>
                    <td>{{ utils.usdFormatter.format(expenseAverage.average) }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="error" class="error">Error {{ message }}
        </div>
    </div>
</template>

<script>
import api from '../api'
import utils from '../utils'

export default {
    name: 'ExpenseAverages',
    props: {
        mandatory: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            error: false,
            message: null,
            loading: !this.$store.state.expenseAverages,
            utils: utils,
            isMandatory: this.mandatory
        }
    },
    async created() {
        // query backend and populate store if necessary
        if (!this.$store.state.expenseAverages) {
            try {
                const data = await api.getExpenseAverages()
                this.$store.commit('setExpenseAverages', data)
                this.loading = false
            } catch (error) {
                this.loading = false
                this.error = true
                this.message = error.message
            }
        }
    }
}
</script>