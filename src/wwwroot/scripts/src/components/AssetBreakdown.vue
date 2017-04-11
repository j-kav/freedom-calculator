<template>
    <div>
        <p>Asset Breakdown</p>
        <router-link v-if="$store.state.isLoggedIn" to="/statistics">Back to Statistics</router-link>
    </div>
</template>

<script>
    export default {
        name: 'AssetBreakdown'
    }
</script>