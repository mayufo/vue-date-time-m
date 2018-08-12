<!--时间日历显示的每个小模块-->
<template>
  <div class="d-date-time-card">
    <!--周-->
    <div class="d-date-time-week" v-if="type === 'week'">
      {{data.value}}
    </div>
    <!--日期-->
    <div class="d-date-time-day"
         v-if="type === 'day'"
         :class="{selectedDay: data.isSelect, isMonth: data.isMonth}">

      <div class="d-date-time-bg"
           :class="{selectedDay: data.isSelect}"
           :style="{background: color}"></div>

      <div class="d-date-time-value"
           v-if="data.isMonth"
           :class="{able: data.able}">{{data.value}}
      </div>

    </div>

    <!--月-->
    <div class="d-date-time-month" v-if="type === 'month'">
      <div>
        <!--选中-->
        <div v-if="data.isSelect" class="selected-month" :style="{color: color}">
          {{data.value}}
        </div>
        <!--没有选中-->
        <div :class="{able: data.able}" v-else>
          {{data.value}}
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: 'dDateTimeCard',
    props: {
      color: {type: String, 'default': '#50c7a7'},
      type: {
        type: String,
        default: 'day'
      },
      data: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .d-date-time-card {
    .d-date-time-day {
      position: relative;
      font-size: 14px;
    }
    .d-date-time-bg {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      color: #b9b9b9;
      transform: scale(0);
      opacity: 0;
    }

    .d-date-time-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #b9b9b9;
      cursor: pointer;
    }

    .is-month {
      .d-date-time-value {
        color: rgb(51, 51, 51);
      }
    }

    .selectedDay {

      .d-date-time-bg {
        color: pink !important;
        transition: all 450ms ease;
        transform: scale(1);
        opacity: 1;
      }

      .d-date-time-value {
        color: white !important;
      }
    }

    .d-date-time-week {
      color: #b9b9b9;
      font-size: 12px;
      width: 36px;
      text-align: center;
    }

    .d-date-time-month {
      width: 105px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      div {
        color: #b9b9b9;
      }
      .selected-month {
        background: #f5f5f5;
        color: rgb(65, 125, 244);
        font-weight: 700;
      }
    }

    .able {
      color: #333333 !important;
    }
  }
</style>
