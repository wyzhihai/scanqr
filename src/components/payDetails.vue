<!--  -->
<template>
  <div class="pd">
      <div class="topList">
        <span class="des">办理{{rankMap[selRank]}}卡</span>
        <span class="price">{{price}}</span>
    </div>
    <span class="text">支付成功后立即生效，长期有效，不支持退款</span>
    <span @click="checkout" class="btn">立刻办理</span>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data () {
        return {
            rankMap:['非会员','大众会员','黄金会员','钻石会员']
        }
    },
    computed:{
        ...mapState(['selRank','orderId','branchId']),
        openId(){
            return this.$store.state.wxInfo.openId;
        },
        price(){
            return this.$route.query.price;
        }
        // price(){
        //     if(this.selRank<=this.vipRank||this.selRank==1){
        //         return {id:3,cardPrice:0};
        //     }else{
        //         if(this.selRank==3&&this.vipRank==2)
        //             return this.priceInfo.filter((item)=>item.id==4)[0]
        //         else if(this.selRank==3)
        //             return this.priceInfo.filter((item)=>item.id==1)[0]
        //         else 
        //             return this.priceInfo.filter((item)=>item.id==2)[0]
        //     }

        // }
    },
    methods:{
        checkout(){
            var data ={
                branchId:this.branchId,
                danhao:this.orderId,
                openId:this.openId,
            } ;
            console.log(data)
            this.$http.post('http://api.shiyushuo.net/WXBOOK/sdk/example/jsapi_p.php',data,{emulateJSON:true}).then(function(res){
                console.log(res)
                // var map={'200':'success','206':'fail'}
                // this.$store.commit('changeOrderState',res.body.code);
                // this.$router.push('/orderState/'+map[this.orderState])
                if(res.data.code==200){
                    console.log('####')
                    console.log(res.data.data)
                    this.jsApiCall(res.data.data);
                }
                else{
                    alert(res.data.Msg);
                }
            },function(err){
                console.log(err)
            })
            
        },
        jsApiCall(a)
        {
            var obj = eval('(' + a + ')');
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                obj,
                function(res){
                    console.log('jsApiCall:',res)
                    WeixinJSBridge.log(res.err_msg);
                    if(res.err_msg == "get_brand_wcpay_request:ok"){
                            //微信支付成功，进行支付成功处理
                            alert("微信支付成功...");
                            // this.$store.commit('changeOrderState','success')
                            this.$router.push({path:'/Success'})
                        }else if(res.err_msg == "get_brand_wcpay_request：cancel"){
                            alert("取消支付！");
                            // this.$store.commit('changeOrderState','fail')
                            this.$router.push({path:'/home'})
                        }else{
                            alert("支付失败！");
                            // this.$store.commit('changeOrderState','cancel')
                            this.$router.push({path:'/home'})
                            
                        }
                    }.bind(this)
                    );
        },
    }
}
</script>

<style lang='less' scoped>
.pd{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f2f2f2;
}
.topList{
    width: 100%;
    height: 1.333333rem /* 50/37.5 */;
    background-color: #ffffff;
    margin-top: .8rem /* 30/37.5 */;
    .des{
        display: block;
        float: left;
        font-size: .4rem /* 15/37.5 */;
        line-height: 1.333333rem /* 50/37.5 */;
        text-align: left;
        margin-left: .4rem /* 15/37.5 */;
    }
    .price{
        display: block;
        float: right;
        font-size: .4rem /* 15/37.5 */;
        line-height: 1.333333rem /* 50/37.5 */;
        text-align: right;
        color: #ea5319;
        margin-right: .4rem /* 15/37.5 */;
    }
}
.text{
    margin-top: .4rem /* 15/37.5 */;
    display: inline-block;
    width: 100%;
    font-size: .32rem /* 12/37.5 */;
    text-indent: .4rem /* 15/37.5 */;
    color: #999999;
}
.btn{
    display: block;
    width: auto;
    height: 1.066667rem /* 40/37.5 */;
    line-height: 1.066667rem /* 40/37.5 */;
    margin: .533333rem /* 20/37.5 */ .4rem /* 15/37.5 */ 0;
    background-color: #ea5319;
    color: #ffffff;
    font-size: .373333rem /* 14/37.5 */;
    text-align: center;
    border-radius: .106667rem /* 4/37.5 */;
    overflow: hidden;
}
</style>
