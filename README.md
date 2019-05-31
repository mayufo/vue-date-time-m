# vue-date-time-m


移动端好用的时间日历组件没有找到合适的，遂自己写了个。
UI部分借鉴了  [vue-persian-datetime-picker](https://talkhabi.github.io/vue-persian-datetime-picker) 真的做的很棒，可惜是阿拉伯的日期显示方式


# 图例

![](https://github.com/mayufo/vue-date-time-m/blob/master/img.gif)

# 在线demo
[demo](https://mayufo.github.io/vue-date-time-m/)


# 安装

```
npm install vue-date-time-m
```

# 使用

- lang.js

```
import dateTime from 'vue-date-time-m';
Vue.component('data-time', dateTime);
```

- in component
```
        <template>
          <div class="date-time-item">
            <div class="date-time-input" @click="show">{{ data }}</div>
            <d-date-time ref="dateTime"
                         type="date"
                         @confirm="select"></d-date-time>
          </div>
        </template>

        <script>
          import DateTime from 'vue-date-time-m'
          export default {
            data(){
              return {
                data: ''
              }
            },
            components: {
              DateTime
            },
            methods: {
              //  展示日期组件
              show () {
                this.$refs.dateTime.show()
              },
              // 日期组件回调
              select (val) {
                this.data = val
              }
            }
          }
        </script>
```

# 最近一次更新

#### 1.0.31

 1. 增加了时间的间隔，详情可见demo
 2. 可以选择年月日时，而不选择分钟

# LICENSE

- [LICENSE](https://github.com/mayufo/vue-date-time-m/blob/master/LICENSE)
