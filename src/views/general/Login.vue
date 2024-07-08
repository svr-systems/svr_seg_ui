<template>
  <v-card flat>
    <v-card-title />
    <v-card-text>
      <v-row dense justify="center">
        <v-col cols="12" xs="10" md="3">
          <v-card flat :disabled="ldg" :loading="ldg">
            <v-card-title class="p-0">
              <v-row dense>
                <v-col cols="12" class="text-center">
                  <img height="55" :src="require('@/assets/logo.png')" />
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-form v-on:submit.prevent ref="data_form" lazy-validation>
                <v-row dense class="mt-1">
                  <v-col cols="12">
                    <v-text-field
                      v-model="data.email"
                      label="E-mail"
                      dense
                      type="text"
                      :rules="rules.email"
                      maxlength="50"
                      counter
                      prepend-icon="mdi-account"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="data.password"
                      label="Contraseña"
                      dense
                      :type="pwd_show ? 'text' : 'password'"
                      :rules="rules.required"
                      maxlength="15"
                      counter
                      prepend-icon="mdi-lock"
                    >
                      <template v-slot:append>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-on="on"
                              text
                              x-small
                              @click.prevent="pwd_show = !pwd_show"
                            >
                              <v-icon small>
                                mdi-eye{{ pwd_show ? "" : "-off" }}
                              </v-icon>
                            </v-btn>
                          </template>
                          <span> {{ pwd_show ? "Ocultar" : "Mostrar" }} </span>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <div class="text-right">
                      <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-on="on"
                            fab
                            x-small
                            color="warning"
                            @click.prevent="logIn"
                          >
                            <v-icon small> mdi-check</v-icon>
                          </v-btn>
                        </template>
                        <span> Iniciar sesión</span>
                      </v-tooltip>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { API, hdrs, val, err, rules } from "@/control";
import Axios from "axios";

export default {
  data() {
    return {
      rules: rules(),
      data: {
        email: null,
        password: null,
      },
      ldg: false,
      pwd_show: false,
    };
  },
  methods: {
    logIn() {
      if (this.$refs.data_form.validate()) {
        this.ldg = true;

        Axios.post(API + "/auth/log_in", this.data, hdrs())
          .then((rsp) => {
            rsp = val(rsp);

            if (rsp.ok) {
              this.$store.dispatch("logInAction", rsp.data);
              this.$router.push({ name: "home" });
            } else {
              this.$root.$alert("error", err(rsp));
            }

            this.ldg = false;
          })
          .catch((e) => {
            this.$root.$alert("error", err(e));
            this.ldg = false;
          });
      }
    },
  },
};
</script>