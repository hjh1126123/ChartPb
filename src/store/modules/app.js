export default {
    state: {
        last_year: '2018',
        this_year: '2019'
    },
    mutations: {
        setYear(state, year) {
            state.this_year = year;
            state.last_year = (Number.parseInt(year) - 1) + '';
        }
    },
    actions: {
        setYear({commit}, year) {
            commit('setYear', year);
        }
    }
}