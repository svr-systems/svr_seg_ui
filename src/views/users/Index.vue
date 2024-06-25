<template>
  <v-card flat :disabled="ldg">
    <v-card-title class="p-0">
      <v-row dense>
        <v-col cols="8" class="subtitle-1">
          <v-icon small> mdi-account-multiple </v-icon>
          {{ $route.meta.title }}
        </v-col>
        <v-col cols="4" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                small
                outlined
                color="success"
                @click.prevent="dataDlg(null)"
              >
                <v-icon small> mdi-plus </v-icon>
              </v-btn>
            </template>
            Agregar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row dense justify="end">
        <v-col cols="12" md="2">
          <v-text-field
            v-model="tbl_srch"
            label="Buscar..."
            dense
            type="text"
            single-line
            hide-details
          >
            <template v-slot:append>
              <v-icon small> mdi-magnify </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-data-table
            :items="tbl"
            :search="tbl_srch"
            :headers="tbl_hdrs"
            :loading="ldg"
            :items-per-page="15"
            dense
          >
            <template v-slot:item.key="{ item }">
              <b v-text="item.key + 1" />
            </template>
            <template v-slot:item.action="{ item }">
              <div class="text-right">
                <v-tooltip v-if="true" left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      x-small
                      color="primary"
                      @click.prevent="dataDlg(item)"
                    >
                      <v-icon small> mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  Detalle
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>

    <v-dialog
      v-model="data_dlg"
      persistent
      overlay-color="black"
      max-width="400"
    >
      <v-card flat :disabled="data_dlg_ldg" :loading="data_dlg_ldg">
        <v-card-title class="p-0">
          <v-row dense>
            <v-col cols="6" class="subtitle-1">
              <v-icon small>
                mdi-{{ store ? "plus" : update ? "pencil" : "eye" }}
              </v-icon>
              {{ store ? "AGREGAR" : update ? "EDITAR" : "DETALLE" }}
            </v-col>
            <v-col cols="6">
              <div class="text-right">
                <span v-if="show && !update">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        small
                        color="error"
                        @click.prevent="dataDelete"
                      >
                        <v-icon small> mdi-delete </v-icon>
                      </v-btn>
                    </template>
                    Eliminar
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        small
                        color="pink"
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
                        color="warning"
                        @click.prevent="update = true"
                      >
                        <v-icon small> mdi-pencil </v-icon>
                      </v-btn>
                    </template>
                    Editar
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        small
                        color="blue"
                        @click.prevent="reg_dlg = true"
                      >
                        <v-icon small> mdi-more </v-icon>
                      </v-btn>
                    </template>
                    Registro
                  </v-tooltip>
                </span>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      color="primary"
                      @click.prevent="
                        !update ? dataDlgClose() : (update = false)
                      "
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
        <v-card-text v-if="data">
          <v-form
            v-on:submit.prevent
            ref="data_form"
            lazy-validation
            :readonly="show && !update"
          >
            <v-row dense class="mt-1">
              <v-col cols="12">
                <v-text-field
                  v-model="data.username"
                  label="Usuario"
                  dense
                  type="text"
                  :rules="rules.username"
                  maxlength="20"
                  :counter="store || update"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="data.name"
                  label="Nombre"
                  dense
                  type="text"
                  :rules="rules.required"
                  maxlength="50"
                  :counter="store || update"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="data.email"
                  label="E-mail"
                  dense
                  type="text"
                  :rules="rules.email"
                  maxlength="50"
                  :counter="store || update"
                />
              </v-col>
              <v-col v-if="store" cols="12">
                <v-text-field
                  v-model="data.password"
                  label="Contraseña"
                  dense
                  :type="pwd_show ? 'text' : 'password'"
                  :rules="rules.password"
                  maxlength="15"
                  :counter="store || update"
                  autocomplete="new-password"
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
                <v-select
                  v-model="data.role_id"
                  label="Rol"
                  dense
                  :rules="rules.required"
                  :items="roles"
                  :item-text="(v) => v.name"
                  item-value="id"
                  :loading="roles_ldg"
                  :append-icon="store || update ? '$dropdown' : ''"
                />
              </v-col>
              <v-col v-if="store || update" cols="12">
                <div class="text-right">
                  <v-btn
                    icon
                    small
                    outlined
                    :color="store ? 'success' : 'warning'"
                    @click.prevent="dataHandle"
                  >
                    <v-icon small> mdi-check</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="reg_dlg"
      persistent
      overlay-color="black"
      max-width="350"
    >
      <v-card flat>
        <v-card-title class="p-0">
          <v-row dense>
            <v-col cols="6" class="subtitle-1">
              <v-icon small> mdi-more </v-icon>
              REGISTRO
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
          <v-form readonly>
            <v-row dense class="mt-1">
              <v-col cols="12">
                <v-text-field v-model="data.id" label="ID" dense type="text" />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="data.created_by.name"
                  label="Agregado por"
                  dense
                  type="text"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="data.created_at"
                  label="Fecha"
                  dense
                  type="text"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="data.updated_by.name"
                  label="Editado por"
                  dense
                  type="text"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="data.updated_at"
                  label="Últ. edición"
                  dense
                  type="text"
                />
              </v-col>
            </v-row>
          </v-form>
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
        <v-card-title class="p-0">
          <v-row dense>
            <v-col cols="6" class="subtitle-1">
              <v-icon small> mdi-lock </v-icon>
              EDITAR
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
            <v-row dense class="mt-1">
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
                  <v-btn
                    icon
                    small
                    outlined
                    color="pink"
                    @click.prevent="pwdHandle"
                  >
                    <v-icon small> mdi-check</v-icon>
                  </v-btn>
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
import Axios from "axios";
import { URL_API, headers, rules, msgAlert, msgConfirm } from "../../control";

