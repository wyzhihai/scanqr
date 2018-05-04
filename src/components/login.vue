<template>
	<div class="backdrop">
		<div class="bg">
			<h2 class="title-one">欢迎光临</h2>
			<h3 class="title-two">welcome</h3>
			<div class="block">
				<div class="number">
					<p class="text">手机号：</p>
					<input type="text" v-model="phone" placeholder="输入手机号">
				</div>
				<div class="pass">
					<p class="text">验证号：</p>
					<input type="text" v-model="code" placeholder="输入验证码">
					<a @click.prevent="getCode" href="#">{{text}}</a>
				</div>
			</div>
			<div class="btn" @click="login">登录</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	data () {
		return {
			phone: '',
			code: '',
			second: 0,
			rankMap:['非会员','大众会员','黄金会员','钻石会员']
		}
	},

	computed: {
		...mapState ({
			wxInfo:state=>state.wxInfo,
			price: state => state.price
		}),
		text () {
			if (this.second === 0) {
				return '获取验证码'
			} else {
				return this.second + 's后重发'
			}
		}
	},
	methods: {
		getCode () {
			if (this.phone === '') {
				alert('请输入手机号码')
				return
			}
			if (this.second !== 0) {
				return
			}
			this.second = 60
			this.$http.get('http://api.shiyushuo.net/WXBOOK/upgrade.php', {
				params: {
					act: 'getPhoneCode',
					phone: this.phone
				}
			}).then(function (res) {
				console.log(res)
				var timer = setInterval(function () {
					this.second--
					if (this.second === 0) {
						clearInterval(timer)
					}
				}.bind(this), 1000)
				if (res.body.code === 200) {
					alert(res.body.Msg)
				} else {
					alert(res.body.Msg)
				}
			}, function (err) {
				console.log(err)
			})
		},
		login () {
			if (this.phone === '' || this.code === '') {
				return
			}
			this.$http.get('http://api.shiyushuo.net/WXBOOK/upgrade.php', {
				params: {
					act: 'login',
					phone: this.phone,
					code: this.code,
					wxusername:this.wxInfo.wxUser,
					wxid:this.wxInfo.openId,
					wximg:this.wxInfo.wxImg,
				}
			}).then(function (res) {
				console.log(res)
				if (res.data.code == 200) {
					// this.$store.commit('saveLoginInfo', {
					// 	phone: this.phone,
					// 	userInfo: res.body.data
					// })
					console.log('login:',res)
					var rank=this.rankMap.filter((item)=>item==res.body.data.vipRank)[0]||0;
					this.$store.commit('saveTableName',res.body.data.tablename)
					this.$store.commit('saveUserPhone',this.phone)
					this.$store.commit('saveVipRank',rank)
					this.$router.push({path:'/home'})
				} else {
					alert(res.data.Msg)
				}
			}, err => console.log(err))
		},
		// pay () {
		// 	var openid = sessionStorage.getItem('openid')
		// 	var data = { 
		// 	}
		// 	console.log(data)
		// 	this.$http.post('http://api.shiyushuo.net/WXBOOK/sdk/example/jsapi.php', data, {
		// 		emulateJSON: true
		// 	}).then(function (res) {
		// 		console.log(res)
		// 		if (res.data.code === 200) {
		// 			console.log(res.data.data)
		// 			this.jsApiCall(res.data.data)
		// 		} else {
		// 			alert(res.data.Msg)
		// 		}
		// 	}, function (err) {
		// 		console.log(err)
		// 	})
		// },
		// jsApiCall (a) {
		// 	var obj = eval('(' + a + ')')
		// 	WeixinJSBridge.invoke(
		// 		'getBrandWCPayRequest',
		// 		obj,
		// 		function (res) {
		// 			WeixinJSBridge.log(res.err_msg)
		// 			if (res.err_msg === 'get_brand_wcpay_request:ok') {
		// 				alert('微信支付成功...')
		// 				this.$router.push('/orderState/success')
		// 			} else if (res.err_msg === 'get_brand_wcpay_request：cancel') {
		// 				alert('取消支付！')
		// 			} else {
		// 				alert('支付失败！')
		// 				this.$router.push('/orderState/fail')
		// 			}
		// 		}.bind(this)
		// 		)
		// }
	}
}
</script>

