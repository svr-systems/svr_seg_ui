<template>
  <v-app>
    <SideBar v-if="login.auth" :drawer.sync="drawer" />

    <v-app-bar v-if="login.auth" app dense>
      <v-app-bar-nav-icon @click="drawer = true" />

      <div class="d-flex align-center">
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </div>

      <v-spacer />

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click="logoutAction">
            <v-icon> mdi-logout-variant </v-icon>
          </v-btn>
        </template>
        <span v-text="'Cerrar sesión'" />
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app padless>
      <v-row>
        <v-col cols="6">
          <small v-if="login.auth" class="pl-1">
            {{ login.user.username }}
          </small>
        </v-col>
        <v-col cols="6" class="text-right">
          <small class="pr-1">
            {{ version }}
          </small>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Axios from "axios";
import { URL_API, headers, msgConfirm, msgAlert } from "./control";
import SideBar from "./components/SideBar.vue";

export default {
  components: {
    SideBar,
  },

  data() {
    return {
      drawer: false,
      login: this.$store.getters.getLogin,
      title: "SVR-SEG",
      version: "v1.24.06.17",
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("logOutAction");
      window.location.assign("/inicio_sesion");
    },
    logoutAction() {
      this.$swal
        .fire(msgConfirm("¿Confirma cerrar la sesión?"))
        .then((resp) => {
          if (resp.isConfirmed) {
            Axios.get(`${URL_API}/auth/logout`, headers(this.login.token))
              .then((resp) => {
                if (resp.data.success) {
                  this.logout();
                } else {
                  this.$swal.fire(msgAlert("error", resp.data.message));
                }
              })
              .catch((e) => {
                this.logout();
              });
          }
        });
    },
  },
};
</script>

<style>
.theme--dark.v-application {
  background: #1e1e1e !important;
}
.v-tooltip__content {
  font-size: 13px !important;
}
.swal2-html-container,
.swal2-styled {
  font-family: "Roboto" !important;
}
</style>