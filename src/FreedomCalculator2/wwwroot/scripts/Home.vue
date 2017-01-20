<template>
    <div>
        <p>Hello home!!</p>
        <button v-on:click.prevent="test">test</button>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        methods: {
            test: function() {
                alert('test');
            }
        }
    }
</script>