import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js';

Vue.use(VueRouter)

const routes = [

  // HOME


  // AUTH
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/AuthLogin.vue'),
    meta: { requiresUnauth: true },
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next('/products');
      }
      else {
        next();
      }
    }
  },
  // DASHBOARD
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },

  // LIST
  {
    path: '/suppliers',
    name: 'list-suppliers',
    component: () => import('../pages/ListSuppliers.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },
  {
    path: '/buyers',
    name: 'list-buyers',
    component: () => import('../pages/ListBuyers.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },
  {
    path: '/products',
    name: 'list-products',
    component: () => import('../pages/ListProducts.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },
  {
    path: '/incomings',
    name: 'list-incomings',
    component: () => import('../pages/ListIncomings.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },
  {
    path: '/outgoings',
    name: 'list-outgoings',
    component: () => import('../pages/ListOutgoings.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },

  // DETAIL
  {
    path: '/products/:product_id/',
    name: "detail-product",
    component: () => import('../pages/DetailProduct.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },
  {
    path: '/incomings/:incoming_id/',
    name: "detail-incoming",
    component: () => import('../pages/DetailIncoming.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },
  {
    path: '/outgoings/:outgoing_id/',
    name: "detail-outgoing",
    component: () => import('../pages/DetailOutgoing.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin']
    },
  },


  // INPUT
  {
    path: '/input/incoming',
    name: 'input-incoming',
    component: () => import('../pages/InputIncoming.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin', 'input']
    },
  },
  {
    path: '/input/outgoing',
    name: 'input-outgoing',
    component: () => import('../pages/InputOutgoing.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin', 'input']
    },
  },
  {
    path: '/input/supplier',
    name: 'input-supplier',
    component: () => import('../pages/InputSupplier.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin', 'input']
    },
  },
  {
    path: '/input/buyer',
    name: 'input-buyer',
    component: () => import('../pages/InputBuyer.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin', 'input']
    },
  },
  {
    path: '/input/product',
    name: 'input-product',
    component: () => import('../pages/InputProduct.vue'),
    meta: { 
      requiresAuth: true,
      allowedRoles: ['admin', 'input']
    },
  },

  // OTHER
  {
    path: '/notallowed',
    name: 'other-notallowed',
    component: () => import('../pages/OtherNotAllowed.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

store.dispatch('autoLogin');

router.beforeEach(function(to, _, next) {
  const role = store.getters.role;

  if ( to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if ( to.meta.requiresAuth && !to.meta.allowedRoles.includes(role) ) {
    next('/notallowed');
  } else {
    next();
  }
})

export default router
