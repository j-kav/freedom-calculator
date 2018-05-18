<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Principal</th>
                    <th/>
                    <th/>
                </tr>
            </thead>
            <tbody>
                <liability v-for="liability in $store.state.liabilities"
                           :key="liability.liabilityId"
                           :liability-model="liability"/>
            </tbody>
        </table>
        <h3>Add new</h3>
        <div>
            <label>Name</label><input v-model="name">
        </div>
        <div>
            <label>Principal</label><input v-model="principal">
        </div>
        <br>
        <button @click.prevent="addLiability">Submit</button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
<script>
import api from '../api'
import Liability from './Liability.vue'

export default {
    name: 'Liabilities',
    components: {
        liability: Liability
    },
    data() {
        return {
            name: '',
            principal: 0,
            error: null
        }
    },
    methods: {
        async addLiability() {
            const newLiability = {
                name: this.name,
                principal: this.principal
            }
            try {
                const addedLiability = await api.addLiability(newLiability)
                this.$store.commit('addLiability', addedLiability)
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