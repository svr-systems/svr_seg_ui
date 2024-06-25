import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  //users
  {
    path: '/usuarios',
    name: 'users',
    component: () => import('../views/users/Index.vue'),
    meta: {
      title: 'USUARIOS',
      req_auth: true,
      permission: true
    }
  },
  //general
  {
    path: '/',
    name: 'main',
    component: () => import('../views/general/Main.vue'),
    meta: { title: 'SVR' }
  },
  {
    path: '/inicio_sesion',
    name: 'log_in',
    component: () => import('../views/general/LogIn.vue'),
    meta: { title: 'INICIAR SESIÓN' }
  },
  {
    path: '/inicio',
    name: 'home',
    component: () => import('../views/general/Home.vue'),
    meta: {
      title: 'INICIO',
      req_auth: true,
      permission: true
    }
  },
  {
    path: '/acceso_denegado',
    name: 'unauthorized',
    component: () => import('../views/general/Unauthorized.vue'),
    meta: {
      title: 'ACCESO DENEGADO',
      req_auth: true,
      permission: true
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: () => import('../views/general/NotFound.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// function setPermission(interface_atr, permission) {
//   if (store.getters.getLog.permissions) {
//     if (store.getters.getLog.permissions[interface_atr]) {
//       return store.getters.getLog.permissions[interface_atr][permission]
//     }
//     return false
//   }
//   return false
// }

router.beforeEach((to, from, next) => {
  let auth = store.getters.getLog.auth

  if (to.matched.some((record) => record.meta.req_auth)) {
    if (to.matched.some((record) => record.meta.permission)) {
      if (auth) {
        next()
      } else {
        next({ name: 'log_in' })
      }
    } else {
      next({ name: 'unauthorized' })
    }
  } else {
    if (auth) {
      next({ name: 'home' })
    } else {
      next()
    }
  }

  document.title = to.meta.title
})

export default router
