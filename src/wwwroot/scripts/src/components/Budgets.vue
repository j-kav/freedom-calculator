<template>
    <div>
        <h2>Budgets</h2>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Projected Net Earned Income</th>
                    <th>Net Earned Income</th>
                    <th>Passive Income</th>
                    <th>Total Income</th>
                    <th>Expenses</th>
                    <th>Income Surplus/Deficit</th>
                    <th>Investments</th>
                </tr>
            </thead>
            <tbody>
                <budget v-for="budget in $store.state.budgets" :key="budget.budgetId" v-bind:budgetModel="budget"></budget>
            </tbody>
        </table>
        <br/>
        <button v-on:click.prevent=addBudget>Add New</button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script>
    import api from '../api'
    import Budget from './Budget.vue'

    export default {
        name: 'Budgets',
        components: {
            'budget': Budget
        },
        data: function () {
            return {
                error: null
            }
        },
        methods: {
            addBudget: function () {
                var now = new Date(Date.now())
                var month = now.getMonth() + 1
                var year = now.getFullYear()
                var newBudget = {
                    Month: month,
                    Year: year
                }
                // return promise for unit testing purposes
                var p = new Promise((resolve, reject) => {
                    if (this.$store.getters.budgetByDate(month, year).length !== 0) {
                        this.error = 'Budget already exists for the current month and year'
                        resolve(this.error)
                    } else {
                        api.addBudget(newBudget).then((addedBudget) => {
                            this.$store.commit('addBudget', addedBudget)
                            resolve()
                        }).catch((error) => {
                            this.error = 'error'
                            reject(error.message) // TODO sanitize error
                        })
                    }
                })
                return p
            }
        }
    }

</script>