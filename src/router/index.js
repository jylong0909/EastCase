import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/component/Login/login'
import HomePage from '@/component/HomePage/HomePage'
import Vip from '@/component/HomePage/common/top/vip/vip.vue'
import Home from '@/component/HomePage/common/left/home/home.vue'
import Data from '@/component/HomePage/common/left/left_data/data.vue'
import Financial from '@/component/HomePage/common/left/Left_financial/financial.vue'
import Stock from '@/component/HomePage/common/left/Left_stock/stock.vue'
import System from '@/component/HomePage/common/left/left_system/system.vue'
import afterSales from '@/component/HomePage/common/left/left_afterSales/after.vue'
import Distribution from '@/component/HomePage/common/left/left_distribution/distri.vue'
import procure from '@/component/HomePage/common/left/left_procurement/procurement.vue'
import sales from '@/component/HomePage/common/left/left_sales/sales.vue'
import zhang from '@/component/HomePage/common/top/styem_ZT/ZhangTao.vue'
import management from '@/component/HomePage/common/top/user_management/management.vue'
import Sales from '@/component/HomePage/common/top/sales/sales.vue'
import analysis from '@/component/HomePage/common/top/analysis/analysis.vue'

Vue.use(Router)
const router =  new Router({
  // mode: 'history',
  routes: [
    {
      name: 'Login',
      path: '/Login',
      component: Login,
    },
    {
      name: 'HomePage',
      path: '/HomePage',
      component: HomePage,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children:[{
          name:'zhang',
          path:'/HomePage/zhang',
          component: zhang,
      },
      {
        name:'management',
        path:'/HomePage/management',
        component: management,
    },
    {
      name:'Sales',
      path:'/HomePage/Sales',
      component: Sales,
    },
      {
        name:'analysis',
        path:'/HomePage/analysis',
        component:analysis,
      },
      {
        name:'Vip',
        path:'/HomePage/Vip',
        component: Vip,
      },
      {
        name:'Home',
        path:'/HomePage/Home',
        component: Home,
      },
     {
      name:'Data',
      path:'/HomePage/Data',
      component: Data,
     },
     {
      name:'Financial',
      path:'/HomePage/Financial',
      component: Financial,
     },
     {
      name:'Stock',
      path:'/HomePage/Stock',
      component: Stock,
     },
     {
      name:'System',
      path:'/HomePage/System',
      component: System,
     },
     {
      name:'afterSales',
      path:'/HomePage/afterSales',
      component: afterSales,
     },
     {
      name:'Distribution',
      path:'/HomePage/Distribution',
      component: Distribution,
     },
     {
      name:'procure',
      path:'/HomePage/procure',
      component: procure,
     },
     {
      name:'sales',
      path:'/HomePage/sales',
      component: sales,
     },
    ]

    },
    {
      path: '/',
      redirect: '/Login'
    }
  ]

})


// Vue.prototype.setCookie = (c_name, value, expiredays) => {
//   var exdate = new Date()
//   exdate.setDate(exdate.getDate() + expiredays)
//   document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
// }

// // 获取cookie、
// function getCookie(name) {
//   var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
//   if (arr = document.cookie.match(reg)) {
//     return (arr[2])
//   } else {
//     return null
//   }
// }
//  Vue.prototype.getCookie = getCookie

//  console.log(getCookie('JSESSIONID'))
// //全局路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token =getCookie("JSESSIONID")
//     console.log(getCookie("JSESSIONID"))
 
//     if (token === 'null' || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });

// router.beforeEach((to, from, next) => {
//   console.log('navigation-guards');
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//   const nextRoute = ['HomePage','zhang','management','Vip','Home','Data','Financial','Stock','System','afterSales','Distribution','procure','sales'];
//   let isLogin = getCookie("JSESSIONID"); // 是否登录
//   // 未登录状态；当路由到nextRoute指定页时，跳转至login
//   if (nextRoute.indexOf(to.name) >= 0) { 
//    if (!isLogin) {
//     console.log('what fuck');
//     router.push({ name: 'Login' })
//    }
//   }
//   // 已登录状态；当路由到login时，跳转至home 
//   if (to.name === 'Login') {
//    if (isLogin) {
//     router.push({ name: 'HomePage' });
//    }
//   }
//   next();
//  });
  
 export default router;
 
