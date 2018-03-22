import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Login from '@/components/Login'
import About from '@/components/About'

import Newsf from '@/components/Newsf'
import News from '@/components/News'
import NewsDetail from '@/components/NewsDetail'

import Productf from '@/components/Productf'
import Product from '@/components/Product'
import ProductDetail from '@/components/ProductDetail'

import Contact from '@/components/Contact'
import Test from '@/components/Test'
// import T from '@/components/T'



Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',component: Index},
    {path: '/register',component: Register},
    {path: '/login',component: Login},

    { path: '/about',component: About },
    {
      path: '/news',component: Newsf,
      children:[
        {path:'',component: News,},
        {path:'/news',component:News},
        {path:'/news_detail/:id',component:NewsDetail}
      ]
    },
    {path:'/product',component:Product},
    {path:'/product_detail/:id',component:ProductDetail},
    {path:'/contact',component:Contact},
    { path: '/test',component:Test,
      // children:[
      //   {path:'/',component:T},
      // ]
    },


  ]
})
