<template>
    <tr>
        <td><input v-model="liability.name" v-on:change.prevent=updateLiability()></input>
        </td>
        <td><input v-model="liability.principal" v-on:change.prevent=updateLiability()></input>
        </td>
        <td><input type="image" class="deleteButton" v-on:click.prevent=removeLiability() src="images/delete.png" /></td>
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