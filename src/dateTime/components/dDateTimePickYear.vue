<!--选择年-->
<template>
    <div class="d-date-time-pick-year">
        <div ref="scroll" class="scroll">
            <ul class="scroll-wrapper">
                <li v-for="(item, index) in data"
                    :key="index"
                    class="year-item"
                    @click="select(index)">
                    <!--{{item.able}}-->
                    <!--选中-->
                    <div v-if="item.isSelect"
                         class="selected"
                         :style="{color: color}">{{item.value}}
                    </div>
                    <!--没有选中-->
                    <div v-else :class="{able: item.able}" >
                        {{item.value}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        props: {
            color: {type: String, 'default': '#50c7a7'},
            data: {type: Array}
        },
        mounted () {
            this.scroll = new BScroll(this.$refs.scroll, {
                mouseWheel: true,
                probeType: 3,
                click: true
            })

            setTimeout(() => {
                this.scrollYear()
            }, 200)
        },
        destroyed () {
            this.scroll && this.scroll.destroy()
        },
        methods: {
            select (index) {
                this.$emit('click', index)
            },
            scrollYear () {
                this.scroll.scrollTo(0, 0 - document.querySelector('.selected').getBoundingClientRect().top + (document.documentElement.clientHeight / 2))
            }
        },
        components: {}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .d-date-time-pick-year {
        overflow: auto;
        width: 100%;
        display: flex;
        height: 300px;
        -webkit-overflow-scrolling: touch;
        position: relative;

        .scroll {
            position: absolute;
            background-color: #fff;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .scroll-wrapper {
                display: flex;
                overflow: hidden;
                flex-wrap: wrap;
                .year-item {
                    width: 105px;
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    color: #b9b9b9;
                    cursor: pointer;
                }
            }
        }
        .able {
            color: #333333;
        }
        .selected {
            background: #f5f5f5;
            font-weight: 700;
        }

    }
</style>
