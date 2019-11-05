<template>
    <div class="date-time-wrap">
        <div class="head" :style="activeBg">
            <div class="head-top">
                <i class="iconfont icon-close"></i>
                <div class="year">{{showYear}}</div>
            </div>
            <div class="time">{{showTime}}</div>
        </div>
        <main>
            <div class="month">
                <i class="iconfont icon-arrow invert"></i>
                <div class="show-month">
                    <div class="show-month-content" :style="activeMonth">
                        {{showMonth}}
                    </div>
                </div>
                <i class="iconfont icon-arrow"></i>
            </div>
            <ul class="week">
                <li class="week-item" :key="`week-${index}`" v-for="(item, index) in showWeek"
                    :class="{light: index === 0 || index === 6}">{{item}}
                </li>
            </ul>
            {{selectDay.length}}
            <ul class="day" v-if="selectDay.length > 0">
                <li class="day-item" v-for="(item, index) in selectDay" :key="`day-${index}`"
                    @click="selectDayFn(item, index)">
                    <div class="day-value-wrapper" v-if="item.typeValue === 'normal'">
                        <div class="left"></div>
                        <div class="day-value-content" :class="{light: index % 7 === 0 || index % 7 === 6 }">
                            {{item.value}}
                        </div>
                        <div class="right"></div>
                    </div>

                    <div class="day-value-wrapper select" v-if="item.typeValue === 'start'">
                        <div class="left"></div>
                        <div class="day-value-content" :class="{light: index % 7 === 0 || index % 7 === 6 }">
                            {{item.value}}
                        </div>
                        <div class="right"></div>
                    </div>


                    <div class="day-info" :style="activeFontColor" v-if="item.typeText === 'start'">{{startText}}</div>
                    <div class="day-info" :style="activeFontColor" v-else-if="item.typeText === 'end'">{{endText}}</div>
                </li>
            </ul>
        </main>

        <ul class="quick" :style="activeFontColor">
            <li>今天</li>
            <li>昨天</li>
            <li>最近三天</li>
            <li>最近七天</li>
        </ul>


    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import i18n from '../config/i18n';
    import {DateTime} from 'luxon';

    @Component
    export default class DateTimeM extends Vue {
        private clear: string;
        private showWeek: any[]; // 显示的星期几
        private showYear: number;   // 显示的年
        private showMonth: string;  // 显示的月份
        private time: any;  // 年月日时分秒
        private showTime: string;  // 年月日时分秒
        private selectDay: any[]; // 选择的天
        private startText: string; // 起的文字
        private endText: string;   // 止的文字


        // 时间选择标题
        @Prop({default: 'zh'}) private language!: string;  // 语言
        @Prop({default: '#068eef'}) private activeColor!: string;   // activeColor
        @Prop() private date!: string; // 日期
        created() {
            this.showWeek = i18n[this.language].week;
            this.clear = i18n[this.language].clear;
            this.time = DateTime.local();
            this.showTime = this.time.toFormat(i18n[this.language].format);
            this.showYear = this.time.year;
            this.showMonth = i18n[this.language].month[this.time.month - 1];
            this.selectDay = this.produceDay();
            this.startText = i18n[this.language].start;
            this.endText = i18n[this.language].end;

        }

        // computed
        get activeBg(): string {
            return `background: ${this.activeColor}`;
        }

        get activeFontColor(): string {
            return `color: ${this.activeColor}`;
        }

        get activeMonth(): string {
            return `border: 1px ${this.activeColor} solid; color: ${this.activeColor}`;
        }

        // methods
        // 选择年
        // private selectYear():void {
        //
        // }
        private selectDayFn(item: any, index: number) {
            let arr:any = this.selectDay
            this.selectDay.length = 0

            console.log(this.selectDay, 111);

            // setTimeout(() => {
            //     console.log(arr, this.selectDay);
            //     arr[0].value = 'start'
            //     console.log(arr);
            //     this.selectDay = arr
            // }, 1000)


            // this.$set(this.selectDay, index, item)

        }

        // 生成选择的天数
        private produceDay(): any[] {
            const thisMonth: any[] = this.produceDayArr(DateTime.local(this.time.year, this.time.month).daysInMonth);
            let lastMonth: any[] = this.produceDayArr(DateTime.local(this.time.year, this.time.month - 1).daysInMonth);
            let nextMonth: any[] = this.produceDayArr(DateTime.local(this.time.year, this.time.month + 1).daysInMonth);
            const monthFirstDayWhatDay = DateTime.local(this.time.year, this.time.month, 1).weekday;
            lastMonth = lastMonth.slice(-monthFirstDayWhatDay);
            nextMonth = nextMonth.slice(0, 35 - lastMonth.length - thisMonth.length);
            return [...lastMonth, ...thisMonth, ...nextMonth];
        }

        // 生成天数的数组
        private produceDayArr(data: number): any[] {
            const arr: any[] = [];
            for (let i = 1; i <= data; i++) {
                const obj: any = {};
                const value = 'value';
                const isShow = 'isShow';
                const typeText = 'typeText'; // 不可选disable 可选normal  选中起select  选择止end
                const typeValue = 'typeValue'; // 不可选disable 可选normal  选中起start  选择止end 选中select


                obj[value] = i;
                obj[isShow] = true;
                obj[typeText] = 'normal';
                obj[typeValue] = 'normal';
                arr.push(obj);
            }
            return arr;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    $default: #000000;
    $light: #BBBBBB;
    $active: #068eef;

    .date-time-wrap {
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100vh;

        .light {
            color: $light;
        }

        .head {
            padding: 15px;
            color: #fff;
            display: flex;
            flex-direction: column;
            .head-top {
                display: flex;
            }
            i {
                margin-right: 20px;
                font-size: 20px;
            }
            .year {
                width: 58px;
                text-align: center;
                border: 1px solid #fff;
                padding: 2px;
            }
            .time {
                font-size: 28px;
                margin: 8px 0 0 0;
            }
        }

        main {
            display: flex;
            flex-direction: column;
            flex: 1;
            /*height: calc(100vh - 44px - 84px);*/
        }

        .month {
            display: flex;
            i {
                width: 50px;
                line-height: 50px;
                display: inline-block;
                text-align: center;
                &.invert {
                    transform: rotate(180deg);
                }
            }
            .show-month {
                flex: 1;
                justify-content: center;
                display: flex;
                font-size: 12px;
                padding: 12px;
                .show-month-content {
                    padding: 0 8px;
                    line-height: 26px;

                }
            }
        }

        .week {
            display: flex;
            justify-content: space-around;
            font-size: 12px;
        }

        .day {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            justify-content: center;
            .day-item {
                flex: 0 0 14.28vw;
                justify-content: center;
                display: flex;
                min-height: 52px;
                flex-direction: column;
                text-align: center;

                .day-value-wrapper {
                    display: flex;
                }

                .left {
                    flex: 1;
                }
                .right {
                    flex: 1;
                }

                .day-value-content {
                    width: 35px;
                    height: 35px;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                }

                .select {
                    .day-value-content {
                        color: white;
                        border-radius: 50%;
                        background: $active;
                    }
                }

                .select-middle {
                    color: white;
                    .left, .right {
                        background: $active;
                    }
                }

                .select-end {
                    color: white;
                    .right {
                        background: white;
                    }
                    .day-value-content {
                        border-radius: 0 100% 100% 0;
                    }
                }

                .select-start {
                    color: white;
                    .left {
                        background: white;
                    }
                    .day-value-content {
                        border-radius: 100% 0 0 100%;
                    }
                }
            }

            .day-info {
                font-size: 10px;
                display: flex;
                justify-content: center;
                &.day-start {

                }
            }
        }
        .quick {
            display: flex;
            justify-content: space-around;
            height: 44px;
            line-height: 44px;
            border-top: 1px solid $light;
        }

    }
</style>
