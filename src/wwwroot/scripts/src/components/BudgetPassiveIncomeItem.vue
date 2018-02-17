<template>
    <tr>
        <td>{{ budgetPassiveIncomeItem.timeStamp.substring(0, 10) }}
            <td><input v-model="budgetPassiveIncomeItem.amount" v-on:change.prevent=updatePassiveIncomeItem()></input>
            </td>
            <td><input type="image" class="deleteButton" v-on:click.prevent=removePassiveIncomeItem() src="images/delete.png"/></td>
            <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'BudgetPassiveIncomeItem',
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
                    'error': this.error,
                    'success': !this.error
                }
            }
        },
        props: ['budgetPassiveIncomeItemModel'],
        methods: {
            updatePassiveIncomeItem() {
                api.updatePassiveIncomeItem(this.budgetPassiveIncomeItem.budgetPassiveIncomeItemId, this.budgetPassiveIncomeItem).then(() => {
                    this.$store.commit('updateBudgetPassiveIncomeItem', this.budgetPassiveIncomeItem)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removePassiveIncomeItem() {
                if (window.confirm('Are you sure?')) {
                    api.removePassiveIncomeItem(this.budgetPassiveIncomeItem.budgetPassiveIncomeItemId).then(() => {
                        this.$store.commit('removeBudgetPassiveIncomeItem', this.budgetPassiveIncomeItem)
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