<style scoped lang="less">
.backdrop{
	width:100%;
	height:100%;
	background-image: url(../assets/bg1.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;
	display:flex;
	justify-content:center;
	align-items:center;
	position:fixed;
	top:0;
	left:0;
	.bg{
		margin:0 .6rem /* 22.5/37.5 */;
		background:rgba(0,0,0,0.5);
		text-align:center;
		position:relative;
		border-radius:.133333rem /* 5/37.5 */;
		overflow: hidden;
		.title-one{
			height:.693333rem /* 26/37.5 */;
			line-height: .693333rem /* 26/37.5 */;
			font-size:.64rem /* 24/37.5 */;
			color:#fff;
			margin-top: .4rem /* 15/37.5 */;
			font-weight: bold;
			text-align: center;
		}
		.title-two{
			height:.426667rem /* 16/37.5 */;
			line-height:.426667rem /* 16/37.5 */;
			font-size:.4rem /* 15/37.5 */;
			color:#fff;
			margin-top: .213333rem /* 8/37.5 */;
			text-align: center;
		}
		.block{
			padding:0 .533333rem /* 20/37.5 */;
			text-align:left;
			border-radius:0.053333rem;
			margin:1.146667rem /* 43/37.5 */ auto 0;
			.number{
				width: 100%;
				height: .8rem /* 30/37.5 */;
				line-height: .8rem /* 30/37.5 */;
				text-align: left;
				padding:0;
				border-bottom:1px solid #dfdfdf;
				.text{
					display: inline-block;
					width: 26%;
					height: .8rem /* 30/37.5 */;
					line-height: .8rem /* 30/37.5 */;
					font-size: .4rem /* 15/37.5 */;
					color: #ffffff;
					background:rgba(0,0,0,0);
					vertical-align:top;
					float: left;
				}
				input{
					width: 74%;
					height: .8rem /* 30/37.5 */;
					line-height: .8rem /* 30/37.5 */;
					font-size: .4rem /* 15/37.5 */;
					color: #ffffff;
					background:rgba(0,0,0,0);
					vertical-align:top;
					overflow: hidden;
					border:0;
					outline:none;
					float: left;
				}
			}
			.pass{
				width: 100%;
				height: .8rem /* 30/37.5 */;
				line-height: .8rem /* 30/37.5 */;
				text-align: left;
				padding:0;
				border-bottom:1px solid #dfdfdf;
				margin-top: .933333rem /* 35/37.5 */;
				.text{
					display: inline-block;
					width: 26%;
					height: .8rem /* 30/37.5 */;
					line-height: .8rem /* 30/37.5 */;
					font-size: .4rem /* 15/37.5 */;
					color: #ffffff;
					background:rgba(0,0,0,0);
					vertical-align:top;
					float: left;
				}
				input{
					width: 45%;
					height: .8rem /* 30/37.5 */;
					line-height: .8rem /* 30/37.5 */;
					font-size: .4rem /* 15/37.5 */;
					color: #ffffff;
					background:rgba(0,0,0,0);
					vertical-align:top;
					overflow: hidden;
					border:0;
					outline:none;
					float: left;
				}
				a{
					display: block;
					width: 28%;
					height: .666667rem /* 25/37.5 */;
					line-height: .666667rem /* 25/37.5 */;
					font-size: .32rem /* 12/37.5 */;
					color: #ffffff;
					background:rgba(0,0,0,0);
					vertical-align:top;
					overflow: hidden;
					border: 1px solid #ffffff;
					float: right;
					text-align: center;
					border-radius: .333333rem /* 12.5/37.5 */;
				}
			}
		}
		.btn{
			width:4rem /* 150/37.5 */;
			height:1.066667rem /* 40/37.5 */;
			line-height:1.066667rem /* 40/37.5 */;
			background:#ea5319;
			color:#fff;
			font-size:.48rem /* 18/37.5 */;
			border-radius:.533333rem /* 20/37.5 */;
			margin:1.866667rem /* 70/37.5 */ auto .8rem /* 30/37.5 */;
		}
	}
}
</style>
