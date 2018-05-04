<template>
  <div class="homepage">
    <span class="logo"></span>
    <span class="imgword"></span>
    <p class="text">欢迎光临{{message}}</p>
    <div class="sli">
      <Slide :loop = 'loop' :autoPlay = 'autoPlay'>
        <div class="slider-item" v-for="item in items" :key="item.rank">
          <span class="imgs" :style="{backgroundImage: 'url(' + item.url + ')'}"></span>
          <span class="link">
            <span class="btn" @click="select(item.rank)">{{prices[item.rank-1].cardPrice!='0'?prices[item.rank-1].cardPrice:''}}</span>
          </span>
        </div>
      </Slide>
    </div>
  </div>
</template>

<script>
import Slide from './slider.vue'
import {mapState} from 'vuex'
export default {
  name: 'home',
  components: {
    Slide
  },
  created:function() {
    // var openId=sessionStorage.getItem('openid')
    // var wxUser=sessionStorage.getItem('nicename')
    // var wxImg=sessionStorage.getItem('headimgurl')
    // var branchId=sessionStorage.getItem('branchId')
    // var vipRank=0;
    // if(sessionStorage.getItem('vipRank'))
    //   vipRank=this.rankMap.findIndex((item)=>item==sessionStorage.getItem('vipRank'))
    // var priceInfo=JSON.parse(sessionStorage.getItem('vipGrade'))
    // console.log('openId:',openId)
    // console.log('wxUser:',wxUser)
    // console.log('wxImg:',wxImg)
    // console.log('branchId:',branchId)
    // console.log('vipRank:',vipRank)
    // console.log('priceInfo:',priceInfo)        
    // this.$store.commit('saveBranchId', branchId)
    // this.$store.commit('saveVipRank',vipRank)
    // this.$store.commit('saveWxInfo',{openId,wxUser,wxImg})
    // this.$store.commit('savePriceInfo',priceInfo)
    // function GetQueryString(name) { 
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    //   var r = window.location.search.substr(1).match(reg)//获取url中"?"符后的字符串并正则匹配
    //   var context = ""
    //   if (r != null)
    //       context = r[2]
    //   reg = null
    //   r = null
    //   return context == null || context == "" || context == "undefined" ? "" : context
    // }
    // this.branchId = GetQueryString("branchId")
  },
  data () {
    return {
      loop: false,
      autoPlay: false,
      items: [
      {
        url: './static/img/dazong.png',
        rank: 1
      },
      {
        url: './static/img/huanjing.png',
        rank: 2
      },
      {
        url: './static/img/zhuangshi.png',
        rank: 3
      }],
      rankMap:['非会员','大众会员','黄金会员','钻石会员']
    }
  },
  methods: {
    select (rank) {
      console.log(this.vipRank,rank)
      if(this.vipRank>=rank){
        if(this.vipRank!=3)
          alert('您已经是'+this.rankMap[this.vipRank]+'，请选择其他会员等级办理')
        else{
          alert('您已经是'+this.rankMap[this.vipRank]+'，无需再办理其他会员')
          this.$router.push({path:'/success'})
        }
      }
      else{
        if(rank==1){
          alert('首次入住后自动成为大众会员')
          this.$router.push({path:'/success'})
        }
        else{
          this.$store.commit('saveSelRank',rank)
          this.$http.post('http://api.shiyushuo.net/WXBOOK/upgrade.php',{
            act:'createOrder',
            branchId:this.branchId,
            oldVipRank:this.vipRank?this.rankMap[this.vipRank]:'',
            vipRankId:this.prices[rank-1].id,
            oldTableName:this.tableName,
            phone:this.userPhone
          },{
            emulateJSON:true
          }).then(function(res){
            console.log(res)
            if(res.body.code==200){
              this.$store.commit('saveOrderId',res.body.danhao);
              this.$router.push({path:'/PayDetails',query:{price:this.prices[rank-1].cardPrice}})
            }else{
              alert(res.body.Msg)
            }
          }).catch(function(err){
            console.log(err)
          })
        }
      }
      
    }
  },
  computed: {
    ...mapState(['vipRank','priceInfo','userPhone','branchId','tableName']),
    prices(){
      var price1=this.priceInfo.filter((item)=>item.id==3&&item.VIPgrade=="大众会员")[0];
      var price2=this.priceInfo.filter((item)=>item.id==2&&item.VIPgrade=="黄金会员")[0]
      var price3=this.vipRank==2?this.priceInfo.filter((item)=>item.id==4&&item.VIPgrade=="黄金升钻石")[0].cardPrice:this.priceInfo.filter((item)=>item.id==1&&item.VIPgrade=="钻石会员")[0]
      // console.log(price1,price2,price3);
      return [price1,price2,price3];
    },
    message() {
      switch(this.branchId) {
        case '68':
        return '锐思堡国际公寓(南沙分店)'
        case '70':
        return '锐思堡国际公寓(厚街分店)'
        case '73':
        return '锐思堡国际公寓(南海分店)'
        case '74':
        return '锐思堡国际公寓(前台培训分店)'
        case '76':
        return '2513爱情主题公寓(2513南沙店)'
        case '79':
        return '2513爱情主题公寓(合肥店)'
        case '80':
        return '糖果时租公寓酒店(长沙蚂蚁工房店)'
        case '81':
        return '2513爱情主题公寓(广西柳州店)'
        case '82':
        return '乐活公寓(长沙五一广场店)'
        case '83':
        return '2513爱情主题公寓(广州萝岗店)'
        case '85':
        return '锐思堡国际公寓(长沙步步高新天地)'
        case '86':
        return '锐思堡国际公寓(三水万达店)'
        case '87':
        return '糖果时租公寓酒店(暂停使用)'
        case '88':
        return '锐思堡国际公寓(常德万达店)'
        case '89':
        return '2513爱情主题公寓(广州花都万达城店)'
        case '72':
        return '锐思堡国际公寓(微信订房测试分店)'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.homepage{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  background-image: url(../assets/bg.png);
  background-repeat: no-repeat;
  background-position:top center;
  background-size: 100%;
  .logo{
    display: inline-block;
    width: 4.666667rem /* 175/37.5 */;
    height: .866667rem /* 32.5/37.5 */;
    margin-top: .4rem /* 15/37.5 */;
    margin-left: .4rem /* 15/37.5 */;
    background-image: url(../assets/logo1.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .imgword{
    display: block;
    width: 5.266667rem /* 197.5/37.5 */;
    height: .96rem /* 36/37.5 */;
    margin: 0 auto;
    margin-top: .426667rem /* 16/37.5 */;
    background-image: url(../assets/welcome.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .text{
    display: block;
    width: 7.466667rem /* 280/37.5 */;
    height: .48rem /* 18/37.5 */;
    line-height: .48rem /* 18/37.5 */;
    overflow: hidden;
    margin: 0 auto;
    margin-top: .4rem /* 15/37.5 */;
    font-size: .4rem /* 15/37.5 */;
    color: #ffffff;
    font-family: Microsoft YaHei;
    text-align: center;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .sli{
    width: 100%;
    margin: 0 auto;
    margin-top: .4rem /* 15/37.5 */;
    height: 11.24rem /* 459/37.5 */;
    margin-bottom: .8rem /* 30/37.5 */;
    .slider-item{
      position: relative;
      .imgs{
        display: inline-block;
        width: 8.533333rem /* 320/37.5 */;
        height: 11.24rem /* 459/37.5 */;
        // background-image: url(../assets/dazong.png);
        background-repeat: no-repeat;
        background-position:top center;
        background-size: 95%;
      }
      .link{
        width: 2rem /* 75/37.5 */;
        height: 2rem /* 75/37.5 */;
        display: inline-block;
        position: absolute;
        left: 50%;
        bottom: 0.8rem;
        margin-left: -1rem /* 37.5/37.5 */;
        z-index: 999;
        .btn{
          width: 100%;
          height: 100%;
          display: inline-block;
          z-index: 99;
          font-size:16px;
          color:#fff;
          text-align:center;
          line-height:3;
        }
      }
    }
  }
}
</style>
