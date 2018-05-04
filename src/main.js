// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
// import Homes from '@/components/homes'
// import Login from '@/components/login'
Vue.config.productionTip = false

Vue.use(VueResource)

// Vue.component('Homes', Homes)
// Vue.component('Login', Login)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
