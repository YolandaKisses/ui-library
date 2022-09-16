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
    component: () => import('../views/doc.vue'),
    children: [
      { path: "/test", component: () => import('../components/test.vue') },
      { path: "/DiffTable", component: () => import('../components/DiffTable.vue') },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
