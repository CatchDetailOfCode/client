import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[{
      path:'/stu',
      name:"Stu",
      component:()=>import('../views/Stu/StuIndex.vue')
    },
    {
      path: '/courseinfo/:stuid/:stuname',
      name: 'Info',
      component: ()=>import('../views/Stu/components/CourseInfo.vue')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
