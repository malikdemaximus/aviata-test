<template>
    <div>
        <div class="container-result">
            <FilterTickets :flights="flights" :airlines="airlines"/>
            <div class="tickets">
                <TicketCard :key="index" :ticket="ticket" v-for="(ticket, index ) in filteredData" />
            </div>
        </div>
    </div>
</template>

<script>
    import FilterTickets from '@/components/FilterTickets.vue'
    import TicketCard from '@/components/TicketCard.vue'

    export default {
        name: 'Results',
        data() {
          return {
          }
        },
        computed: {
            flights() {
                return this.$store.getters['getFlights']
            },
            filteredData() {
                return this.$store.getters['getFilteredFlights']
            },
            airlines() {
                return this.$store.getters['getAirlines']
            }
        },
        created() {
          this.$store.dispatch('fetchResults');
        },

        components: {
            FilterTickets,
            TicketCard
        }
    }
</script>

<style lang="scss" scoped>
    .container-result {
        width: 1140px;
        margin: 50px auto;
        display: flex;
        justify-content: space-between;
    }
</style>
