<template lang="html">
    <div>
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

        <ul class="list">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
        <br>
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



