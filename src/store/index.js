import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    orderId:'',
    userPhone:'',
    branchId: '',
    vipRank:'',
    selRank:'',
    wxInfo:{},
    priceInfo:[],
    tableName:''
  },
  mutations: {
    saveUserPhone(state,phone){
      state.userPhone=phone;
    },
    saveBranchId (state, branchId) {
      state.branchId = branchId
    },
    saveVipRank(state,rank){
      state.vipRank=rank;
    },
    saveSelRank(state,rank){
      state.selRank=rank;
    },
    saveWxInfo(state,info){
      state.wxInfo=info;
    },
    saveOrderId (state, id) {
      state.orderId = id
    },
    savePriceInfo(state,info){
      state.priceInfo=info;
    },
    saveTableName(state,tableName){
      state.tableName=tableName;
    }
  }
})
