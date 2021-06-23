import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js';

Vue.use(VueRouter)

const routes = [
  // AUTH
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/AuthLogin.vue'),
    meta: { requiresUnauth: true }
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
  {
    path: '/outgoings',
    name: 'list-outgoings',
    component: () => import('../pages/ListOutgoings.vue')
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
  {
    path: '/outgoings/:outgoing_id/',
    name: "detail-outgoing",
    component: () => import('../pages/DetailOutgoing.vue')
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
    component: () => import('../pages/InputProduct.vue'),
    meta: { requiresAuth: true },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/products');
  } else {
    next();
  }
})

export default router