export default {
  components: {},
  data() {
    return {
      log: this.$store.getters.getLog,
      ldg: false,
      tbl: [],
      tbl_srch: "",
      tbl_hdrs: [],
      tbl_item: null,
      store: false,
      show: false,
      update: false,
      rules: rules(),
      //DIALOGS
      data: null,
      data_dlg: false,
      data_dlg_ldg: false,
      reg_dlg: false,
      pwd: null,
      pwd_dlg: false,
      pwd_dlg_ldg: false,
      //CATALOGS
      roles: [],
      roles_ldg: true,
      //OTHERS
      pwd_show: false,
    };
  },
  methods: {
    getTbl() {
      this.ldg = true;
      this.tbl = [];

      Axios.get(
        URL_API + "/users?id=" + this.log.user.id,
        headers(this.log.token)
      ).then((res) => {
        this.tbl = res.data.data;
        this.ldg = false;
      });
    },

    dataDlg(tbl_item) {
      this.tbl_item = tbl_item;
      this.store = tbl_item == null;
      this.show = tbl_item != null;
      this.update = false;

      this.data_dlg_ldg = false;
      this.pwd_show = false;

      if (this.store) {
        this.data = {
          id: null,
          name: null,
          username: null,
          email: null,
          password: null,
          role_id: null,
        };
        this.data_dlg = true;
      } else {
        this.data_dlg_ldg = true;

        Axios.get(
          URL_API + "/users/" + this.tbl_item.id,
          headers(this.log.token)
        ).then((res) => {
          this.data = res.data.data;
          this.data_dlg_ldg = false;
          this.data_dlg = true;
        });
      }
    },

    dataDlgClose() {
      this.data_dlg = false;
      this.tbl_item = null;
      this.$refs.data_form.reset();
    },

    dataHandle() {
      if (this.$refs.data_form.validate()) {
        this.$swal
          .fire(
            msgConfirm(
              "¿Confirma " +
                (this.store ? " agregar" : " editar") +
                " registro?"
            )
          )
          .then((res) => {
            if (res.isConfirmed) {
              this.data_dlg_ldg = true;

              let obj = Object.assign({}, this.data);

              if (this.update) {
                obj._method = "PATCH";
              }

              Axios.post(
                URL_API + "/users" + (this.store ? "" : "/" + obj.id),
                obj,
                headers(this.log.token)
              ).then((res) => {
                this.$swal.fire(
                  msgAlert(
                    res.data.success ? "success" : "error",
                    res.data.message
                  )
                );

                if (res.data.success) {
                  let item = res.data.data;

                  if (this.store) {
                    item.key = this.tbl.length;
                    this.tbl.push(item);
                  } else {
                    item.key = this.tbl_item.key;
                    Object.assign(this.tbl[item.key], item);
                  }

                  this.dataDlg(item);
                } else {
                  console.log(res.data.message);
                }

                this.data_dlg_ldg = false;
              });
            }
          });
      } else {
        this.$swal.fire(msgAlert("error", "Revisa los detalles señalados"));
      }
    },

    dataDelete() {
      this.$swal
        .fire(msgConfirm("¿Confirma eliminar registro?"))
        .then((res) => {
          if (res.isConfirmed) {
            this.data_dlg_ldg = true;

            Axios.delete(
              URL_API + "/users/" + this.data.id,
              headers(this.log.token)
            ).then((res) => {
              this.$swal.fire(
                msgAlert(
                  res.data.success ? "success" : "error",
                  res.data.message
                )
              );

              if (res.data.success) {
                this.tbl.splice(this.tbl_item.key, 1);

                let counter = 0;
                for (let item of this.tbl) {
                  item.key = counter;
                  counter++;
                }

                this.dataDlgClose();
              } else {
                console.log(res.data.message);
              }

              this.data_dlg_ldg = false;
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
        this.$swal
          .fire(msgConfirm("¿Confirma actualizar contraseña?"))
          .then((res) => {
            if (res.isConfirmed) {
              this.pwd_dlg_ldg = true;

              Axios.post(
                URL_API + "/users/pwd_update",
                this.pwd,
                headers(this.log.token)
              ).then((res) => {
                this.$swal.fire(
                  msgAlert(
                    res.data.success ? "success" : "error",
                    res.data.message
                  )
                );

                if (res.data.success) {
                  this.pwdDlgClose();
                } else {
                  console.log(res.data.message);
                }

                this.pwd_dlg_ldg = false;
              });
            }
          });
      } else {
        this.$swal.fire(msgAlert("error", "Revisa los detalles señalados"));
      }
    },
  },
  mounted() {
    this.tbl_hdrs = [
      {
        value: "key",
        text: "#",
        filterable: false,
        width: "60",
      },
      {
        value: "name",
        text: "Nombre",
        filterable: true,
      },
      {
        value: "username",
        text: "Usuario",
        filterable: true,
      },
      {
        value: "email",
        text: "E-mail",
        filterable: true,
      },
      {
        value: "role_name",
        text: "Rol",
        filterable: true,
      },
      {
        value: "action",
        text: "",
        filterable: false,
        sortable: false,
        width: "60",
      },
    ];

    Axios.get(URL_API + "/roles", headers(this.log.token)).then((res) => {
      this.roles = res.data.data;
      this.roles_ldg = false;
    });

    this.getTbl();
  },
};
</script>
