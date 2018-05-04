<template>
    <div class="slide_box">
        <div class="slide" ref="slider">
            <div class="slide-group" ref='slideGroup'>
                <slot>
                </slot>
            </div>
            <div class="dots">
                <span class="dot" :class="{dotActive: (currentPageIndex) === index }" v-for="(item, index) in dots" :key="index"></span>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        props: {
            loop: {
                type: Boolean,
                default: false
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            interval: {
                type: Number,
                default: 1000
            }
        },
        created () {
            this.$nextTick(() => {
                this._initScroll ()
            })
        },
        data () {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        mounted () {
            setTimeout(() => {
                this.setSliderWidth()//设置轮播图的宽度
                this.init()
            }, 20)
            if (this.autoPlay) {
                this.play()
            }
        },
        methods: {
            setSliderWidth () {
                this.children = this.$refs.slideGroup.children
                this.dots = new Array(this.children.length)
                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for (let i = 0; i < this.children.length; i++) {
                    width += sliderWidth
                }
                if (this.loop) {
                    width += 2 * sliderWidth
                }
                this.$refs.slideGroup.style.width = width + 'px'
            },
            init () {
                var vm = this
                // 实例化scroll
                this.scroll = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    snapThreshold: 0.1,
                    momentum: false, //关闭或者打开惯性运动的执行
                    snap: true, //隔断（翻页）
                    snapLoop: this.loop, //无限滚动
                    snapThreshold: 0,
                    snapSpeed: 200//滑动的时间,
                })
                this.scroll.on('scrollEnd', () => {
                    let pageIndex = this.scroll.getCurrentPage().pageX
                    if (this.loop) {
                        pageIndex -= 1
                    }
                    this.currentPageIndex = pageIndex
                    if (vm.autoPlay) {
                        vm.play()
                    }
                })
                this.scroll.on('beforeScrollStart', () => {
                    if (vm.autoPlay) {
                        clearTimeout(vm.timer)
                    }
                })
            },
             _initScroll () {
                this.scroll = new BScroll(this.$refs.slider, {
                    click: true
                })
            },
            play () {
                let pageIndex = this.currentPageIndex + 1
                if (this.loop) {
                    pageIndex += 1
                }
                var vm = this
                this.timer = setTimeout(() => {
                    vm.scroll.goToPage(pageIndex, 1, 200)//跳转到的页数 初始化页数 滑动总时间
                }, vm.interval)
            }
        }
    }
</script>
<style lang='less' scoped>
    .slide{
        width: 8.533333rem /* 320/37.5 */;
        overflow: hidden;
        height: 11.24rem /* 459/37.5 */;
        position: relative;
        margin: 0 auto;
        .slide-group{
            height: 11.24rem /* 459/37.5 */;
            // background: red;
            .slider-item{
                width:8.533333rem /* 320/37.5 */;
                height: 11.24rem /* 459/37.5 */;
                float: left;
            }
        }
    }
    .dots{
        position: absolute;
        left: 0;
        right: 0;
        bottom: .4rem /* 15/37.5 */;
        text-align: center;
        height: .4rem /* 15/37.5 */;
        .dot{
            background: rgba(255,255,255,.5);
            display: inline-block;
            margin: 0 .133333rem /* 5/37.5 */;
            height: .213333rem /* 8/37.5 */;
            width: .213333rem /* 8/37.5 */;
            border-radius: 50%;
            vertical-align: top;
            &.dotActive{
                width: .48rem /* 18/37.5 */;
                border-radius: .133333rem /* 5/37.5 */;
                background: rgba(255,255,255,0.8);
            }
        }
    }
</style>