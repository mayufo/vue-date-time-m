<!--时间组件带时分-->
<template>
    <div id="app">
        <div class="date-time-wrap">
            <h1>vue date time</h1>
            <!--安装-->
            <div class="date-time-install">
                <h2>Installation :</h2>
                <div class="code">
                    npm install vue-date-time-m
                </div>
            </div>

            <!--使用-->
            <div class="date-time-use">
                <h2>Using :</h2>
                <p>main.js</p>
                <div class="code">
                    import dateTime from 'vue-date-time-m';<br>
                    Vue.component('data-time', dateTime);
                </div>

                <p>or in component</p>
                <pre v-highlightjs>
        <code class="javascript">
          &lt;template>
            &lt;div class="date-time-item">
              &lt;div class="date-time-input" @click="show">[[ data ]]&lt;/div>
              &lt;date-time ref="dateTime"
                           type="date"
                           @confirm="select">&lt;/date-time>
            &lt;/div>
          &lt;/template>

          &lt;script>
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
          &lt;/script>

        </code>
      </pre>
            </div>

            <div class="date-time-props">
                <h2>You can also set default values :</h2>
                <p>main.js</p>
                <pre v-highlightjs v-pre>
      <code class="javascript">
        import VueDataTimeM from 'vue-data-time-m';
        Vue.use(VueDataTimeM, {
            name: 'data-time',
            props: {
                // dateTime 显示 年月日时分 默认值,
                // date     显示 年月日
                // time     显示 时分
                // year     显示 年
                // month    显示 月
                type: 'dateTime',
                // 希望得到的格式
                // 默认的颜色 #50c7a7
                color: '#00acc1',
                // 有效的起始日期
                // format 2018/07/03 22:45 min不在可选范围内
                min:  2018/07/03 22:45,
                // 有效的截止日期
                // format 2018/09/03 22:45 max不在可选范围内
                max: 2018/07/03 22:45,
                // 日期选中值，默认今天
                value: 2018/07/05 22:45,
                // 是否显示现在按钮 默认是true
                showTodayButton: false,
                // 默认值left, 可以选left\center\right
                textAlign: left
            }
        });
      </code>
    </pre>
            </div>

            <div class="date-time-demo">
                <h2>demo</h2>
                <div class="date-time-demo-wrap">
                    <!-- 1 默认值-->
                    <div class="item-demo">
                        <div class="demo-code">
            <pre highlightjs>
              <code class="html">
                &lt;div class="date-time-input" @click="show">[[date]]&lt;/div>
                &lt;date-time  ref="dateTime"
                                      @confirm="select">&lt;/date-time>
              </code>
            </pre>
                        </div>
                        <div class="date-time-item">
                            <div class="date-time-input" @click="show1">{{date1}}</div>
                            <date-time ref="dateTime1"
                                       @confirm="select1"></date-time>
                        </div>
                        <p>默认值， 展示年月日时分</p>
                    </div>
                    <!--2 format的改变-->
                    <div class="item-demo">
                        <div class="demo-code">
            <pre highlightjs>
              <code class="html">
                &lt;div class="date-time-input" @click="show">[[date]]&lt;/div>
                &lt;date-time ref="dateTime"
                                     @confirm="select"
                                     format="yyyy年MM月dd日 hh小时mm分">
                    &lt;div slot="prevMonth"> &lt;i>-&lt;/i> &lt;/div>
                    &lt;div slot="nextMonth"> &lt;i>+&lt;/i> &lt;/div>
                  &lt;/date-time>
              </code>
            </pre>
                        </div>
                        <div class="date-time-item">
                            <div class="date-time-input" @click="show2">{{date2}}</div>
                            <date-time ref="dateTime2"
                                       @confirm="select2"
                                       format="yyyy年MM月dd日 hh小时mm分">
                                <div slot="prevMonth"><i>-</i></div>
                                <div slot="nextMonth"><i>+</i></div>

                            </date-time>
                        </div>
                        <p>format的格式改变， 提供两个插槽可自定义月份icon</p>
                    </div>
                    <!--3 只选择年月日-->
                    <div class="item-demo">
                        <div class="demo-code">
            <pre highlightjs>
              <code class="html">
                &lt;div class="date-time-input" @click="show">[[date]]&lt;/div>
                &lt;date-time ref="dateTime"
                                     type="date"
                                     @confirm="select">&lt;/date-time>
              </code>
            </pre>
                        </div>
                        <div class="date-time-item">
                            <div class="date-time-input" @click="show3">{{date3}}</div>
                            <date-time ref="dateTime3"
                                       type="date"
                                       @confirm="select3"></date-time>
                        </div>
                        <p>type改变, 只选年月日</p>
                    </div>
                    <!--4 只选择年-->
                    <div class="item-demo">
                        <div class="demo-code">
            <pre highlightjs>
              <code class="html">
                &lt;div class="date-time-input" @click="show">[[date]]&lt;/div>
                &lt;date-time ref="dateTime"
                                     type="year"
                                     @confirm="select">&lt;/date-time>
              </code>
            </pre>
                        </div>
                        <div class="date-time-item">
                            <div class="date-time-input" @click="show4">{{date4}}</div>
                            <date-time ref="dateTime4"
                                       type="year"
                                       @confirm="select4"></date-time>
                        </div>
                        <p>type改变, 只显示年</p>
                    </div>
                    <!--5-->
                    <div class="item-demo">
                        <div class="demo-code">
            <pre highlightjs>
              <code class="html">
                &lt;div class="date-time-input" @click="show">[[date]]&lt;/div>
                &lt;date-time ref="dateTime"
                                     type="month"
                                     @confirm="select">&lt;/date-time>
              </code>
            </pre>
                        </div>
                        <div class="date-time-item">
                            <div class="date-time-input" @click="show5">{{date5}}</div>
                            <date-time ref="dateTime5"
                                       type="month"
                                       @confirm="select5"></date-time>
                        </div>
                        <p>type改变, 只显示月份</p>
                    </div>
                    <!--6-->
                    <div class="item-demo">
                        <div class="demo-code">
            <pre highlightjs>
              <code class="html">
               &lt;div class="date-time-input" @click="show">[[date]]&lt;/div>
               &lt;date-time ref="dateTime6"
                          type="dateTime"
                           min="2018/08/21 15:28"
                           max="2018/08/27 14:05"
                          @confirm="select"
                          textAlign="center"
                          color="#417df4">
                                &lt;i slot="prevMonth"> < &lt;/i>
                                &lt;i slot="nextMonth"> > &lt;/i>
                            &lt;/date-time>
              </code>
            </pre>
                        </div>
                        <div class="date-time-item">
                            <div class="date-time-input" @click="show6">{{date6}}</div>
                            <date-time ref="dateTime6"
                                       type="dateTime"
                                       min="2018/08/21 15:28"
                                       max="2018/08/27 14:05"
                                       @confirm="select6"
                                       textAlign="center"
                                       color="#417df4">
                                <i slot="prevMonth"> < </i>
                                <i slot="nextMonth"> > </i>
                            </date-time>
                        </div>
                        <p>增加可选范围和自定义颜色</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                date1: '',
                date2: '',
                date3: '',
                date4: '',
                date5: '',
                date6: '',
            }
        },
        methods: {
            show1 () {
                this.$refs.dateTime1.show()
            },
            select1 (val) {
                this.date1 = val
            },
            show2 () {
                this.$refs.dateTime2.show()
            },
            select2 (val) {
                this.date2 = val
            },

            show3 () {
                this.$refs.dateTime3.show()
            },
            select3 (val) {
                this.date3 = val
            },

            show4 () {
                this.$refs.dateTime4.show()
            },
            select4 (val) {
                this.date4 = val
            },
            show5 () {
                this.$refs.dateTime5.show()
            },
            select5 (val) {
                this.date5 = val
            },
            show6 () {
                this.$refs.dateTime6.show()
            },
            select6 (val) {
                this.date6 = val
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .date-time-wrap {
        background: white;
        padding: 16px;

        .code {
            background: #f6f8fa;
            padding: 16px;
            line-height: 1.4;
        }
        hr {
            margin: 30px 0;
        }
        h1 {
            text-transform: uppercase;
            text-align: center;
            font-size: 22px;
        }
        h2 {
            font-size: 20px;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        pre {
            background: #f6f8fa;
            border-radius: 4px;
            line-height: 1.4;
            font-size: 12px;
            overflow-x: auto;
        }

        p {
            padding-bottom: 10px;
        }

        .date-time-demo {
            .item-demo {
                display: flex;
                flex-direction: column;
                border: 1px solid rgba(0, 0, 0, .125);
                padding: 16px;
                box-shadow: 0 0 15px 0 rgba(0, 0, 0, .21);
                .demo-code {
                    background: ghostwhite;
                    height: 100%;
                }

                .date-time-item {
                    margin-top: 10px;
                    display: flex;
                    justify-content: center;

                    .date-time-input {
                        border: 1px solid #a2a2a2;
                        width: 80vw;
                        display: inline-block;
                        line-height: 36px;
                        height: 36px;
                        background: white;
                        padding: 0 10px;
                        color: #a2a2a2;
                        border-radius: 2px;
                    }
                }
                p {
                    color: #b9b9b9;
                    line-height: 44px;
                    text-align: center;
                }
            }

            .item-demo + .item-demo {
                margin-top: 16px;
            }
        }
    }
</style>
