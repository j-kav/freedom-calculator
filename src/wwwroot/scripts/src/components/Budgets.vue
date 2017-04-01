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
                error: null
            }
        },
        methods: {
            addBudget: function () {
                var date = new Date()
                var datestring = date.toISOString()
                var newBudget = {
                    date: datestring
                }
                // return promise for unit testing purposes
                var p = new Promise((resolve, reject) => {
                    api.addBudget(newBudget).then((addedBudget) => {
                        this.$store.commit('addBudget', addedBudget)
                        resolve()
                    }).catch((error) => {
                        this.error = error
                        reject(error.message) // TODO sanitize error
                    })
                })
                return p
            }
        }
    }

</script>