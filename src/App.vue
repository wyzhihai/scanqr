<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App',
	data(){
		return{
			rankMap:['非会员','大众会员','黄金会员','钻石会员']
		}
	},
	created(){

		var openId=sessionStorage.getItem('openid')
		var wxUser=sessionStorage.getItem('nicename')
		var wxImg=sessionStorage.getItem('headimgurl')
		var branchId=sessionStorage.getItem('branchId')
		var vipRank=0;
		if(sessionStorage.getItem('vipRank'))
			vipRank=this.rankMap.filter((item)=>item==sessionStorage.getItem('vipRank'))[0]||0;
		var priceInfo=JSON.parse(sessionStorage.getItem('vipGrade'))
		console.log('openId:',openId)
		console.log('wxUser:',wxUser)
		console.log('wxImg:',wxImg)
		console.log('branchId:',branchId)
		console.log('vipRank:',vipRank)
		console.log('priceInfo:',priceInfo)  

		// openId='oHld-vxrrZec6fLUTOKtWv_bOKak';
		// wxUser="刘群";
		// wxImg="/static/img/wodedingdan@2x.png"
		// branchId=72;
		// priceInfo=[{id:2,VIPgrade:'黄金会员',cardPrice:58},{id:1,VIPgrade:'钻石会员',cardPrice:138},{id:3,VIPgrade:'大众会员',cardPrice:0},{id:4,VIPgrade:'黄金升钻石',cardPrice:100}]

		this.$store.commit('saveBranchId', branchId)
		this.$store.commit('saveVipRank',vipRank)
		this.$store.commit('saveWxInfo',{openId,wxUser,wxImg})
		this.$store.commit('savePriceInfo',priceInfo)
		this.$http.get('http://api.shiyushuo.net/WXBOOK/upgrade.php',{
			params:{act:'index',wxid:openId}
		}).then(function(res){
			console.log(res)
			if(res.body.code==206)
				this.$router.push({path:'/login'})
			else if(res.body.code==208){
				alert(res.body.Msg)
				this.$router.push({path:'/success'})
			}
			else{
				this.$store.commit('saveUserPhone',res.body.data.phone)
				this.$store.commit('saveTableName',res.body.data.tablename)
				this.$router.push({path:'/home'})
				
			}
		}).catch(function(err){
			console.log(err)
		})
	}
}
</script>

<style>
</style>
