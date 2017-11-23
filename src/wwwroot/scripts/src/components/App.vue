<template>
    <div id="#app">
        <h1>Freedom Calculator</h1>
        <nav>
            <router-link v-if="!$store.state.isLoggedIn" to="/login">Login</router-link>
            <a href="#" v-if="$store.state.isLoggedIn" v-on:click="logout">Logout</a></router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/statistics">Statistics</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.assets" to="/assets">Assets</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.liabilities" to="/liabilities">Liabilities</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.expenses" to="/expenses">Expenses</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.budgets" to="/budgets">Budgets</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/user">Profile</router-link>
        </nav>
        <router-view></router-view>
        <modal v-if="showSessionTimingout" @close="extendSession()">
            <h3 slot="header">Session Timing Out</h3>
            <div slot="body">Your session is going to timeout. Click OK to extend.</div>
        </modal>
    </div>
</template>

<script>
    import api from '../api'
    import Modal from './Modal.vue'

    export default {
        name: 'App',
        components: {
            'modal': Modal
        },
        methods: {
            logout: function () {
                this.$store.commit('logout')
            },
            extendSession: function () {
                api.refreshToken().then((expirationDate) => {
                    this.$store.commit('login', expirationDate)
                })
            }
        },
        computed: {
            showSessionTimingout: function () {
                return this.$store.state.sessionExpiring
            }
        }
    }
</script>