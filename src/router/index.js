import Vue from 'vue'
import VueRouter from 'vue-router'
import BaseView from '../views/BaseView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: BaseView,
    children:[{
      path:'/stu',
      name:"Stu",
      component:()=>import('../views/stu/studentIndex.vue')
    },
    ]
  }
]


const router = new VueRouter({
  routes
})

export default router
