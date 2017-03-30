<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        <div>Add new</div>
        <div>
            <label>Date</label><input v-model="date"></input>
        </div>
        <button v-on:click.prevent=addBudget>Submit</button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
<script>
    import api from '../api'

    export default {
        name: 'Budgets',
        components: {
        },
        data: function () {
            return {
                Date: '',
                error: null
            }
        },
        methods: {
            addBudget: function () {
                var newBudget = {
                    date: this.date
                }
                api.addBudget(newBudget).then((addedBudget) => {
                    // this.$store.commit('addBudget', addedBudget)
                }).catch((error) => {
                    this.error = error
                })
            }
        }
    }

</script>