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
      requiresAuth: true,
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
    name: 'login',
    component: () => import('../views/general/Login.vue'),
    meta: { title: 'INICIAR SESIÓN' }
  },
  {
    path: '/inicio',
    name: 'home',
    component: () => import('../views/general/Home.vue'),
    meta: {
      title: 'INICIO',
      requiresAuth: true,
      permission: true
    }
  },
  {
    path: '/acceso_denegado',
    name: 'unauthorized',
    component: () => import('../views/general/Unauthorized.vue'),
    meta: {
      title: 'ACCESO DENEGADO',
      requiresAuth: true,
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
//   if (store.getters.getLogin.permissions) {
//     if (store.getters.getLogin.permissions[interface_atr]) {
//       return store.getters.getLogin.permissions[interface_atr][permission]
//     }
//     return false
//   }
//   return false
// }

router.beforeEach((to, from, next) => {
  let auth = store.getters.getLogin.auth

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.matched.some((record) => record.meta.permission)) {
      if (auth) {
        next()
      } else {
        next({ name: 'login' })
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
