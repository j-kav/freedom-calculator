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
                <budgetPassiveIncomeItem v-for="item in parentBudget.passiveIncome"
                                         :key="item.budgetPassiveIncomeItemId"
                                         v-bind:budgetPassiveIncomeItemModel="item">
                </budgetPassiveIncomeItem>
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
    import BudgetPassiveIncomeItem from './BudgetPassiveIncomeItem.vue'

    export default {
        name: 'BudgetPassiveIncomeItems',
        components: {
            'budgetPassiveIncomeItem': BudgetPassiveIncomeItem
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
                    const newBudgetPassiveIncomeItem = { BudgetId: this.parentBudget.budgetId, Amount: this.amount, Timestamp: new Date(Date.now()) }
                    api.addBudgetPassiveIncomeItem(newBudgetPassiveIncomeItem).then((addedBudgetPassiveIncomeItem) => {
                        this.$store.commit('addBudgetPassiveIncomeItem', addedBudgetPassiveIncomeItem)
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