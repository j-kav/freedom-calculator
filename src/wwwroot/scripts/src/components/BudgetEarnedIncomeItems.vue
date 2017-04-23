<template>
    <div>
        <p>Budget Earned Income</p>
        <div>Add new</div>
        <div>
            <label>Amount</label>
            <input type="text" v-model="amount"></input>
            <button v-on:click.prevent=addAmount>Submit</button>
        </div>
        <button @click="$emit('close')">Close</button>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetEarnedIncomeItems',
        data: function () {
            return {
                amount: null,
                parentBudget: this.budget,
                error: null
            }
        },
        props: ['budget', 'budgetEarnedIncomeItems'],
        methods: {
            addAmount: function () {
                // return promise for unit testing purposes
                var p = new Promise((resolve, reject) => {
                    var newBudgetEarnedIncomeItem = { BudgetId: this.parentBudget.budgetId, Amount: this.amount }
                    api.addBudgetEarnedIncomeItem(newBudgetEarnedIncomeItem).then((addedBudgetEarnedIncomeItem) => {
                        this.$store.commit('addBudgetEarnedIncomeItem', addedBudgetEarnedIncomeItem)
                        resolve()
                    }).catch((error) => {
                        this.error = 'error'
                        reject(error.message) // TODO sanitize error
                    })
                })
                return p
            }
        }
    }

</script>