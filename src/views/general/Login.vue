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
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-form ref="form_data" lazy-validation>
                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field
                        label="Nombre de usuario"
                        v-model="data.email"
                        type="text"
                        maxlength="50"
                        :rules="rules.required"
                        :disabled="loading"
                        prepend-icon="mdi-account"
                        @keyup.enter="submitForm"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Contraseña"
                        v-model="data.password"
                        :type="password_show ? 'text' : 'password'"
                        maxlength="50"
                        :rules="rules.required"
                        :disabled="loading"
                        prepend-icon="mdi-lock"
                        @keyup.enter="submitForm"
                        :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="password_show = !password_show"
                      />
                    </v-col>
                    <v-col cols="12" class="text-right">
                      <v-btn
                        block
                        color="info"
                        :loading="loading"
                        @click.prevent="submitForm"
                      >
                        <v-icon left v-text="'mdi-check'" />
                        Iniciar Sesión
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
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
    data: {
      email: "",
      password: "",
    },
    rules: rules(),
  }),

  methods: {
    submitForm() {
      if (this.$refs.form_data.validate()) {
        this.loading = true;

        Axios.post(`${URL_API}/auth/login`, this.data, headers(null)).then(
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