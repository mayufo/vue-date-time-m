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
            <ul class="day">
                <li class="day-item" v-for="(item, index) in arr" :key="`day-${index}`"
                    @click="demo(item, index)">
                    {{item}}
                    <!--<div class="day-value-wrapper">-->
                        <!--<div class="left"></div>-->
                        <!--<div class="day-value-content" :class="{light: index % 7 === 0 || index % 7 === 6 }">-->
                            <!--{{item}}-->
                        <!--</div>-->
                        <!--<div class="right"></div>-->
                    <!--</div>-->



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

<script>
  import i18n from '../config/i18n';
  import {DateTime} from 'luxon';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        showWeek: [], // 显示的星期几
        showYear: 0,  // 显示的年
        showMonth: '',  // 显示的月份
        time: '',  // 年月日时分秒
        showTime: '',  // 年月日时分秒
        showDay: [], // 选择的天
        startText: '', // 起的文字
        endText: '',  // 止的文字
        text: 111
      }
    },
    props: {
      language: {
        type: String,
        default: 'zh'
      },
      activeColor: {
        type: String,
        default: '#068eef'
      },
      date: {
        type: String,
      }
    },
    computed: {
      activeBg() {
        return `background: ${this.activeColor}`;
      },
      activeFontColor() {
        return `color: ${this.activeColor}`;
      },

      activeMonth() {
        return `border: 1px ${this.activeColor} solid; color: ${this.activeColor}`;
      }
    },
    created () {
      this.showWeek = i18n[this.language].week;
      this.time = DateTime.local();
      this.showTime = this.time.toFormat(i18n[this.language].format);
      this.showYear = this.time.year;
      this.showMonth = i18n[this.language].month[this.time.month - 1];
      this.selectDay = [1, 2, 3]
      this.arr = this.selectDay
      this.startText = i18n[this.language].start;
      this.endText = i18n[this.language].end;
    },
    methods: {
      // 生成选择的天数
      produceDay() {
        const thisMonth = this.produceDayArr(DateTime.local(this.time.year, this.time.month).daysInMonth);
        let lastMonth = this.produceDayArr(DateTime.local(this.time.year, this.time.month - 1).daysInMonth);
        let nextMonth = this.produceDayArr(DateTime.local(this.time.year, this.time.month + 1).daysInMonth);
        const monthFirstDayWhatDay = DateTime.local(this.time.year, this.time.month, 1).weekday;
        lastMonth = lastMonth.slice(-monthFirstDayWhatDay);
        nextMonth = nextMonth.slice(0, 35 - lastMonth.length - thisMonth.length);
        return [...lastMonth, ...thisMonth, ...nextMonth];
      },
      // 生成天数的数组
      produceDayArr(data) {
        const arr = [];
        for (let i = 1; i <= data; i++) {
          const obj = {};
          obj['value'] = i;
          obj['isShow'] = true;
          obj['typeText'] = 'normal';  // 不可选disable 可选normal  选中起select  选择止end
          obj['typeValue'] = 'normal'; // 不可选disable 可选normal  选中起start  选择止end 选中select
          arr.push(obj);
        }
        return arr;
      },
      // 选择日期
      demo (item, index) {
        console.log(item, index);
        // item.typeValue = 'start'
        this.arr.push(123)
        console.log(this.arr);
        // console.log(this.selectDay );
      }
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
