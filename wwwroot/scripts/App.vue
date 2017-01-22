<template>
    <div id="#app">
        <h1>Freedom Calculator</h1>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>