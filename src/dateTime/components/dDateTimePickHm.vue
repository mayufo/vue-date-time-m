<!--选择时分-->
<template>
    <div class="d-date-time-time-content">
        <div ref="scrollHours" class="scroll hours-wrap" :class="{hoursWrap: type !== 'noMinute'}">
            <ul class="scroll-wrapper">
                <li v-for="(item, index) in hoursArr"
                    :key="index"
                    class="hours-item"
                    @click="select(item, index, 'hour')">
                    <!--选中-->
                    <div v-if="item.isSelect"
                         class="selected"
                         :style="{color: color}">{{item.value}}
                    </div>
                    <!--没有选中-->
                    <div v-else :class="{disable: !item.able}">{{item.value}}</div>
                </li>
            </ul>
        </div>
        <div ref="scrollMinutes" class="scroll minutes-wrap" v-show="type === 'time' || type === 'dateTime'">
            <ul class="scroll-wrapper">
                <li v-for="(item, index) in minutesArr"
                    :key="index"
                    class="minutes-item"
                    :class="{selected: item.isSelect}"
                    @click="select(item, index, 'minute')">
                    <!--选中-->
                    <div v-if="item.isSelect"
                         class="selected"
                         :style="{color: color}">{{item.value}}
                    </div>
                    <!--没有选中-->
                    <div v-else :class="{disable: !item.able}">{{item.value}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'dDateTimePickHm',
        props: {
            type: {
                type: String
            },
            hoursArr: {
                type: Array,
                default: () => []
            },
            minutesArr: {
                type: Array,
                default: () => []
            },
            color: {type: String, 'default': '#50c7a7'},
            minutesInterval: {type: [Number], 'default': 1}
        },
        mounted() {
            this.scrollHours = new BScroll(this.$refs.scrollHours, {
                mouseWheel: true,
                probeType: 3,
                click: true
            })
            if (this.type === 'dateTime' || this.type === 'time') {
                this.scrollMinutes = new BScroll(this.$refs.scrollMinutes, {
                    mouseWheel: true,
                    probeType: 3,
                    click: true
                })
            }

            setTimeout(() => {
                this.scrollHour()
                if ((this.type === 'dateTime' || this.type === 'time') && this.minutesInterval < 15) {
                    this.scrollMinute()
                }
            }, 200)
        },
        methods: {
            select(item, index, type) {
                if (item.able) {
                    this.$emit('click', index, type)
                }
            },
            scrollHour() {
                let index = this.hoursArr.findIndex((item) => {
                    return item.isSelect
                })
                if (index > 3 && index < this.hoursArr.length - 4) {
                    this.scrollHours.scrollTo(0, 0 - document.querySelector('.hours-wrap .selected').getBoundingClientRect().top + (document.documentElement.clientHeight / 2), 300, 'bounce')
                } else if (index >= this.hoursArr.length - 4) {
                    this.scrollHours.scrollTo(0, 0 - document.querySelector('.hours-wrap .selected').getBoundingClientRect().top + (document.documentElement.clientHeight / 2 + 90), 300, 'bounce')
                }
            },
            scrollMinute() {
                let index = this.minutesArr.findIndex((item) => {
                    return item.isSelect
                })
                if (index > 3 && index < this.minutesArr.length - 4) {
                    this.scrollMinutes.scrollTo(0, 0 - document.querySelector('.minutes-wrap .selected').getBoundingClientRect().top + (document.documentElement.clientHeight / 2), 300, 'bounce')
                } else if (index >= this.minutesArr.length - 4) {
                    this.scrollMinutes.scrollTo(0, 0 - document.querySelector('.minutes-wrap .selected').getBoundingClientRect().top + (document.documentElement.clientHeight / 2 + 90), 300, 'bounce')
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .d-date-time-time-content {
        overflow: hidden;
        display: flex;
        height: 260px;
        -webkit-overflow-scrolling: touch;
        position: relative;
        padding: 36px 0 0 0;
        justify-content: center;

        .hoursWrap {
            margin-right: 60px;
        }
        .scroll {
            background-color: #fff;
            top: 0;
            left: 0;
            overflow: hidden;
            .scroll-wrapper {
                display: flex;
                overflow: hidden;
                flex-wrap: wrap;
                flex-direction: column;
                .hours-item {
                    line-height: 1.5;
                    cursor: pointer;
                    > div {
                        font-size: 20px;
                        margin: 0 32px;
                    }
                    .selected {
                        font-size: 30px;
                        font-weight: bold;
                        position: relative;
                        left: -6px;
                        transition: font-size .3s;
                    }
                    .disable {
                        color: #b9b9b9;
                    }
                }
                .minutes-item {
                    line-height: 1.5;
                    cursor: pointer;
                    > div {
                        font-size: 18px;
                        margin: 0 32px;
                    }
                    .selected {
                        font-size: 26px;
                        font-weight: bold;
                        position: relative;
                        left: -6px;
                        transition: font-size .3s;
                    }
                    .disable {
                        color: #b9b9b9;
                    }
                }
            }
        }
    }
</style>
