<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mandatory</th>
                    <th/>
                    <th/>
                </tr>
            </thead>
            <tbody>
                <expense
                    v-for="expense in $store.state.expenses"
                    :key="expense.expenseId"
                    :expense-model="expense"/>
            </tbody>
        </table>
        <h3>Add new</h3>
        <div>
            <label>Name</label><input v-model="name">
        </div>
        <div>
            <label>Mandatory?</label>
            <input
                v-model="isMandatory"
                type="checkbox">
        </div>
        <br>
        <button @click.prevent="addExpense">Submit</button>
        <div
            v-if="error"
            class="error">{{ error }}
        </div>
    </div>
</template>
<script>
import api from '../api'
import Expense from './Expense.vue'

export default {
    name: 'Expenses',
    components: {
        expense: Expense
    },
    data() {
        return {
            name: '',
            isMandatory: false,
            error: null
        }
    },
    methods: {
        async addExpense() {
            const newExpense = {
                name: this.name,
                isMandatory: this.isMandatory
            }
            try {
                const addedExpense = await api.addExpense(newExpense)
                this.$store.commit('addExpense', addedExpense)
            } catch (error) {
                this.error = error
            }
        }
    }
}
</script>

<style scoped>
label {
    display: inline-block;
    width: 100px;
}
</style>