<template>
  <v-app>
    <SideBar v-if="$store.getters.getLog.auth" :drawer.sync="drawer" />

    <v-app-bar app dense dark>
      <v-app-bar-nav-icon
        v-if="$store.getters.getLog.auth"
        @click.prevent="drawer = true"
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
          Modo {{ $store.getters.getConf.dark_mode ? "Obscuro" : "Claro" }}
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
            {{ $store.getters.getLog.user.nickname }}
          </small>
        </v-col>
        <v-col cols="6" class="text-right">
          <small class="pr-1">
            {{ version }}
          </small>
        </v-col>
      </v-row>
    </v-footer>

    <Alert ref="alert" />
    <Confirm ref="confirm" />
  </v-app>
</template>

<script>
import { API, hdrs, val, err } from "@/control";
import Axios from "axios";
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },

  data() {
    return {
      version: "v1.24.07.08",
      title: "SVR-SEG",
      drawer: false,
      log_ldg: false,
    };
  },

  methods: {
    logOut() {
      this.$store.dispatch("logOutAction");
      this.$router.push({ name: "log_in" });
    },

    logOutHandle() {
      this.$root.$confirm("¿Cerrar sesión?").then((confirmed) => {
        if (confirmed) {
          this.log_ldg = true;

          Axios.get(
            API + "/auth/log_out",
            hdrs(this.$store.getters.getLog.token)
          )
            .then((rsp) => {
              rsp = val(rsp);

              if (rsp.ok) {
                this.logOut();
              } else {
                this.$root.$alert("error", err(rsp));
                this.logOut();
              }

              this.log_ldg = false;
            })
            .catch((e) => {
              this.$root.$alert("error", err(e));
              this.logOut();
            });
        }
      });
    },

    darkModeHandle() {
      this.$vuetify.theme.dark = !this.$store.getters.getConf.dark_mode;
    },

    darkModeAction() {
      this.$store.dispatch("darkModeAction");
      this.darkModeHandle();
    },
  },
  mounted() {
    this.darkModeHandle();
    this.$root.$alert = this.$refs.alert.show;
    this.$root.$confirm = this.$refs.confirm.show;
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

.v-alert__icon {
  font-size: 16px !important;
  margin-right: 2px !important;
}

.v-card__title {
  padding: 10px !important;
}

.card_title_margin {
  margin-bottom: 16px !important;
}

.card_title_border {
  margin-bottom: 16px !important;
  border-bottom: 0.5px solid rgba(126, 126, 126, 0.2);
}
</style>