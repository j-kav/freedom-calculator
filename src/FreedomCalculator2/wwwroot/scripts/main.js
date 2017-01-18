import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'
import Home from './Home.vue';
import Login from './Login.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
];

const router = new VueRouter({
    routes,
});

new Vue({
   router,
   render: h => h(App)
}).$mount('#app');