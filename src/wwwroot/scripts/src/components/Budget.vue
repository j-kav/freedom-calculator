<template>
    <tr>
        <td><router-link :to="{ name: 'budget', params: { id: budget.budgetId } }">{{ budget.year }} - {{ budget.month }}</router-link></input>
        </td>
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
            removeBudget: function () {
                if (window.confirm('Are you sure?')) {
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
    }

</script>