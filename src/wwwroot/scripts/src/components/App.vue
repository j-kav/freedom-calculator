<template>
    <div id="#app">
        <h1>Freedom Calculator</h1>
        <nav id="top-nav">
            <router-link v-if="!$store.state.isLoggedIn" to="/login">Login</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/statistics">Statistics</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.assets" to="/assets">Assets</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.liabilities" to="/liabilities">Liabilities</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.expenses" to="/expenses">Expenses</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.budgets" to="/budgets">Budgets</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/user">Profile</router-link>
            <a href="#" v-if="$store.state.isLoggedIn" v-on:click="logout">Logout</a>
            </router-link>
            <a href="javascript:void(0);" class="icon" v-on:click="toggleResponsiveMenu">&#9776;</a>
        </nav>
        <router-view></router-view>
        <session-monitor></session-monitor>
    </div>
</template>

<script>
    import SessionMonitor from './SessionMonitor.vue'

    export default {
        name: 'App',
        components: {
            'session-monitor': SessionMonitor
        },
        methods: {
            logout: function () {
                this.$store.commit('logout')
                this.$router.push('/')
            },
            toggleResponsiveMenu: () => {
                const menu = document.getElementById('top-nav')
                if (menu.classList.contains('responsive')) {
                    menu.classList.remove('responsive')
                } else {
                    menu.classList.add('responsive')
                }
            }
        }
    }
</script>