<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <budgetInvestmentItem v-for="item in parentBudget.investments"
                                      :key="item.budgetInvestmentItemId"
                                      v-bind:budgetInvestmentItemModel="item">
                </budgetInvestmentItem>
            </tbody>
        </table>
        <div>Add new</div>
        <div>
            <label>Amount</label>
            <input type="text" v-model="amount"></input>
            <button v-on:click.prevent=addAmount>Submit</button>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import BudgetInvestmentItem from './BudgetInvestmentItem.vue'

    export default {
        name: 'BudgetInvestmentItems',
        components: {
            'budgetInvestmentItem': BudgetInvestmentItem
        },
        data() {
            return {
                amount: null,
                parentBudget: this.budget,
                error: null
            }
        },
        props: ['budget'],
        methods: {
            addAmount() {
                // return promise for unit testing purposes
                const p = new Promise((resolve, reject) => {
                    const newBudgetInvestmentItem = { BudgetId: this.parentBudget.budgetId, Amount: this.amount, Timestamp: new Date(Date.now()) }
                    api.addBudgetInvestmentItem(newBudgetInvestmentItem).then((addedBudgetInvestmentItem) => {
                        this.$store.commit('addBudgetInvestmentItem', addedBudgetInvestmentItem)
                        this.amount = null
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