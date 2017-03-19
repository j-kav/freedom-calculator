<template>
    <tr>
        <td><input v-model="liability.name"></input></td>
        <td><input v-model="liability.principal"></input></td>
        <td><button v-on:click.prevent=updateLiability()>Update</button></td>
        <td><button v-on:click.prevent=removeLiability()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Liability',
        data: function () {
            return {
                error: false,
                message: null,
                liability: this.liabilityModel
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
        props: ['liabilityModel'],
        methods: {
            updateLiability: function () {
                api.updateLiability(this.liability.liabilityId, this.liability).then(() => {
                    this.$store.commit('updateLiability', this.liability)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeLiability: function () {
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

</script>