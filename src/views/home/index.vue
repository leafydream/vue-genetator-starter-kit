<template lang="html">
    <div class="container">
        <p> {{ counter }}</p>
        <div>
            <button @click="incrementCount">increment</button>
            <button @click="decrementCount">decrement</button>
            <button @click="fetchData">getData</button>
        </div>
        <ul>
            <li v-for="item of list" :key="item.id">
                <span>{{item.id}}</span>
                <p>{{item.login}}</p>
                <img :src="item.avatar_url" alt="">
            </li>
        </ul>
        <img src="../../assets/images/logo.png" alt="">  
    </div>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    export default {
        data() {
            return {
                
            }
        },
        computed: {
            ...mapGetters({
                counter: 'count',
                list: 'list'
            })
        },
        methods: {
            ...mapMutations({
                incrementCount: 'increment',
                decrementCount: 'decrement',

            }),
            ...mapActions({
                fetchData: 'getData'
            }),
        },
    }
</script>

<style>
    
    .container {
        font-size: 50px;
        display: flex;
        border-radius: 5px;
    }
</style>




