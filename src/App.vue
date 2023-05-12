<template>
  <v-app>
    <SideBar v-if="login.auth" :drawer.sync="drawer" />

    <v-app-bar v-if="login.auth" app color="grey darken-4" dense dark>
      <v-app-bar-nav-icon class="white--text" @click="drawer = true" />

      <div class="d-flex align-center">
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </div>

      <v-spacer />

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon dark @click="logoutAction">
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

    <v-footer v-if="login.auth" app padless>
      <v-row dense>
        <v-col cols="6">
          <small v-text="login.email" class="pl-1 font-weight-bold" />
        </v-col>
        <v-col cols="6" class="text-right">
          <small v-text="version" class="pr-1" />
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
      title: "FESSTIVA",
      version: "Versión 1.23.00.00",
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
.toolbar {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.v-main {
  background-color: #fcfcfc;
}

.swal2-html-container,
.swal2-styled {
  font-family: "Roboto" !important;
}
</style>