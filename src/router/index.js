import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // AUTH
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/AuthLogin.vue')
  },
  // DASHBOARD
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../pages/Dashboard.vue')
  },

  // LIST
  {
    path: '/suppliers',
    name: 'list-suppliers',
    component: () => import('../pages/ListSuppliers.vue')
  },
  {
    path: '/buyers',
    name: 'list-buyers',
    component: () => import('../pages/ListBuyers.vue')
  },
  {
    path: '/products',
    name: 'list-products',
    component: () => import('../pages/ListProducts.vue')
  },
  {
    path: '/incomings',
    name: 'list-incomings',
    component: () => import('../pages/ListIncomings.vue')
  },

  // DETAIL
  {
    path: '/products/:product_id/',
    name: "detail-product",
    component: () => import('../pages/DetailProduct.vue')
  },
  {
    path: '/incomings/:incoming_id/',
    name: "detail-incoming",
    component: () => import('../pages/DetailIncoming.vue')
  },

  // INPUT
  {
    path: '/input/incoming',
    name: 'input-incoming',
    component: () => import('../pages/InputIncoming.vue')
  },
  {
    path: '/input/outgoing',
    name: 'input-outgoing',
    component: () => import('../pages/InputOutgoing.vue')
  },
  {
    path: '/input/supplier',
    name: 'input-supplier',
    component: () => import('../pages/InputSupplier.vue')
  },
  {
    path: '/input/buyer',
    name: 'input-buyer',
    component: () => import('../pages/InputBuyer.vue')
  },
  {
    path: '/input/product',
    name: 'input-product',
    component: () => import('../pages/InputProduct.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
