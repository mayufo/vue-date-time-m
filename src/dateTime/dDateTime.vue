<!--时间组件带时分-->
<template>
    <transition name="calendar-fade">
        <div class="d-date-time" v-show="isShow" @touchmove.prevent @click.stop="hide">
            <transition name="calendar-move">
                <div class="calendar-move" v-if="isShow">
                    <div class="d-date-time-contain" @click.stop v-if="isShow">
                        <div class="d-date-time-header" :style="{background: color}">
                            <div class="d-date-time-year"
                                 v-if="type === 'dateTime' || type === 'year' || type ==='date'"
                                 :class="{left: textAlign === 'left', center: textAlign === 'center', right: textAlign === 'right'}"
                                 @click="selectYear">{{year}}
                            </div>
                            <div class="d-date-time-value"
                                 :class="{left: textAlign === 'left', center: textAlign === 'center', right: textAlign === 'right'}">
                                {{showDate}}
                                <span v-if="type === 'year'">年</span>
                                <span v-if="type === 'month'">月</span>
                                <span v-if="type === 'day'">日</span>
                                <!--<span v-if="type === 'noMinute'">:00</span>-->
                            </div>
                        </div>
                        <div class="d-date-time-content" :class="{dayTop: type === 'day'}">
                            <div class="d-date-time-months" v-if="status === 'day' && type !== 'day'">
                                <div @click="changeMonth('last')">
                                    <slot name="prevMonth">
                                        <i class="iconfont icon-arrow icon-left"></i>
                                    </slot>
                                </div>

                                <div class="d-date-time-month" @click="selectMonth">{{month}}月</div>
                                <div @click="changeMonth('next')">
                                    <slot name="nextMonth">
                                        <i class="iconfont icon-arrow"></i>
                                    </slot>
                                </div>
                            </div>

                            <!--展示周几-->
                            <div class="d-date-time-weeks-wrap" v-if="status === 'day'">
                                <div v-for="(item, index) in weeks" :key="`week-${index}`">
                                    <d-date-time-card type="week" :data="item"></d-date-time-card>
                                </div>
                            </div>

                            <!--选择年份-->
                            <div class="d-date-time-years-wrap" v-if="status === 'year'">
                                <i v-if="type !== 'year' " class="d-data-time-close iconfont icon-close"
                                   @click="close"></i>
                                <d-date-time-pick-year
                                        :data="yearArr"
                                        :color="color"
                                        @click="chooseYear"></d-date-time-pick-year>
                            </div>

                            <!--选择日期-->
                            <div class="d-date-time-days-wrap" v-if="status === 'day'">
                                <div v-for="(item, index) in dateArr" :key="`day-${index}`">
                                    <div @click="chooseDay(index)">
                                        <d-date-time-card :data="item" :color="color"></d-date-time-card>
                                    </div>
                                </div>
                            </div>

                            <!--选择月份-->
                            <div class="d-date-time-month-wrap" v-if="status === 'month'">
                                <i v-if="type !=='month'" class="d-data-time-close iconfont icon-close"
                                   @click="close"></i>
                                <div class="d-data-time-months">
                                    <div v-for="(item, index) in monthArr" :key="`month-${index}`">
                                        <div @click="chooseMonth(index)">
                                            <d-date-time-card :color="color" :data="item"
                                                              type="month"></d-date-time-card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--选择时分-->
                            <div class="d-date-time-time-wrap" v-if="status === 'time'">
                                <i v-if="type !=='time'" class="d-data-time-close iconfont icon-close"
                                   @click="close"></i>
                                <d-date-time-pick-hm :hoursArr="hoursArr"
                                                     :minutesArr="minutesArr"
                                                     :minutesInterval="minutesInterval"
                                                     :color="color"
                                                     :type="type"
                                                     @click="changeTime"
                                ></d-date-time-pick-hm>
                            </div>
                        </div>
                        <div class="d-date-time-button">
                            <a @click="now" :style="{color: color}" v-show="showToday && showTodayButton">现在</a>
                            <a @click="hide" :style="{color: color}">取消</a>
                            <a @click="confirm" :style="{color: color}">确认</a>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>

</template>

