<template>
    <div id="app">
        <h1 class="title">title</h1>
        <router-link to="/">home</router-link>
        <router-link to="/about">about</router-link>
        <router-view />
    </div>
</template>

<script>
    import Home from '@/views/home';

    export default {
        components: {
            Home
        }
    }
</script>

<style lang="scss">
    
    #app {
        .title {
            font-size: 80px;
            height: 100px;
        }
    }
</style>


