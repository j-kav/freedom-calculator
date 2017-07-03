<template>
    <div>
        <h2>Liabilities</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Principal</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <liability v-for="liability in $store.state.liabilities" v-bind:liabilityModel="liability"></liability>
            </tbody>
        </table>
        <h3>Add new</h3>
        <div>
            <label>Name</label><input v-model="name"></input>
        </div>
        <div>
            <label>Principal</label><input v-model="principal"></input>
        </div>
        <br/>
        <button v-on:click.prevent=addLiability>Submit</button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
<script>
    import api from '../api'
    import Liability from './Liability.vue'

    export default {
        name: 'Liabilities',
        components: {
            'liability': Liability
        },
        data: function () {
            return {
                name: '',
                principal: 0,
                error: null
            }
        },
        methods: {
            addLiability: function () {
                var newLiability = {
                    name: this.name,
                    principal: this.principal
                }
                api.addLiability(newLiability).then((addedLiability) => {
                    this.$store.commit('addLiability', addedLiability)
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