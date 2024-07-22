import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  //tags
  {
    path: "/etiquetas",
    name: "tags",
    component: () => import("@/views/tags/Index.vue"),
    meta: {
      title: "ETIQUETAS",
      icon: "mdi-tag-multiple",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/etiquetas/agregar",
    name: "tags.store",
    component: () => import("@/views/tags/StoreUpdate.vue"),
    meta: {
      title: "ETIQUETA | AGREGAR",
      icon: "mdi-tag",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/etiquetas/:id",
    name: "tags.show",
    component: () => import("@/views/tags/Show.vue"),
    meta: {
      title: "ETIQUETA",
      icon: "mdi-tag",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/etiquetas/:id/editar",
    name: "tags.update",
    component: () => import("@/views/tags/StoreUpdate.vue"),
    meta: {
      title: "ETIQUETA | EDITAR",
      icon: "mdi-tag",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  //users
  {
    path: "/usuarios",
    name: "users",
    component: () => import("@/views/users/Index.vue"),
    meta: {
      title: "USUARIOS",
      icon: "mdi-account-multiple",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/usuarios/agregar",
    name: "users.store",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "USUARIO | AGREGAR",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/usuarios/:id",
    name: "users.show",
    component: () => import("@/views/users/Show.vue"),
    meta: {
      title: "USUARIO",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/usuarios/:id/editar",
    name: "users.update",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "USUARIO | EDITAR",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  // {
  //   path: "/usuarios",
  //   name: "users",
  //   component: () => import("@/views/users/Resource.vue"),
  //   meta: {
  //     title: "USUARIOS",
  //     icon: "mdi-account-multiple",
  //     req_auth: true,
  //     permission: true,
  //   },
  // },
  //general
  {
    path: "/",
    name: "main",
    component: () => import("@/views/general/Main.vue"),
    meta: {
      title: "SVR",
    },
  },
  {
    path: "/inicio_sesion",
    name: "log_in",
    component: () => import("@/views/general/LogIn.vue"),
    meta: {
      title: "INICIAR SESIÓN",
    },
  },
  {
    path: "/inicio",
    name: "home",
    component: () => import("@/views/general/Home.vue"),
    meta: {
      title: "INICIO",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/acceso_denegado",
    name: "unauthorized",
    component: () => import("@/views/general/Unauthorized.vue"),
    meta: {
      title: "ACCESO DENEGADO",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not_found",
    component: () => import("@/views/general/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

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
  let auth = store.getters.getLog.auth;

  if (to.matched.some((record) => record.meta.req_auth)) {
    if (to.matched.some((record) => record.meta.permission)) {
      if (auth) {
        next();
      } else {
        next({ name: "log_in" });
      }
    } else {
      next({ name: "unauthorized" });
    }
  } else {
    if (auth) {
      next({ name: "home" });
    } else {
      next();
    }
  }

  document.title = to.meta.title;
});

export default router;
