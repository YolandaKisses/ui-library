import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/index.vue')
  },
  {
    path: "/doc",
    name: 'doc',
    component: () => import('../views/doc.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
