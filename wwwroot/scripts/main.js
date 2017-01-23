import Vue from 'vue';
import App from './components/App.vue'
import router from './components/Router.vue';

new Vue({
    name: 'Main',
    router,
    render: h => h(App)
}).$mount('#app')
