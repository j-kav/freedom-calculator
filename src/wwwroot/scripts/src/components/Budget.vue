<template>
    <tr>
        <td><input v-model="budget.date"></input>
        </td>
        <td><button v-on:click.prevent=updateBudget()>Update</button></td>
        <td><button v-on:click.prevent=removeBudget()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Budget',
        data: function () {
            return {
                error: false,
                message: null,
                budget: this.budgetModel
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
        props: ['budgetModel'],
        methods: {
            updateBudget: function () {
                api.updateBudget(this.budget.budgetId, this.budget).then(() => {
                    this.$store.commit('updateBudget', this.budget)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeBudget: function () {
                api.removeBudget(this.budget.budgetId).then(() => {
                    this.$store.commit('removeBudget', this.budget.budgetId)
                    this.error = false
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            }
        }
    }

</script>