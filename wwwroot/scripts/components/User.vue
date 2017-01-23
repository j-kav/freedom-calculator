<template>
    <div>
        <textarea v-model="userData"></textarea>
        <button v-on:click.prevent="getUser">Get User</button>
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: 'Login',
        data: function () {
            return {
                userData: ''
            }
        },
        methods: {
            getUser: function () {
                var self = this
                api.getUser().then(function (data) {
                    self.userData = data
                }).catch(function (error) {
                    window.alert(error)
                })
            }
        }
    }
</script>