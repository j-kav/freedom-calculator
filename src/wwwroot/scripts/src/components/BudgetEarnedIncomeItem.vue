<template>
    <tr>
        <td>{{ budgetEarnedIncomeItem.timeStamp.substring(0, 10) }}</td>
        <td><input v-model="budgetEarnedIncomeItem.amount" v-on:change.prevent=updateEarnedIncomeItem()></input>
        </td>
        <td><input type="image" class="deleteButton" v-on:click.prevent=removeEarnedIncomeItem() src="images/delete.png" /></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetEarnedIncomeItem',
        data() {
            return {
                error: false,
                message: null,
                budgetEarnedIncomeItem: this.budgetEarnedIncomeItemModel
            }
        },
        computed: {
            messageClass() {
                return {
                    'error': this.error,
                    'success': !this.error
                }
            }
        },
        props: ['budgetEarnedIncomeItemModel'],
        methods: {
            updateEarnedIncomeItem() {
                api.updateEarnedIncomeItem(this.budgetEarnedIncomeItem.budgetEarnedIncomeItemId, this.budgetEarnedIncomeItem).then(() => {
                    this.$store.commit('updateBudgetEarnedIncomeItem', this.budgetEarnedIncomeItem)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeEarnedIncomeItem() {
                if (window.confirm('Are you sure?')) {
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
    }

</script>