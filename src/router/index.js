import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('components/login/Login')
const Home = () => import('components/home/Home')
const Welcome = () => import('components/welcome/Welcome')
const UserList = () => import('components/usermanagement/UserList')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login'} ,
  { path: '/login', component: Login },
  { path: '/home', component: Home,
    chidren: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: UserList }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
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
