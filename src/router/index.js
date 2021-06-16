import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/AuthLogin.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../pages/Dashboard.vue')
  },
  {
    path: '/suppliers',
    name: 'supplier-list',
    component: () => import('../pages/SupplierList.vue')
  },
  {
    path: '/buyers',
    name: 'buyer-list',
    component: () => import('../pages/BuyerList.vue')
  },
  {
    path: '/products',
    name: 'product-list',
    component: () => import('../pages/ProductList.vue')
  },
  {
    path: '/products/:product_id',
    name: "product-detail",
    component: () => import('../pages/ProductDetail.vue')
  },
  {
    path: '/input/incoming',
    name: 'incoming-input',
    component: () => import('../pages/InputIncoming.vue')
  },
  {
    path: '/input/suppliers',
    name: 'supplier-input',
    component: () => import('../pages/InputSuppliers.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
