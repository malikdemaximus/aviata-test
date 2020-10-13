import Vue from 'vue'
import Vuex from 'vuex'
import results from '../data/results'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        flights: null,
        filteredFlights: null,
        airlines: null
    },
    getters: {
        getFlights: state => state.flights,
        getFilteredFlights: state => state.filteredFlights,
        getAirlines: state => state.airlines,
    },
    mutations: {
        fetchFlights(state, flights){
            state.flights = flights
        },
        changeFlights(state, flights){
            state.filteredFlights = flights
        },
        fetchAirlines(state, airlines){
            state.airlines = airlines
        },
    },
    actions: {
        fetchResults({commit}) {
            commit('fetchFlights', results.flights)
            commit('changeFlights', results.flights)
            commit('fetchAirlines', results.airlines)
        },
        changeFlights({commit}, data){
            commit('changeFlights', data)
        },

    },
    modules: {
    }
})
