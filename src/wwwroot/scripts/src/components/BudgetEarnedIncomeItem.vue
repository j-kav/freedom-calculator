<template>
    <tr>
        <td><input v-model="budgetEarnedIncomeItem.amount"></input>
        </td>
        <td><button v-on:click.prevent=updateEarnedIncomeItem()>Update</button></td>
        <td><button v-on:click.prevent=removeEarnedIncomeItem()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    // import api from '../api'

    export default {
        name: 'BudgetEarnedIncomeItem',
        data: function () {
            return {
                error: false,
                message: null,
                budgetEarnedIncomeItem: this.budgetEarnedIncomeItemModel
            }
        },
        computed: {
            messageClass: function () {
                return {
                    'error': this.error,
                    'success': !this.error
                }
            }
        },
        props: ['budgetEarnedIncomeItemModel'],
        methods: {
            updateEarnedIncomeItem: function () {
                // api.updateEarnedIncomeItem('TODO').then(() => {
                //     this.$store.commit('TODO')
                //     this.error = false
                //     this.message = 'updated'
                // }).catch((error) => {
                //     this.error = true
                //     this.message = error
                // })
                window.alert('TODO')
            },
            removeEarnedIncomeItem: function () {
                // api.removeEarnedIncomeItem('TODO').then(() => {
                //     this.$store.commit('TODO')
                //     this.error = false
                // }).catch((error) => {
                //     this.error = true
                //     this.message = error
                // })
                window.alert('TODO')
            }
        }
    }

</script>