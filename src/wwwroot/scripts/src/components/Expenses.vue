<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mandatory</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <expense v-for="expense in $store.state.expenses" :key="expense.expenseId" v-bind:expenseModel="expense"></expense>
            </tbody>
        </table>
        <h3>Add new</h3>
        <div>
            <label>Name</label><input v-model="name"></input>
        </div>
        <div>
            <label>Mandatory?</label><input type="checkbox" v-model="isMandatory"></input>
        </div>
        <br/>
        <button v-on:click.prevent=addExpense>Submit</button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
<script>
    import api from '../api'
    import Expense from './Expense.vue'

    export default {
        name: 'Expenses',
        components: {
            'expense': Expense
        },
        data: function () {
            return {
                name: '',
                isMandatory: false,
                error: null
            }
        },
        methods: {
            addExpense: function () {
                var newExpense = {
                    name: this.name,
                    isMandatory: this.isMandatory
                }
                api.addExpense(newExpense).then((addedExpense) => {
                    this.$store.commit('addExpense', addedExpense)
                }).catch((error) => {
                    this.error = error
                })
            }
        }
    }

</script>

<style scoped>
    label {
        display: inline-block;
        width: 100px;
    }
    
    input {
        width: 200px;
    }
</style>