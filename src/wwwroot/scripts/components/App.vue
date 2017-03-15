<template>
    <div id="#app">
        <h1>Freedom Calculator 2</h1>
        <nav>
            <router-link v-if="!$store.state.isLoggedIn" to="/login">Login</router-link>
            <a href="#" v-if="$store.state.isLoggedIn" v-on:click="logout">Logout</a></router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/statistics">Statistics</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.assets" to="/assets">Assets</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.liabilities" to="/liabilities">Liabilities</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.expenses" to="/expenses">Expenses</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/user">Profile</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            logout: function () {
                this.$store.commit('logout')
                this.$router.push('/')
            }
        }
    }
</script>