<!-- 成功后显示公众号二维码 -->
<template>
  <div class="page">
      <div class="ewmImg"></div>
      <h1>长按识别二维码</h1>
      <h3>用微信扫描或者长按识别二维码关注公众号享受更多优惠活动！</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
}
}
</script>

<style lang='less' scoped>
.page{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f2f2f2;
    .ewmImg{
        width: 5.333333rem /* 200/37.5 */;
        height: 5.333333rem /* 200/37.5 */;
        // background-color: red;
        background-size: 5.333333rem /* 200/37.5 */ 5.333333rem /* 200/37.5 */;
        background-repeat: no-repeat;
        margin: 1.6rem /* 60/37.5 */ auto .8rem /* 30/37.5 */;
        background-image:url(../../static/img/qr.png)
    }
    h1{
        height: .533333rem /* 20/37.5 */;
        line-height: .533333rem /* 20/37.5 */;
        font-size: .48rem /* 18/37.5 */;
        text-align: center;
        color: #ea5319;
    }
    h3{
        line-height: .373333rem /* 14/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        text-align: center;
        color: #333333;
        width: 6.133333rem /* 230/37.5 */;
        margin: .8rem /* 30/37.5 */ auto 0;
    }
}
</style>