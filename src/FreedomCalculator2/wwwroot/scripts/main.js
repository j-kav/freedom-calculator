import Vue from 'vue';
import App from './App.vue'
import router from './Router.vue';

window.router = router;

new Vue({
    name: 'Main',
    router,
    render: h => h(App)
}).$mount('#app');