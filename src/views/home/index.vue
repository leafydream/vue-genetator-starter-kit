<template lang="html">
    <div>
        <p> {{ counter }}</p>
        <ul>
            <li v-for="item of list" :key="item.id">
                <span>{{item.id}}</span>
                <p>{{item.login}}</p>
                <img :src="item.avatar_url" alt="">
            </li>
        </ul>
        <br>
        <button @click="incrementCount">increment</button>
        <button @click="decrementCount">decrement</button>
        <button @click="fetchData">getData</button>
    </div>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    export default {
        name: "",
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
            // incrementCount() {
            //    //this.$store.commit('increment');
            // },
            // decrementCount() {
            //     //this.$store.commit('decrement');
            // }

           


        },
    }
</script>

