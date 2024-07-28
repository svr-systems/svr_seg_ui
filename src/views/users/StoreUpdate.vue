<template>
  <v-card flat :disabled="ldg" :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack
            :route="{
              name: rte + (store ? '' : '.show'),
              params: { id: id },
            }"
          />
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right" />
      </v-row>
    </v-card-title>
    <v-card-text v-if="data">
      <v-form v-on:submit.prevent ref="data_form" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="GENERAL" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="data.name"
                      label="Nombre"
                      filled
                      dense
                      type="text"
                      :rules="rules.required"
                      maxlength="50"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="data.first_surname"
                      label="A. paterno"
                      filled
                      dense
                      type="text"
                      :rules="rules.required"
                      maxlength="25"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="data.second_surname"
                      label="A. materno*"
                      filled
                      dense
                      type="text"
                      maxlength="25"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-file-input
                      v-model="data.avatar_doc"
                      label="Fotografía (IMG)*"
                      filled
                      dense
                      :rules="rules.fileLmtNR"
                      show-size
                      prepend-icon=""
                      accept=".jpg,.jpeg,.png,.webp,.svg,.bmp"
                      :disabled="data.avatar_dlt"
                    >
                      <template v-slot:append>
                        <div v-if="!store && data.avatar && !data.avatar_doc">
                          <BtnDwd :val="data.avatar_b64" />
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                v-on="on"
                                icon
                                small
                                :color="data.avatar_dlt ? 'error' : ''"
                                @click.prevent="
                                  data.avatar_dlt = !data.avatar_dlt
                                "
                              >
                                <v-icon small>
                                  mdi-delete{{ data.avatar_dlt ? "-off" : "" }}
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>
                              {{ data.avatar_dlt ? "NO " : "" }} Eliminar
                            </span>
                          </v-tooltip>
                        </div>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="CUENTA" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" sm="12" md="3">
                    <v-select
                      v-model="data.role_id"
                      label="Rol"
                      filled
                      dense
                      :rules="rules.required"
                      :items="roles"
                      :item-text="(v) => v.name"
                      item-value="id"
                      :loading="roles_ldg"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="data.nickname"
                      label="Nom. usuario"
                      filled
                      dense
                      type="text"
                      :rules="rules.nickname"
                      maxlength="15"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="data.email"
                      label="E-mail"
                      filled
                      dense
                      type="text"
                      :rules="rules.email"
                      maxlength="50"
                      counter
                    />
                  </v-col>
                  <v-col v-if="store" cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="data.password"
                      label="Contraseña"
                      filled
                      dense
                      :type="pwd_show ? 'text' : 'password'"
                      :rules="rules.pwd"
                      maxlength="15"
                      counter
                      autocomplete="new-password"
                    >
                      <template v-slot:append>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-on="on"
                              icon
                              small
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
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    fab
                    x-small
                    :color="store ? 'success' : 'warning'"
                    @click.prevent="dataHandle"
                  >
                    <v-icon small> mdi-check</v-icon>
                  </v-btn>
                </template>
                <span> Confirmar </span>
              </v-tooltip>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { API, hdrs, val, err, rules, objAssign, toFormData } from "@/control";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import BtnDwd from "@/components/BtnDwd.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    BtnDwd,
  },

  data() {
    return {
      rte: "users",
      id: this.$route.params.id ? this.$route.params.id : null,
      log: this.$store.getters.getLog,
      ldg: true,
      store: true,
      data: null,
      rules: rules(),
      //CATALOGS
      roles: [],
      roles_ldg: true,
      //OTHERS
      pwd_show: false,
    };
  },

  methods: {
    getCatalogs() {
      Axios.get(API + "/roles", hdrs(this.log.token)).then((rsp) => {
        rsp = val(rsp);
        this.roles = rsp.data;
        this.roles_ldg = false;
      });
    },

    getData() {
      this.store = this.id == null;

      if (this.store) {
        this.data = {
          id: null,
          name: null,
          first_surname: null,
          second_surname: null,
          avatar: null,
          avatar_doc: null,
          avatar_dlt: false,
          nickname: null,
          email: null,
          password: null,
          role_id: null,
        };
        this.ldg = false;
      } else {
        Axios.get(API + "/" + this.rte + "/" + this.id, hdrs(this.log.token))
          .then((rsp) => {
            rsp = val(rsp);
            this.data = rsp.data;
            this.ldg = false;
          })
          .catch((e) => {
            this.$root.$alert("error", err(e));
          });
      }
    },

    dataHandle() {
      if (this.$refs.data_form.validate()) {
        this.$root
          .$confirm(
            "¿Confirma " + (this.store ? " agregar" : " editar") + " registro?"
          )
          .then((confirmed) => {
            if (confirmed) {
              this.ldg = true;

              let obj = objAssign(this.data, this.store);

              Axios.post(
                API + "/" + this.rte + (this.store ? "" : "/" + obj.id),
                toFormData(obj),
                hdrs(this.log.token, true)
              )
                .then((rsp) => {
                  rsp = val(rsp);

                  this.$root.$alert(
                    rsp.ok ? "success" : "error",
                    rsp.ok ? rsp.msg : err(rsp)
                  );

                  if (rsp.ok) {
                    this.$router.push({
                      name: this.rte + ".show",
                      params: { id: this.store ? rsp.data.id : this.id },
                    });
                  }

                  this.ldg = false;
                })
                .catch((e) => {
                  this.$root.$alert("error", err(e));
                  this.ldg = false;
                });
            }
          });
      } else {
        this.$root.$alert("error", "Revisa los detalles señalados");
      }
    },
  },

  mounted() {
    this.getCatalogs();
    this.getData();
  },
};
</script>