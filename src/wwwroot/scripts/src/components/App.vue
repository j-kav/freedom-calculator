<template>
    <div id="#app">
        <h1>Freedom Calculator</h1>
        <nav id="top-nav">
            <router-link v-if="!$store.state.isLoggedIn" to="/" exact @click.native="toggleResponsiveMenu">Home</router-link>
            <router-link v-if="!$store.state.isLoggedIn" to="/login" @click.native="toggleResponsiveMenu">Login</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/statistics" @click.native="toggleResponsiveMenu">Statistics</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.assets" to="/assets" @click.native="toggleResponsiveMenu">Assets</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.liabilities" to="/liabilities" @click.native="toggleResponsiveMenu">Liabilities</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.expenses" to="/expenses" @click.native="toggleResponsiveMenu">Expenses</router-link>
            <router-link v-if="$store.state.isLoggedIn && $store.state.budgets" to="/budgets" @click.native="toggleResponsiveMenu">Budgets</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/user" @click.native="toggleResponsiveMenu">Profile</router-link>
            <a v-if="$store.state.isLoggedIn" href="#" @click="logout">Logout</a>
            <a href="javascript:void(0);" class="hamburger-icon" @click="toggleResponsiveMenu">&#9776;</a>
        </nav>
        <router-view/>
        <session-monitor/>
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
        logout() {
            this.$store.commit('logout')
            this.$router.push('/')
        },
        toggleResponsiveMenu() {
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
    margin-bottom: 20px;
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

#top-nav a.hamburger-icon {
    font-size: 15px;
}

.router-link-active {
    background-color: #4caf50;
    color: white;
}

#top-nav .hamburger-icon {
    display: none;
}

@media screen and (max-width: 680px) {
    #top-nav a {
        display: none;
    }
    #top-nav a.router-link-active {
        display: block;
    }
    #top-nav a.hamburger-icon {
        float: right;
        display: block;
    }
    #top-nav.responsive {
        position: relative;
    }
    #top-nav.responsive a.hamburger-icon {
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