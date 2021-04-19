import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('components/login/Login')
const Home = () => import('components/home/Home')
const Welcome = () => import('components/welcome/Welcome')
const UserList = () => import('components/usermanage/UserList')
const RoleList = () => import('components/rightmanage/RoleList')
const RightList = () => import('components/rightmanage/RightList')
const ShopList = () => import('components/shopmanage/ShopList')
const ClassParams = () => import('components/shopmanage/ClassParams')
const ShopClass = () => import('components/shopmanage/ShopClass')
const OrderList = () => import('components/ordermanage/OrderList')
const DataList = () => import('components/datamanage/DataList')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login'} ,
  { path: '/login', component: Login },
  { path: '/home', component: Home, redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: UserList },
      { path: '/roles', component: RoleList },
      { path: '/rights', component: RightList },
      { path: '/goods', component: ShopList },
      { path: '/params', component: ClassParams },
      { path: '/categories', component: ShopClass },
      { path: '/orders', component: OrderList },
      { path: '/reports', component: DataList }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
 if(to.path === '/login') return next()
 const tokenStr = window.sessionStorage.getItem('token')
 if(!tokenStr) return next('/login')
 next()
})

export default router
