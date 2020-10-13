<template>
    <div>
        <form class="tariff-options">
            <h3>Опции тарифа</h3>
            <div class="tariff-option">
                <input type="checkbox" id="straight" v-model="straight" value="straight">
                <label for="straight"> Только прямые</label><br>
            </div>
            <div class="tariff-option">
                <input type="checkbox" id="baggage" v-model="baggage" value="baggage">
                <label for="baggage"> Только с багажом</label><br>
            </div>
            <div class="tariff-option">
                <input type="checkbox" id="refundable" v-model="refundable" value="refundable">
                <label for="refundable"> Только возвратные</label>
            </div>
        </form>
        <form class="tariff-options">
            <h3>Авиакомпании</h3>
            <!--<div class="tariff-option">
                <input type="checkbox" @click="addCodes('all')" checked id="avia" name="airline" value="airline">
                <label for="airline"> Все</label><br>
            </div>-->
            <div :key="key" class="tariff-option" v-for="(value, key) in airlines">
                <input type="checkbox" @click="addCodes(key)" :id="'airline' + key" :name="'airline' + key" value="Bike">
                <label :for="'airline' + key"> {{ value }}</label><br>
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        data () {
          return {
              refundable: false,
              baggage: false,
              straight: false,
              codeArray: []
          }
        },
        computed: {
            filteredData() {
                return this.flights.filter(item => {
                    return this.filterRefundable(item) && this.filterBaggage(item) && this.filterStraight(item) && this.filterCodes(item)
                })
            }
        },
        watch: {
            refundable() {
                this.$store.dispatch('changeFlights', this.filteredData);
            },
            baggage() {
                this.$store.dispatch('changeFlights', this.filteredData);
            },
            straight() {
                this.$store.dispatch('changeFlights', this.filteredData);
            }
        },
        name: 'FilterTickets',
        props: [
            'airlines',
            'flights'
        ],
        methods: {
            filterRefundable(item) {
                if (this.refundable) {
                    return item.refundable;
                }
               return item.refundable || !item.refundable
            },
            filterBaggage(item) {
                if (this.baggage) {
                    return Object.keys(item.services)[0] !== '0PC';
                }
                return Object.keys(item.services)[0] !== '0PC' || Object.keys(item.services)[0] === '0PC';
            },
            filterStraight(item) {
                if (this.straight) {
                    return item.itineraries[0][0].stops === 0;
                }
                return item.itineraries[0][0].stops === 0 || item.itineraries[0][0].stops !== 0

            },
            addCodes(key) {
                if (key === 'all') {
                    this.codeArray = [];
                } else if (this.codeArray.includes(key)) {
                    let index = this.codeArray.indexOf(key);
                    this.codeArray.splice(index, 1);
                } else {
                    this.codeArray.push(key);
                }
                this.$store.dispatch('changeFlights', this.filteredData);
            },
            filterCodes(item) {
                if (this.codeArray.length >= 1) {
                    return this.codeArray.includes(item.validating_carrier)
                } else {
                    return true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tariff-options {
        background: #F5F5F5;
        border-radius: 4px;
        padding: 12px;
        width: 240px;
        margin-bottom: 12px;
    }

    h3 {
        font-size: 14px;
        font-weight: 700;
        padding-bottom: 12px;
    }

    .tariff-option {
        margin-bottom: 10px;
        font-size: 12px;
        display: flex;
        align-items: center;

        input {
            margin: 0;
            margin-right: 12px;
            background-color: #55BB06;
        }
    }

</style>