<script>
    import DDateTimeCard from './components/dDateTimeCard.vue'
    import DDateTimePickYear from './components/dDateTimePickYear'
    import DDateTimePickHm from './components/dDateTimePickHm'
    import {WEEKS, MONTH, SHOWDAY, MINYEAR, MAXYEAR, HOURS, MINUTES} from './config/config'
    import time from './utils/dateTime'
    import '../../assets/style.css'

    export default {
        name: 'dDateTime',
        data() {
            return {
                date: this.initDate(),
                weeks: this.produceArr(WEEKS),
                yearArr: [],
                monthArr: [],
                dateArr: [],
                hoursArr: [],
                minutesArr: [],
                status: '',
                isShow: false,
                formatDate: '',
                confirmDate: '', // 确认后的时间
            }
        },
        props: {
            /**
             * dateTime 显示 年月日时分,默认值
             * date     显示 年月日
             * noMinute 显示 年月日时
             * time     显示 时分
             * year     显示 年
             * month    显示 月
             * day      显示 日
             */
            type: {type: [String], default: 'dateTime'},
            /**
             * 希望得到的格式
             */
            format: {type: [String]},
            /**
             * 默认的颜色
             */
            color: {type: String, 'default': '#50c7a7'},
            /**
             * 有效的起始日期
             * format 2018/07/03 22:45 min不在可选范围内
             */
            min: {type: [String], 'default': ''},
            /**
             * 有效的截止日期
             * format 2018/07/05 22:45  max不在可选范围内
             */
            max: {type: [String], 'default': ''},
            /**
             * 默认值
             * format 2018/07/05 22:45
             */
            value: {type: [Number, String], 'default': ''},
            /**
             * 是否显示现在按钮，默认false
             */
            showTodayButton: {type: [Boolean], 'default': true},
            /**
             * 时间的对齐方式
             */
            textAlign: {type: [String], 'default': 'left'},
            /**
             * 分钟间隔 默认是一分钟
             */
            minutesInterval: {type: [Number], 'default': 1}
        },
        watch: {
            date() {
                this.initArray()
            },
            dateArr() {
                this.dateTimeInit()
            }
        },
        computed: {
            showToday() {
                if (this.max) {
                    return (new Date()).getTime() < new Date(this.max).getTime()
                } else {
                    return true
                }
            },
            showDate() {
                return time.format(this.date, this.formatDate)
            },
            year() {
                return this.date.getFullYear()
            },
            month() {
                return this.date.getMonth() + 1
            },
            minutes() {
                if (MINUTES.length % this.minutesInterval === 0) {
                    let arr = []
                    for (let i = 0; i < MINUTES.length; i = i + this.minutesInterval) {
                        arr.push(MINUTES[i])
                    }
                    return arr
                } else {
                    return MINUTES
                }

            }
        },
        created() {
            this.initStatus(this.type)
        },
        methods: {
            initDate() {
                let date = this.value ? new Date(this.value) : new Date()
                if (this.type === 'noMinute' || this.minutesInterval !== 1) {
                    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0)
                }
                return date
            },
            /**
             * 根据给的类型，初始化开始显示面板，和时间格式
             */
            initStatus(type) {
                switch (type) {
                    case 'dateTime':
                        this.status = 'day'
                        this.formatDate = 'yyyy/MM/dd hh:mm'
                        break
                    case 'noMinute':
                        this.status = 'day'
                        this.formatDate = 'yyyy/MM/dd hh:mm'
                        break
                    case 'date':
                        this.status = 'day'
                        this.formatDate = 'yyyy/MM/dd'
                        break
                    case 'time':
                        this.status = 'time'
                        this.formatDate = 'hh:mm'
                        break
                    case 'year':
                        this.status = 'year'
                        this.formatDate = 'yyyy'
                        break
                    case 'month':
                        this.status = 'month'
                        this.formatDate = 'MM'
                        break
                    case 'day':
                        this.status = 'day'
                        this.formatDate = 'dd'
                        break
                }
                if (this.format) {
                    this.formatDate = this.format
                }
            },
            /**
             * 确认
             */
            confirm() {
                this.confirmDate = this.date
                this.$emit('confirm', time.format(this.confirmDate, this.formatDate))
                this.hide()
            },
            /**
             * 现在
             */
            now() {
                if (this.type === 'noMinute' || this.minutesInterval) {
                    this.date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), 0)
                } else {
                    this.date = new Date()
                }
            },
            /**
             * 显示时间组件
             */
            show() {
                this.isShow = true
                if (this.confirmDate) {
                    this.date = this.confirmDate
                } else {
                    this.date = this.initDate()
                }
                this.verifyDate()
            },
            /**
             * 隐藏时间组件
             */
            hide() {
                this.isShow = false
                this.close()
            },
            /**
             * 产生日期数组
             */
            productDateArr(date) {
                let thisMonthArr = this.produceArr(time.createArray(1, time.getDaysInOneMonth(date)), true)
                let lastMonthArr = this.produceArr(time.createArray(1, time.getDaysInOneMonth(date, 'last')))
                let nextMonthArr = this.produceArr(time.createArray(1, time.getDaysInOneMonth(date, 'next')))

                let monthFirstDayWeekDay = time.getMonthFirstDayWhatWeek(new Date(date.getFullYear(), date.getMonth(), 1))
                if (monthFirstDayWeekDay === 0) {
                    // 正好到周末补全周一到周六
                    monthFirstDayWeekDay = 7
                } else if (monthFirstDayWeekDay === 1) {
                    // 这个月的1号正好周一，不用补上个月
                    monthFirstDayWeekDay = 0 - SHOWDAY
                }
                lastMonthArr = lastMonthArr.slice(0 - monthFirstDayWeekDay + 1)
                nextMonthArr = nextMonthArr.slice(0, SHOWDAY - thisMonthArr.length - lastMonthArr.length)
                return [...lastMonthArr, ...thisMonthArr, ...nextMonthArr]
            },
            /**
             * 选择年
             */
            chooseYear(index) {
                if (this.yearArr[index].able) {
                    let tmp = new Date(this.yearArr[index].value, this.date.getMonth(), this.date.getDate(), this.date.getHours(), this.date.getMinutes())
                    if (this.max && tmp.getTime() > new Date(this.max).getTime()) {
                        this.date = new Date(this.max)
                    } else if (this.min && tmp.getTime() < new Date(this.min).getTime()) {
                        this.date = new Date(this.min)
                    } else {
                        this.date = tmp
                    }
                    this.selectMonth()
                }
            },
            /**
             * 选择日期
             */
            chooseDay(index) {
                if (this.dateArr[index].isMonth && this.dateArr[index].able) {
                    this.date = time.changeDay(this.date, this.dateArr[index].value)
                    this.selectTime()
                }
            },
            /**
             * 选择月份
             */
            chooseMonth(index) {
                if (this.monthArr[index].able) {
                    let tmp = new Date(this.date.getFullYear(), parseInt(this.monthArr[index].value, 10) - 1, this.date.getDate(), this.date.getHours(), this.date.getMinutes())
                    if (this.max && tmp.getTime() > new Date(this.max)) {
                        this.date = new Date(this.date.getFullYear(), parseInt(this.monthArr[index].value, 10) - 1, 1, this.date.getHours(), this.date.getMinutes())
                    } else if (this.min && tmp.getTime() < new Date(this.min)) {
                        let newMonthDay = time.getDaysInOneMonth(tmp)
                        this.date = new Date(this.date.getFullYear(), parseInt(this.monthArr[index].value, 10) - 1, newMonthDay, this.date.getHours(), this.date.getMinutes())
                    } else {
                        this.date = tmp
                    }
                    this.dateArr = this.productDateArr(this.date)
                    this.verifyTime()
                    this.close()
                }
            },
            /**
             * 改变时间
             */
            changeTime(index, type) {
                if (type === 'hour' && !this.hoursArr[index].isSelect) {
                    let tmp = time.changeHour(this.date, this.hoursArr[index].value)
                    if (this.max && new Date(this.max).getTime() < tmp.getTime()) {
                        this.date = tmp
                        this.date = time.changeMinute(this.date, 0)
                    } else if (this.min && new Date(this.min).getTime() > tmp.getTime()) {
                        this.date = tmp
                        this.date = time.changeMinute(this.date, 59)
                    } else {
                        this.date = tmp
                    }
                } else if (type === 'minute') {
                    this.date = time.changeMinute(this.date, this.minutesArr[index].value)
                }
            },
            /**
             * 展示选择年的选项卡
             */
            selectYear() {
                if (this.type === 'year' || this.type === 'dateTime' || this.type === 'date') {
                    this.status = 'year'
                    this.activeYear(this.date.getFullYear())
                }
            },
            /**
             * 展示选择月的选项卡
             */
            selectMonth() {
                if (this.type === 'month' || this.type === 'dateTime' || this.type === 'date') {
                    this.monthArr = this.verifyMaxMin(this.produceArr(MONTH), 'month')
                    this.activeMonth(this.date.getMonth())
                    this.status = 'month'
                }
            },
            /**
             * 展示选择时间的选项卡
             */
            selectTime() {
                if (this.type === 'dateTime' || this.type === 'time' || this.type === 'noMinute') {
                    this.status = 'time'
                    this.verifyTime()
                }
            },
            /**
             * 验证时间
             */
            verifyTime() {
                if (this.max && (new Date(this.max)).getTime() < this.date.getTime()) {
                    this.date = new Date(this.max)
                    if (this.minutesInterval > 1) {
                        this.date = new Date(new Date(this.max).getFullYear(), new Date(this.max).getMonth(), new Date(this.max).getDate(), new Date(this.max).getHours(), 0)
                    }
                }
                if (this.min && (new Date(this.min)).getTime() > this.date.getTime()) {
                    this.date = new Date(this.min)
                    if (this.minutesInterval > 1) {
                        this.date = new Date(new Date(this.min).getFullYear(), new Date(this.min).getMonth(), new Date(this.min).getDate(), new Date(this.min).getHours(), 0)
                    }

                }
            },
            /**
             * 关闭其他选项卡，展开日期的选项卡
             */
            close() {
                if (this.type === 'dateTime' || this.type === 'noMinute') {
                    this.status = 'day'
                    this.dateArr = this.verifyMaxMin(this.productDateArr(this.date), 'day')
                }
            },
            /**
             * 点击 下一月或者上一月
             */
            changeMonth(params) {
                if (params === 'next') {
                    if ((this.max && new Date(this.max).getTime() > new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1).getTime()) || (!this.max)) {
                        let tmp = time.changeMonth(this.date, this.date.getMonth() + 1)
                        if (this.max && tmp.getTime() > new Date(this.max)) {
                            this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1, this.date.getHours(), this.date.getMinutes())
                        } else {
                            this.date = tmp
                        }
                    }
                } else if (params === 'last') {
                    if ((this.min && new Date(this.min).getTime() < new Date(this.date.getFullYear(), this.date.getMonth() - 1, time.getDaysInOneMonth(this.date) - 1).getTime()) || (!this.min)) {
                        let tmp = time.changeMonth(this.date, this.date.getMonth() - 1)
                        if (this.min && tmp.getTime() < new Date(this.min)) {
                            let newMonthDay = time.getDaysInOneMonth(tmp)
                            this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, newMonthDay, this.date.getHours(), this.date.getMinutes())
                        } else {
                            this.date = tmp
                        }
                    }
                }
                this.dateArr = this.verifyMaxMin(this.productDateArr(this.date), 'day')
                this.verifyTime()
            },

            /**
             * 清除之前的选中样式
             * @param array
             */
            arrayDefault(array) {
                array.forEach((item) => {
                    item.isSelect = false
                })
            },
            /**
             * 组建渲染的数组
             */
            produceArr(array, isMonth) {
                let newArr = []
                array.forEach((item) => {
                    let obj = {}
                    obj['value'] = item     // 值
                    obj['isSelect'] = false // 是否选中
                    obj['able'] = true      // 默认都是可点
                    if (isMonth) {
                        obj['isMonth'] = isMonth
                    }
                    newArr.push(obj)
                })
                return newArr
            },
            /**
             * 当date有所改变，需要重现渲染
             */
            dateTimeInit() {
                this.activeYear(this.date.getFullYear())
                this.activeMonth(this.date.getMonth())
                this.activeDay(this.date.getDate())
                this.activeHour(this.date.getHours())
                this.activeMinute(this.date.getMinutes())
            },
            /**
             * 渲染选中的分钟
             * @param minutes
             */
            activeMinute(minutes) {
                this.arrayDefault(this.minutesArr)
                let tmp = minutes < 10 ? `0${minutes}` : minutes.toString()
                this.minutesArr.forEach((item) => {
                    if (item.value === tmp && item.able) {
                        item.isSelect = true
                    }
                })
            },
            /**
             * 渲染选中的小时
             * @param hour
             */
            activeHour(hour) {
                this.arrayDefault(this.hoursArr)
                let tmp = hour < 10 ? `0${hour}` : hour.toString()
                this.hoursArr.forEach((item) => {
                    if (item.value === tmp && item.able) {
                        item.isSelect = true
                    }
                })
            },
            /**
             * 渲染选中的天
             * @param day
             */
            activeDay(day) {
                this.arrayDefault(this.dateArr)
                this.dateArr.forEach((item) => {
                    if (item.value === day && item.isMonth && item.able) {
                        item.isSelect = true
                    }
                })
            },
            /**
             * 渲染选中的月
             * @param month
             */
            activeMonth(month) {
                this.arrayDefault(this.monthArr)
                this.monthArr.forEach((item) => {
                    if (parseInt(item.value, 10) === month + 1) {
                        item.isSelect = true
                    }
                })
            },
            /**
             * 渲染选中的年
             * @param year
             */
            activeYear(year) {
                this.arrayDefault(this.yearArr)
                this.yearArr.forEach((item) => {
                    if (item.value === year) {
                        item.isSelect = true
                    }
                })
            },

            /**
             * 创建渲染的日，月，年列表
             */
            initArray() {
                this.yearArr = this.verifyMaxMin(this.produceArr(time.createArray(MINYEAR, MAXYEAR)), 'year')
                this.monthArr = this.verifyMaxMin(this.produceArr(MONTH), 'month')
                this.dateArr = this.verifyMaxMin(this.productDateArr(this.date), 'day')
                this.hoursArr = this.verifyMaxMin(this.produceArr(HOURS), 'hour')
                this.minutesArr = this.verifyMaxMin(this.produceArr(this.minutes), 'minute')
            },
            /**
             * 判断是否存在时间的限制
             * @param arr
             * @param type
             * @returns {*}
             */
            verifyMaxMin(arr, type) {
                if (!this.min && !this.max) {
                    return arr
                } else if (this.min && !this.max) {
                    return this.addMinDisable(arr, type, new Date(this.min))
                } else if (!this.min && this.max) {
                    return this.addMaxDisable(arr, type, new Date(this.max))
                } else if (this.min && this.max) {
                    let tempArr = this.addMinDisable(arr, type, new Date(this.min))
                    return this.addMaxDisable(tempArr, type, new Date(this.max))
                }
            },
            /**
             * 存在min时，最小的限制
             * @param arr
             * @param type
             * @param min
             * @returns {*}
             */
            addMinDisable(arr, type, min) {
                let minDate
                let minGetTime = new Date(this.min).getTime()
                if (type === 'month') {
                    minDate = arr.findIndex((item, index) => {
                        return minGetTime < new Date(this.date.getFullYear(), index).getTime()
                    })
                    minDate--
                } else if (type === 'year') {
                    let value = min.getFullYear()
                    minDate = arr.findIndex((item) => {
                        return item.value === value
                    })
                } else if (type === 'day') {
                    minDate = arr.findIndex((item) => {
                        return item.isMonth && minGetTime < new Date(this.date.getFullYear(), this.date.getMonth(), item.value).getTime()
                    })
                    minDate--
                } else if (type === 'hour') {
                    minDate = arr.findIndex((item) => {
                        return minGetTime < new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(item.value, 10)).getTime()
                    })
                    minDate--
                } else if (type === 'minute') {
                    new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(),)
                    minDate = arr.findIndex((item) => {
                        return minGetTime < new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(), parseInt(item.value, 10)).getTime()
                    })
                    minDate--
                }

                if (minDate <= -1) {
                    minDate = 0
                }

                for (let i = 0; i < minDate; i++) {
                    arr[i]['able'] = false
                }

                return arr
            },
            /**
             * 存在max时，最大的限制
             * @param arr
             * @param type
             * @param max
             * @param params  是否将默认值清空
             * @returns {*}
             */
            addMaxDisable(arr, type, max) {
                let maxDate
                let maxGetTime = new Date(this.max).getTime()
                if (type === 'month') {
                    maxDate = arr.findIndex((item, index) => {
                        return maxGetTime < new Date(this.date.getFullYear(), index).getTime()
                    })
                    maxDate--
                } else if (type === 'year') {
                    let value = max.getFullYear()
                    maxDate = arr.findIndex((item) => {
                        return item.value === value
                    })
                } else if (type === 'day') {
                    maxDate = arr.findIndex((item) => {
                        return item.isMonth && maxGetTime < new Date(this.date.getFullYear(), this.date.getMonth(), item.value).getTime()
                    })
                    maxDate--
                } else if (type === 'hour') {
                    maxDate = arr.findIndex((item) => {
                        return maxGetTime < new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(item.value, 10)).getTime()
                    })
                    maxDate--
                } else if (type === 'minute') {
                    maxDate = arr.findIndex((item) => {
                        return maxGetTime < new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(), parseInt(item.value, 10)).getTime()
                    })
                    maxDate--
                }
                if (maxDate <= -1) {
                    maxDate = arr.length
                }
                for (let i = maxDate + 1; i < arr.length; i++) {
                    arr[i]['able'] = false
                }
                return arr
            },

            /**
             * 判断当前date 是否在min 与 max 之间，如果不在将date设置为min
             */
            verifyDate() {
                if (new Date(this.max).getTime() < new Date(this.min).getTime()) {
                    console.error('Min than Max value. Please check')
                } else {
                    if (this.max && !this.min && new Date(this.max).getTime() < this.date.getTime()) {
                        if (this.minutesInterval > 1) {
                            this.date = new Date(new Date(this.max).getFullYear(), new Date(this.max).getMonth(), new Date(this.max).getDate(), new Date(this.max).getHours(), 0)
                        }
                        this.date = new Date(this.max)
                    } else if (this.min && !this.max && new Date(this.min).getTime() > this.date.getTime()) {
                        this.date = new Date(this.min)
                        if (this.minutesInterval > 1) {
                            this.date = new Date(new Date(this.min).getFullYear(), new Date(this.min).getMonth(), new Date(this.min).getDate(), new Date(this.min).getHours(), 0)
                        }
                    } else if ((this.min && this.max && new Date(this.min).getTime() > this.date.getTime()) || (this.min && this.max && new Date(this.max).getTime() < this.date.getTime())) {
//            console.error('The value is not between Min and Max, has to be set to min value')
                        this.date = new Date(this.min)
                        if (this.minutesInterval > 1) {
                            this.date = new Date(new Date(this.min).getFullYear(), new Date(this.min).getMonth(), new Date(this.min).getDate(), new Date(this.min).getHours(), 0)
                        }
                    }

                }
            }
        },
        components: {
            DDateTimeCard,
            DDateTimePickYear,
            DDateTimePickHm
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .d-date-time {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 10;
        &.calendar-fade-enter, &.calendar-fade-leave-active {
            opacity: 0;
        }
        &.calendar-fade-enter-active, &.calendar-fade-leave-active {
            transition: all .3s ease-in-out;
        }
        .calendar-move {
            position: absolute;
            width: 100%;
            height: 100%;
            &.calendar-move-enter-active {
                animation: bounce-in .2s;
            }
            &.calendar-move-leave-active {
                animation: bounce-in .2s reverse;
            }
        }
        .d-date-time-contain {
            background: white;
            width: 316px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 5px 22px 95px -14px rgba(0, 0, 0, 1);
        }

        .d-date-time-header {
            padding: 16px;
            .d-date-time-year {
                color: white;
                opacity: .8;
                font-size: 16px;
                display: flex;
                cursor: pointer;

            }

            .d-date-time-value {
                color: white;
                font-size: 20px;
                margin-top: 8px;
                transition: all 0.4s cubic-bezier(0.25, 0.1, 0.17, 1.84);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: flex;
            }
            .left {
                justify-content: flex-start;
            }
            .center {
                justify-content: center;
            }
            .right {
                justify-content: flex-end;
            }
        }
        .dayTop {
            height: 260px !important;
            padding-top: 40px;
        }
        .d-date-time-content {
            height: 300px;
            .d-date-time-months {
                display: flex;
                justify-content: space-between;
                .icon-left {
                    transform: rotate(-180deg);
                }
                i {
                    display: inline-block;
                    padding: 16px;
                    font-style: normal;
                    font-size: 22px;
                    cursor: pointer;
                }
                .d-date-time-month {
                    line-height: 50px;
                    font-size: 14px;
                    cursor: pointer;
                }
            }

            .d-date-time-weeks-wrap {
                display: flex;
                margin-bottom: 10px;
                padding: 0 16px;
                justify-content: space-between;

            }

            .d-date-time-days-wrap {
                display: flex;
                padding: 0 16px;
                flex-wrap: wrap;
                justify-content: space-between;

            }

            .d-date-time-month-wrap {
                display: flex;
                flex-direction: column;
                padding: 72px 0;
                .d-data-time-months {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
            }

            .d-date-time-time-wrap {
                /*padding: 60px 0;*/
                /*height: 168px;*/

            }
            .d-data-time-close {
                height: 30px;
                line-height: 30px;
                width: 30px;
                color: #444;
                text-align: center;
                background: rgba(0, 0, 0, 0.1);
                position: absolute;
                top: 82px;
                left: 4px;
                z-index: 100;
                cursor: pointer;
            }

        }
        .d-date-time-button {
            display: flex;
            justify-content: center;
            border-top: 1px solid #eeeeee;
            a {
                flex-grow: 1;
                text-align: center;
                line-height: 36px;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
