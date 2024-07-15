<template>
  <v-card flat :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack
            :route="{
              name: rte,
            }"
          />
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                small
                outlined
                color="pink"
                class="mr-1"
                @click.prevent="pwdDlg"
              >
                <v-icon small> mdi-lock </v-icon>
              </v-btn>
            </template>
            Contraseña
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                small
                outlined
                color="info"
                class="mr-1"
                @click.prevent="reg_dlg = true"
              >
                <v-icon small> mdi-more </v-icon>
              </v-btn>
            </template>
            Registro
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                small
                outlined
                color="warning"
                :to="{
                  name: rte + '.update',
                  params: { id: id },
                }"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
            </template>
            Editar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="data">
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
                  <DataVal :val="data.name" lab="Nombre" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <DataVal :val="data.first_surname" lab="A. paterno" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <DataVal :val="data.second_surname" lab="A. materno" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <DataFile :val="data.avatar_b64" lab="Fotografía" img />
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
                  <DataVal :val="data.role_name" lab="Rol" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <DataVal :val="data.nickname" lab="Nom. usuario" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <DataVal :val="data.email" lab="E-mail" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                small
                outlined
                color="error"
                @click.prevent="dataDelete"
              >
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </template>
            Eliminar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-text>

    <v-dialog
      v-model="reg_dlg"
      persistent
      overlay-color="black"
      max-width="350"
    >
      <v-card flat>
        <v-card-title class="card_title_border">
          <v-row dense>
            <v-col cols="6">
              <CardTitle text="REGISTRO" icon="mdi-more" sub />
            </v-col>
            <v-col cols="6">
              <div class="text-right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      color="primary"
                      @click.prevent="reg_dlg = false"
                    >
                      <v-icon small> mdi-close </v-icon>
                    </v-btn>
                  </template>
                  <span v-text="'Cerrar'" />
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text v-if="reg_dlg && data">
          <v-row dense>
            <v-col cols="12">
              <DataVal :val="data.id" lab="ID" />
            </v-col>
            <v-col cols="6">
              <DataVal
                :val="data.created_by.name"
                :sub="data.created_at"
                lab="Creación"
              />
            </v-col>
            <v-col cols="6">
              <DataVal
                :val="data.updated_by.name"
                :sub="data.updated_at"
                lab="Últ. edición"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="pwd_dlg"
      persistent
      overlay-color="black"
      max-width="350"
    >
      <v-card flat :disabled="pwd_dlg_ldg" :loading="pwd_dlg_ldg">
        <v-card-title class="card_title_border">
          <v-row dense>
            <v-col cols="6">
              <CardTitle text="EDITAR" icon="mdi-lock" sub />
            </v-col>
            <v-col cols="6">
              <div class="text-right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      color="primary"
                      @click.prevent="pwdDlgClose"
                    >
                      <v-icon small> mdi-close </v-icon>
                    </v-btn>
                  </template>
                  <span v-text="'Cerrar'" />
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text v-if="pwd">
          <v-form v-on:submit.prevent ref="pwd_form" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="pwd.password"
                  label="Contraseña"
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
              <v-col cols="12">
                <div class="text-right">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        fab
                        x-small
                        color="pink"
                        @click.prevent="pwdHandle"
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
    </v-dialog>
  </v-card>
</template>

<script>
import { API, hdrs, val, err, rules } from "@/control";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import DataVal from "@/components/DataVal.vue";
import DataFile from "@/components/DataFile.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    DataVal,
    DataFile,
  },
  data() {
    return {
      rte: "users",
      id: this.$route.params.id ? this.$route.params.id : null,
      log: this.$store.getters.getLog,
      ldg: true,
      data: null,
      reg_dlg: false,
      rules: rules(),
      //DIALOGS
      pwd: null,
      pwd_dlg: false,
      pwd_dlg_ldg: false,
      //OTHERS
      pwd_show: false,
    };
  },
  methods: {
    getData() {
      this.ldg = true;

      Axios.get(API + "/" + this.rte + "/" + this.id, hdrs(this.log.token))
        .then((rsp) => {
          rsp = val(rsp);
          this.data = rsp.data;
          this.ldg = false;
        })
        .catch((e) => {
          this.$root.$alert("error", err(e));
        });
    },

    dataDelete() {
      this.$root.$confirm("¿Confirma eliminar registro?").then((confirmed) => {
        if (confirmed) {
          this.ldg = true;

          Axios.delete(
            API + "/" + this.rte + "/" + this.data.id,
            hdrs(this.log.token)
          )
            .then((rsp) => {
              rsp = val(rsp);

              this.$root.$alert(
                rsp.ok ? "warning" : "error",
                rsp.ok ? rsp.msg : err(rsp)
              );

              if (rsp.ok) {
                this.$router.push({
                  name: this.rte,
                });
              }

              this.ldg = false;
            })
            .catch((e) => {
              this.$root.$alert("error", err(e));
            });
        }
      });
    },

    pwdDlg() {
      this.pwd_show = false;
      this.pwd = {
        id: this.data.id,
        password: null,
      };
      this.pwd_dlg_ldg = false;
      this.pwd_dlg = true;
    },

    pwdDlgClose() {
      this.pwd_dlg = false;
      this.$refs.pwd_form.reset();
    },

    pwdHandle() {
      if (this.$refs.pwd_form.validate()) {
        this.$root
          .$confirm("¿Confirma actualizar contraseña?")
          .then((confirmed) => {
            if (confirmed) {
              this.pwd_dlg_ldg = true;

              Axios.post(
                API + "/" + this.rte + "/pwd_update",
                this.pwd,
                hdrs(this.log.token)
              )
                .then((rsp) => {
                  rsp = val(rsp);

                  this.$root.$alert(
                    rsp.ok ? "success" : "error",
                    rsp.ok ? rsp.msg : err(rsp)
                  );

                  if (rsp.ok) {
                    this.pwdDlgClose();
                    this.getData();
                  }

                  this.pwd_dlg_ldg = false;
                })
                .catch((e) => {
                  this.$root.$alert("error", err(e));
                });
            }
          });
      } else {
        this.$root.$alert("error", "Revisa los detalles señalados");
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>