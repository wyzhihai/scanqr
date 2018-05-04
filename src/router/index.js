import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import PayDetails from '@/components/payDetails'
import Success from '@/components/success'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/Home',
    name: 'home',
    component: Home
  },
  {
    path: '/PayDetails',
    name: 'PayDetails',
    component: PayDetails
  },
  {
    path: '/Success',
    name: 'Success',
    component: Success
  }
  ]
})
