<template>
    <div class="ticket-card">
        <div class="left-card">
            <div class="ticket-info">
                <div class="logo">
                    <img :src="'https://aviata.kz/static/airline-logos/80x80/' + ticket.itineraries[0][0].carrier + '.png'" alt="">
                    <p>{{ ticket.itineraries[0][0].carrier_name }}</p>
                </div>
                <div class="datetime">
                    <p class="date"> {{ ticket.itineraries[0][0].segments[0].dep_time | date }}</p>
                    <p class="time">{{ ticket.itineraries[0][0].segments[0].dep_time | time }}</p>
                </div>
                <div class="directions">
                    <div class="cities">
                        <span class="city">{{ ticket.itineraries[0][0].segments[0].origin_code }}</span>
                        <p class="dur">4 ч 20 м</p>
                        <span class="city">{{ ticket.itineraries[0][0].segments[ticket.itineraries[0][0].segments.length - 1].dest_code }}</span>
                    </div>
                    <div class="direction-line">
                        <div class="dir-circle"></div>
                        <div class="dir-circle"></div>
                        <div class="dir-circle"></div>
                    </div>
                    <p class="add-city" v-if="ticket.itineraries[0][0].stops === 1">через {{ ticket.itineraries[0][0].segments[0].dest }}, 1 ч 50 м</p>
                    <p class="add-city" v-else-if="ticket.itineraries[0][0].stops === 0">Прямой рейс</p>
                </div>
                <div class="datetime">
                    <p class="date">{{ ticket.itineraries[0][0].segments[0].arr_time | date }}</p>
                    <p class="time">{{ ticket.itineraries[0][0].segments[0].arr_time | time }}</p>
                </div>
            </div>
            <div class="ticket-add-info">
                <a class="detail">Детали перелета</a>
                <a class="detail">Условия тарифа</a>
                <div class="return" v-if="ticket.itineraries[0][0].refundable === false">
                    <img src="../assets/images/unreturn.svg" alt="">
                    <p>невозвратный</p>
                </div>
            </div>
        </div>
        <div class="right-card">
            <h4 class="price">{{ ticket.price }} ₸</h4>
            <button class="select-btn">Выбрать</button>
            <span class="info-price">Цена за всех пассажиров</span>
            <div class="baggage-info">
                <p class="baggage">Нет багажа</p>
                <p class="add-bag">+ Добавить багаж</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TicketCard',
        props: [
            'ticket'
        ],
        filters: {
            time(val) {
                let date = val.split(" ");
                let time = date[3];
                return time
            },

            date(val) {
                let date = val.split(" ");
                let day = date[0];
                let month = date[1];
                let weekday = date[2];
                return day + ' ' + month + ' ' + weekday
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ticket-card {
        width: 880px;
        display: flex;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        background-color: #fff;
        margin-bottom: 12px;
    }

    .left-card {
        width: 75%;
        padding: 40px 40px 18px 40px;
    }
    .right-card {
        background-color: #F5F5F5;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }
    .ticket-info {
        display: flex;
        align-items: center;

        .logo {
            padding-right: 30px;
            display: flex;
            align-items: center;
            img {
                width: 20px;
                margin-right: 12px;
            }

            p {
                font-size: 14px;
                font-weight: 600;
            }
        }

        .datetime {
            padding-right: 30px;

            .date {
                font-size: 12px;
                line-height: 16px;
                padding-bottom: 5px;
            }

            .time {
                font-weight: 600;
                font-size: 24px;
            }
        }

        .directions {
            display: flex;
            flex-direction: column;
            padding-right: 30px;
            width: 200px;

            .cities {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 5px;
            }
            .city {
                font-size: 10px;
                color: #B9B9B9;
            }
            .dur {
                font-size: 12px;
                line-height: 18px;
            }

            .add-city {
                font-size: 12px;
                color: #FF9900;
                margin: 0 auto;
                padding: 0 10px;
            }
        }
    }

    .direction-line {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 0;
        margin-bottom: 4px;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 48%;
            height: 1px;
            width: 100%;
            background-color: #B9B9B9;
        }

        .dir-circle {
            width: 5px;
            height: 5px;
            border: 1px solid #B9B9B9;
            border-radius: 50%;
            background-color: #fff;
            z-index: 1;
        }
    }

    .ticket-add-info {
        display: flex;
        padding-top: 45px;
        align-items: center;

        .detail {
            font-size: 12px;
            color: #7284E4;
            border-bottom: 1px dashed #B8C1F2;
            margin-right: 25px;
        }

        .return {
            display: flex;
            align-items: center;
            p {
                color: #707276;
                font-size: 12px;
                padding-left: 8px;
            }
        }
    }

    .right-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        text-align: center;

        .price {
            font-size: 24px;
            padding-bottom: 13px;
        }

        .select-btn {
            background: #55BB06;
            border-radius: 4px;
            width: 200px;
            font-size: 18px;
            color: #fff;
            padding: 8px;
            text-align: center;
            outline: none;
            margin-bottom: 10px;
            font-weight: 700;
            border: none;
        }

        .info-price {
            color: #707276;
            font-size: 12px;
        }
        .baggage-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 10px;

            .baggage {
                font-size: 12px;
            }

            .add-bag {
                color: #5763B3;
                font-size: 12px;
                font-weight: 600;
                padding: 5px 12px;
                background: #EAF0FA;
                border-radius: 2px;
                cursor: pointer;
            }
        }
    }
</style>
