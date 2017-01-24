<template>
    <div id="#app">
        <h1>Freedom Calculator</h1>
        <nav>
            <router-link to="/login">Login</router-link>
            <router-link to="/">Home</router-link>
            <router-link v-if="$store.state.isLoggedIn" to="/user">Profile</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>