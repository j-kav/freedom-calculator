<template>
    <tr>
        <td><input v-model="liability.name" v-on:change.prevent=updateLiability()></td>
        <td><input v-model="liability.principal" v-on:change.prevent=updateLiability()></td>
        <td><input type="image" class="deleteButton" v-on:click.prevent=removeLiability() src="images/delete.png" /></td>
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
            updateLiability() {
                api.updateLiability(this.liability.liabilityId, this.liability).then(() => {
                    this.$store.commit('updateLiability', this.liability)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeLiability() {
                if (window.confirm('Are you sure?')) {
                    api.removeLiability(this.liability.liabilityId).then(() => {
                        this.$store.commit('removeLiability', this.liability.liabilityId)
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