<template>
  <v-app>
    <SideBar v-if="$store.getters.getLog.auth" :drawer.sync="drawer" />

    <v-app-bar app dense dark>
      <v-app-bar-nav-icon
        v-if="$store.getters.getLog.auth"
        @click="drawer = true"
      />

      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>

      <v-spacer />
      <div>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.prevent="darkModeAction">
              <v-icon> mdi-brightness-6 </v-icon>
            </v-btn>
          </template>
          Modo {{ $store.getters.getDarkMode ? "Obscuro" : "Claro" }}
        </v-tooltip>

        <v-tooltip v-if="$store.getters.getLog.auth" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
              :loading="log_ldg"
              :disabled="log_ldg"
              @click.prevent="logOutHandle"
            >
              <v-icon> mdi-logout-variant </v-icon>
            </v-btn>
          </template>
          Cerrar sesión
        </v-tooltip>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app padless dark>
      <v-row>
        <v-col cols="6">
          <small v-if="$store.getters.getLog.auth" class="pl-1">
            {{ $store.getters.getLog.user.username }}
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
      version: "v1.24.06.24",
      title: "SVR-SEG",
      drawer: false,
      log_ldg: false,
    };
  },

  methods: {
    logOut() {
      this.$store.dispatch("logOutAction");
      this.$router.push({ name: "log_in" });
      this.log_ldg = false;
    },
    logOutHandle() {
      this.$swal.fire(msgConfirm("¿Confirma cerrar la sesión?")).then((res) => {
        if (res.isConfirmed) {
          this.log_ldg = true;

          Axios.get(
            URL_API + "/auth/log_out",
            headers(this.$store.getters.getLog.token)
          )
            .then((res) => {
              if (res.data.success) {
                this.logOut();
              } else {
                this.$swal.fire(msgAlert("error", res.data.message));
              }
            })
            .catch((e) => {
              this.logOut();
            });
        }
      });
    },
    darkModeHandle() {
      this.$vuetify.theme.dark = !this.$store.getters.getDarkMode;
    },
    darkModeAction() {
      this.$store.dispatch("darkModeAction");
      this.darkModeHandle();
    },
  },
  mounted() {
    this.darkModeHandle();
  },
};
</script>

<style>
.theme--dark.v-application {
  background: #1e1e1e !important;
}
.v-tooltip__content {
  font-size: 12px !important;
}
.v-icon.v-icon {
  vertical-align: baseline !important;
}
.swal2-html-container,
.swal2-styled {
  font-family: "Roboto" !important;
}
</style>