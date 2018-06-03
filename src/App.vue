<template lang="html">
    <div id="app">
        <h1 class="title">title</h1>
         <router-link to="/home">home</router-link>
         <router-link to="/about">about</router-link>
        <router-view />
    </div>
</template>

<script>
    import Home from './views/home';

    export default {
        components: {
            Home
        }
    }
</script>

<style lang="scss">
    @import "./assets/css/rest.scss";
    #app {
        background: red;
        .title {
            font-size: 80px;
            height: 100px;
        }
    }
</style>


