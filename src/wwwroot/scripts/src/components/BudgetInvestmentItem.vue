<template>
    <tr>
        <td>{{ budgetInvestmentItem.timeStamp.substring(0, 10) }}</td>
        <td><input v-model="budgetInvestmentItem.amount" v-on:change.prevent=updateInvestmentItem()></td>
        <td><input type="image" class="deleteButton" v-on:click.prevent=removeInvestmentItem() src="images/delete.png" /></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
import api from '../api'

export default {
    name: 'BudgetInvestmentItem',
    data() {
        return {
            error: false,
            message: null,
            budgetInvestmentItem: this.budgetInvestmentItemModel
        }
    },
    computed: {
        messageClass() {
            return {
                error: this.error,
                success: !this.error
            }
        }
    },
    props: ['budgetInvestmentItemModel'],
    methods: {
        async updateInvestmentItem() {
            try {
                await api.updateInvestmentItem(
                    this.budgetInvestmentItem.budgetInvestmentItemId,
                    this.budgetInvestmentItem
                )
                this.$store.commit('updateBudgetInvestmentItem', this.budgetInvestmentItem)
                this.error = false
                this.message = 'updated'
            } catch (error) {
                this.error = true
                this.message = error
            }
        },
        async removeInvestmentItem() {
            if (window.confirm('Are you sure?')) {
                try {
                    await api.removeInvestmentItem(this.budgetInvestmentItem.budgetInvestmentItemId)
                    this.$store.commit('removeBudgetInvestmentItem', this.budgetInvestmentItem)
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