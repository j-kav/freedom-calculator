<template>
    <div id="#app">
        <h1>Freedom Calculator</h1>
        <nav id="top-nav">
            <router-link v-if="!$store.state.isLoggedIn" to="/login" v-on:click.native="toggleResponsiveMenu">Login</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/statistics" v-on:click.native="toggleResponsiveMenu">Statistics</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.assets" to="/assets" v-on:click.native="toggleResponsiveMenu">Assets</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.liabilities" to="/liabilities" v-on:click.native="toggleResponsiveMenu">Liabilities</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.expenses" to="/expenses" v-on:click.native="toggleResponsiveMenu">Expenses</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.budgets" to="/budgets" v-on:click.native="toggleResponsiveMenu">Budgets</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/user" v-on:click.native="toggleResponsiveMenu">Profile</router-link>
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

<style scoped=true>
    #top-nav {
        background-color: #333;
        overflow: hidden;
    }

    #top-nav a {
        float: left;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
    }

    .router-link-active {
        background-color: #4CAF50;
        color: white;
    }

    #top-nav a:hover {
        background-color: #ddd;
        color: black;
    }

    #top-nav .icon {
        display: none;
    }

    @media screen and (max-width: 680px) {
        #top-nav a {
            display: none;
        }
        #top-nav a.icon {
            float: right;
            display: block;
        }
        #top-nav.responsive {
            position: relative;
        }
        #top-nav.responsive a.icon {
            position: absolute;
            right: 0;
            top: 0;
        }
        #top-nav.responsive a {
            float: none;
            display: block;
            text-align: left;
        }
    }
</style>