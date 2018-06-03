
export default {
    state: {
        count: 0,
        list: []
    },
    getters: {
        count: state => state.count,
        list: state => state.list
    },

    mutations: {
        increment(state, payload) {
            state.count+=1;
        },
        decrement(state, payload) {
            state.count-=1;
        },
        getDate(state, payload) {
            state.list = payload
        }
    },
    actions: {
        async getData({commit}) {
            let result = await this.$http('https://api.github.com/users');
            commit('getDate', result.data)

            // this.$http('https://api.github.com/users')
            //     .then(res => {
            //         commit('getDate', res.data)
            //     });;
        }
    }
}