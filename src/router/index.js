import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue')
  },
  {
    path: '/suppliers',
    name: 'List Supplier',
    component: () => import('../pages/SupplierList.vue')
  },
  {
    path: '/buyers',
    name: 'List Pembeli',
    component: () => import('../pages/BuyerList.vue')
  },
  {
    path: '/products',
    name: 'List Produk',
    component: () => import('../pages/ProductList.vue')
  },
  {
    path: '/input/incoming',
    name: 'Input Barang Masuk',
    component: () => import('../pages/InputIncoming.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
