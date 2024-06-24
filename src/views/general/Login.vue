<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-spacer />
      </v-col>
      <v-col cols="12" xs="10" md="4">
        <v-card class="mx-auto" :loading="loading" :disabled="loading">
          <v-card-title>
            <v-row>
              <v-col cols="12" class="text-center">
                <img height="55" :src="require('@/assets/logo.png')" />
                <br />
                <small>SVR-SEG</small>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form ref="password_form" lazy-validation>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre de usuario"
                    v-model="password.email"
                    dense
                    type="text"
                    :rules="rules.required"
                    maxlength="50"
                    prepend-icon="mdi-account"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Contraseña"
                    v-model="password.password"
                    dense
                    :type="password_show ? 'text' : 'password'"
                    :rules="rules.required"
                    maxlength="50"
                    prepend-icon="mdi-lock"
                    :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="password_show = !password_show"
                  />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn block small color="warning" @click.prevent="logIn">
                    Iniciar Sesión
                    <v-icon small right> mdi-send </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
import { URL_API, headers, rules, msgAlert } from "../../control";

export default {
  data: () => ({
    loading: false,
    password_show: false,
    password: {
      email: "",
      password: "",
    },
    rules: rules(),
  }),

  methods: {
    logIn() {
      if (this.$refs.password_form.validate()) {
        this.loading = true;

        Axios.post(URL_API + "/auth/login", this.password, headers(null)).then(
          (resp) => {
            if (resp.data.auth) {
              this.$store.dispatch("logInAction", resp.data);
              window.location.assign("/inicio");
            } else {
              this.$swal.fire(msgAlert("error", resp.data.message));
              this.loading = false;
            }
          }
        );
      }
    },
  },
};
</script>