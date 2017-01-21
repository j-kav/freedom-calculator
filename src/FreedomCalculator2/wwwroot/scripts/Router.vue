<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import Home from './Home.vue'
    import Login from './Login.vue'
    import Register from './Register.vue'

    Vue.use(VueRouter)

    const routes = [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register }
    ]

    const router = new VueRouter({
        routes
    })

    export default router
</script>