import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NavHeadertest from '@/components/NavHeadertest'
import login from '@/components/login'
import register from '@/components/register'
import up_p from '@/components/up_p'
import testpower from '@/components/testpower'
import testlogin from '@/components/testlogin'
// import nxDataCard from '@/Modal/nx-data-card'
import GoodsSelect from '@/views/GoodsSelect'
import fail from '@/views/404'
import myhisorder from '@/views/myhisorder'
import Repair from '@/views/Repair'

import store from '@/store/store'

const CarsList = () => import('@/views/CarsList')       //实现懒加载（既触发到这个路由才加载这个组件）
const MyOrder = () => import('@/views/MyOrder')
const error = () => import('@/views/404')
const UserAssets = () => import('@/views/UserAssets')
const UserChange = () => import('@/views/Userchange')
const up = () => import('@/components/up_p')
// import GoodsSelect from '@/views/GoodsSelect'

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsSelect',
      component: GoodsSelect
    },
    // {
    //   path: '/',
    //   name: 'CarBook',
    //   component: CarBook
    // },
    {
      path:'/NavHeadertest',
      name:'NavHeadertest',
      component:NavHeadertest
    },
    {
      path:'/login',
      name:'login',
      component:login

    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/up_p',
      name:'up_p',
      component:up_p
    },
    {
      path:'/testpower',
      name:'testpower',
      component:testpower
    },
    {
      path:'/testlogin',
      name:'testlogin',
      component:testlogin
    },
    {
      path:'/CarsList',
      name:'CarsList',
      component:CarsList,

    },
    {
      path:'/GoodsSelect',
      name:'GoodsSelect',
      component:GoodsSelect
    },
    {
      path:'/404',
      name:'404',
      component:fail
    },
    {
      path:'/MyOrder',
      name:'MyOrder',
      component:MyOrder,
      // meta: { requiresAuth: true }      //设置这个标记为登录后才可以访问权限
    },
    {
      path:'/error',
      name:'error',
      component:error
    },

    {
      path:'/up',
      component:up
    },
    {
      path:'/UserChange',
      name:'UserChange',
      component:UserChange
    },
    {
      path:'/UserAssets',
      name:'UserAssets',
      component:UserAssets
    },

    {
      path:'/myhisorder',
      name:'myhisorder',
      component:myhisorder
    },
    {
      path:'/Repair',
      name:'Repair',
      component:Repair
    },


    { path: '/change', component:UserChange },

  ]
});
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {      //第一个检测跳转的页面是否设置了未登录不可查看权限
    console.log('你还没登录呀！1');
    // $store.state.checklogin
    axios.post('/api/test01/user.php').then(response => {
       let resp = response.data;
      if (!resp.status=='1') {                      //如果跳转的是要登录权限的页面，这里就是通过访问store检测用户是否登录 这里应该是用axios访问session的
        console.log('你还没登录呀 2');
        next({
          name: 'GoodsSelect',
          // query: { redirect: to.fullPath},
          params:{err:1}
        })
      } else {
        console.log('你还没登录呀！3');
        next()
      }
    });

  } else {

    next() // 确保一定要调用 next()
  }
});



export default router;
