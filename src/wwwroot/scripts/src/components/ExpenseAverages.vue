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
    </div>
</template>

<script>
    import api from '../api'
    import utils from '../utils'

    export default {
        name: 'ExpenseAverages',
        created() {
            // query backend and populate store if necessary
            if (!this.$store.state.expenseAverages) {
                api.getExpenseAverages().then((data) => {
                    this.$store.commit('setExpenseAverages', data)
                    this.loading = false
                })
            }
        },
        props: ['mandatory'],
        data() {
            return {
                loading: !this.$store.state.expenseAverages,
                utils: utils,
                isMandatory: this.mandatory
            }
        }
    }

</script>