<!--选择时分-->
<template>
    <div class="d-date-time-time-content">
        <div class="d-date-time-item-wrap">
            <div @click="changeHour('last')">
                <i class="iconfont icon-arrow icon-up"></i>
            </div>

            <div class="d-date-time-item">
                <div class="d-date-time-cell">{{hour1}}</div>
                <div class="d-date-time-cell">{{hour2}}</div>
            </div>

            <div @click="changeHour('next')">
                <slot name="nextMinutes">
                    <i class="iconfont icon-arrow icon-down"></i>
                </slot>
            </div>
        </div>

        <div class="d-date-time-time-dot">:</div>

        <div class="d-date-time-item-wrap">
            <div @click="changeMinute('last')">
                <i class="iconfont icon-arrow icon-up"></i>
            </div>
            <div class="d-date-time-item">
                <div class="d-date-time-cell">{{minutes1}}</div>
                <div class="d-date-time-cell">{{minutes2}}</div>
            </div>
            <div @click="changeMinute('next')">
                <slot name="nextMinutes">
                    <i class="iconfont icon-arrow icon-down"></i>
                </slot>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script>
    import time from '../utils/dateTime'

    export default {
        name: 'dDateTimePickHm',
        data () {
            return {
                show: true,
                docState: 'saved'
            }
        },
        props: {
            date: {
                type: Date,
                default: new Date()
            }
        },
        computed: {
            buttonMessage () {
                switch (this.docState) {
                    case 'saved':
                        return 'Edit'
                    case 'edited':
                        return 'Save'
                    case 'editing':
                        return 'Cancel'
                }
            },
            hour1 () {
                return String(time.formatTime(this.date.getHours())).charAt(0)
            },
            hour2 () {
                return String(time.formatTime(this.date.getHours())).charAt(1)
            },
            minutes1 () {
                return String(time.formatTime(this.date.getMinutes())).charAt(0)
            },
            minutes2 () {
                return String(time.formatTime(this.date.getMinutes())).charAt(1)
            }
        },
        methods: {
            change () {
                this.show = !this.show
            },
            changeHour (param) {
                this.$emit('changeHour', param)
            },
            changeMinute (param) {
                this.$emit('changeMinute', param)
            }
        },
        components: {
//      MScroll
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .d-date-time-time-content {
        display: flex;
        justify-content: center;
        i {
            font-size: 26px;
            color: #a2a2a2;
            display: inline-block;
            width: 158px;
            text-align: center;
            z-index: 100;
            line-height: 40px;
            touch-action: none;
        }
        .d-date-time-time-dot {
            font-size: 60px;
            color: #a2a2a2;
            line-height: 150px;
            position: absolute;
        }
        .d-date-time-item-wrap {
            flex-direction: column;
            width: 158px;
            .icon-up {
                transform: rotate(-90deg);
            }
            .icon-down {
                transform: rotate(90deg);
            }
        }
        .d-date-time-item {
            display: flex;
            justify-content: center;
            .d-date-time-cell {
                color: #a2a2a2;
                font-size: 90px;
                position: relative;
                transition: all 300ms ease-in-out;
            }
        }

        /* 可以设置不同的进入和离开动画 */
        /* 设置持续时间和动画函数 */
        .slide-fade-enter-active {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: 1;
            transform: translateY(0);
            transition: all .3s ease-in-out;
        }
        .slide-fade-leave-active {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: 1;
            transform: translateY(0);
            transition: all .3s ease-in-out;
        }
        .slide-fade-enter, .slide-fade-leave-to
            /* .slide-fade-leave-active for below version 2.1.8 */
        {
            /*transform: translateX(10px);*/
            opacity: 0;
        }
    }
</style>
