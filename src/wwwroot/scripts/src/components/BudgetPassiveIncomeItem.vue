<template>
    <tr>
        <td>{{ budgetPassiveIncomeItem.timeStamp.substring(0, 10) }}</td>
        <td><input v-model="budgetPassiveIncomeItem.amount" @change.prevent="updatePassiveIncomeItem">
        </td>
        <td><input type="image" class="deleteButton" src="images/delete.png" @click.prevent="removePassiveIncomeItem"></td>
        <td v-if="message" :class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
import api from '../api'

export default {
    name: 'BudgetPassiveIncomeItem',
    props: {
        budgetPassiveIncomeItemModel: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            error: false,
            message: null,
            budgetPassiveIncomeItem: this.budgetPassiveIncomeItemModel
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
    methods: {
        async updatePassiveIncomeItem() {
            try {
                await api.updatePassiveIncomeItem(
                    this.budgetPassiveIncomeItem.budgetPassiveIncomeItemId,
                    this.budgetPassiveIncomeItem
                )
                this.$store.commit('updateBudgetPassiveIncomeItem', this.budgetPassiveIncomeItem)
                this.error = false
                this.message = 'updated'
            } catch (error) {
                this.error = true
                this.message = error
            }
        },
        async removePassiveIncomeItem() {
            if (window.confirm('Are you sure?')) {
                try {
                    await api.removePassiveIncomeItem(this.budgetPassiveIncomeItem.budgetPassiveIncomeItemId)
                    this.$store.commit('removeBudgetPassiveIncomeItem', this.budgetPassiveIncomeItem)
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