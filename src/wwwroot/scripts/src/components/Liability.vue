<template>
    <tr>
        <td><input v-model="liability.name" @change.prevent=updateLiability()></td>
        <td><input v-model="liability.principal" @change.prevent=updateLiability()></td>
        <td><input type="image" class="deleteButton" @click.prevent=removeLiability() src="images/delete.png" /></td>
        <td v-if="error && message" class="error">{{ message }}</td>
        <td v-else-if="message" class="success-icon-container"><img src="images/success.png" class="success-icon" /></td>
    </tr>
</template>

<script>
import api from '../api'

export default {
    name: 'Liability',
    data() {
        return {
            error: false,
            message: null,
            liability: this.liabilityModel
        }
    },
    props: ['liabilityModel'],
    methods: {
        async updateLiability() {
            try {
                await api.updateLiability(this.liability.liabilityId, this.liability)
                this.$store.commit('updateLiability', this.liability)
                this.error = false
                this.message = 'updated'
            } catch (error) {
                this.error = true
                this.message = error
            }
        },
        async removeLiability() {
            if (window.confirm('Are you sure?')) {
                try {
                    await api.removeLiability(this.liability.liabilityId)
                    this.$store.commit('removeLiability', this.liability.liabilityId)
                    this.error = false
                } catch (error) {
                    this.error = true
                    this.message = error
                }
            }
        }
    }
}
</script>