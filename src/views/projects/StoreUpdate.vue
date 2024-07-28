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
                      :rules="rules.requiredTxt"
                      maxlength="50"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <InpDate
                      :model.sync="data.start_date"
                      label="Inicio"
                      :rules="rules.required"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <InpDate
                      :model.sync="data.end_date"
                      label="Termino*"
                      clean
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-file-input
                      v-model="data.logo_doc"
                      label="Fotografía (IMG)*"
                      filled
                      dense
                      :rules="rules.fileLmtNR"
                      show-size
                      prepend-icon=""
                      accept=".jpg,.jpeg,.png,.webp,.svg,.bmp"
                      :disabled="data.logo_dlt"
                    >
                      <template v-slot:append>
                        <div v-if="!store && data.logo && !data.logo_doc">
                          <BtnDwd :val="data.logo_b64" />
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                v-on="on"
                                icon
                                small
                                :color="data.logo_dlt ? 'error' : ''"
                                @click.prevent="data.logo_dlt = !data.logo_dlt"
                              >
                                <v-icon small>
                                  mdi-delete{{ data.logo_dlt ? "-off" : "" }}
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>
                              {{ data.logo_dlt ? "NO " : "" }} Eliminar
                            </span>
                          </v-tooltip>
                        </div>
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-select
                      v-model="data.state_id"
                      label="Estado"
                      filled
                      dense
                      :rules="rules.required"
                      :items="states"
                      :item-text="(v) => v.name"
                      item-value="id"
                      :loading="states_ldg"
                    >
                      <template slot="selection" slot-scope="data">
                        <v-chip small dark :color="data.item.color">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template slot="item" slot-scope="data">
                        <v-chip small dark :color="data.item.color">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-select
                      v-model="data.priority_id"
                      label="Prioridad"
                      filled
                      dense
                      :rules="rules.required"
                      :items="priorities"
                      item-value="id"
                      :loading="priorities_ldg"
                    >
                      <template slot="selection" slot-scope="data">
                        <v-chip small dark :color="data.item.color">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template slot="item" slot-scope="data">
                        <v-chip small dark :color="data.item.color">
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="data.description"
                      label="Descripción"
                      filled
                      dense
                      :rules="rules.requiredTxt"
                      rows="2"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="12" md="6">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="MODULOS" sub />
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          icon
                          small
                          color="info"
                          href="https://pictogrammers.com/library/mdi/"
                          target="_blank"
                        >
                          <v-icon small> mdi-magnify </v-icon>
                        </v-btn>
                      </template>
                      Buscar iconos
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="5">
                    <v-text-field
                      v-model="project_module.icon"
                      label="Icono"
                      filled
                      dense
                      type="text"
                      maxlength="30"
                      counter
                      :append-icon="'mdi-' + project_module.icon"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="project_module.name"
                      label="Nombre"
                      filled
                      dense
                      type="text"
                      maxlength="50"
                      counter
                    />
                  </v-col>
                  <v-col cols="1" class="pt-5 text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          icon
                          small
                          outlined
                          color="warning"
                          :disabled="project_module.name == ''"
                          @click="projectModuleAdd"
                        >
                          <v-icon small> mdi-plus </v-icon>
                        </v-btn>
                      </template>
                      Agregar
                    </v-tooltip>
                  </v-col>
                  <v-col cols="12">
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Icono</th>
                            <th>Nombre</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(project_module, i) in data.project_modules"
                            :key="i"
                            v-if="project_module.active"
                          >
                            <td style="width: 20px" v-text="i + 1" />
                            <td style="width: 20px">
                              <v-icon small>
                                {{ project_module.icon }}
                              </v-icon>
                            </td>
                            <td v-text="project_module.name" />
                            <td style="width: 20px">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    v-on="on"
                                    icon
                                    small
                                    outlined
                                    color="error"
                                    @click="
                                      arrDelete(
                                        i,
                                        data.project_modules,
                                        'modulo'
                                      )
                                    "
                                  >
                                    <v-icon small> mdi-delete </v-icon>
                                  </v-btn>
                                </template>
                                Eliminar
                              </v-tooltip>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="12" md="6">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="COLABORADORES" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="11">
                    <v-autocomplete
                      v-model="user"
                      label="Buscar..."
                      filled
                      dense
                      :items="users"
                      :filter="usersFilter"
                      return-object
                      :loading="users_ldg"
                    >
                      <template slot="selection" slot-scope="data">
                        <Avatar
                          :val="data.item.avatar_b64"
                          :lab="data.item.nickname"
                        />
                      </template>
                      <template slot="item" slot-scope="data">
                        <Avatar
                          :val="data.item.avatar_b64"
                          :lab="data.item.nickname"
                        />
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="1" class="pt-5 text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          icon
                          small
                          outlined
                          color="warning"
                          :disabled="user == null"
                          @click="projectUserAdd"
                        >
                          <v-icon small> mdi-account-plus </v-icon>
                        </v-btn>
                      </template>
                      Agregar
                    </v-tooltip>
                  </v-col>
                  <v-col cols="12">
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Usuario</th>
                            <th>Ver</th>
                            <th>Editar</th>
                            <th>Agregar</th>
                            <th>Eliminar</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(project_user, i) in data.project_users"
                            :key="project_user.user.avatar"
                            v-if="project_user.active"
                          >
                            <td style="width: 20px" v-text="i + 1" />
                            <td>
                              <Avatar
                                :val="project_user.user.avatar_b64"
                                :lab="project_user.user.nickname"
                              />
                            </td>
                            <td>
                              <v-checkbox
                                v-model="project_user.read"
                                color="info"
                                dense
                              />
                            </td>
                            <td>
                              <v-checkbox
                                v-model="project_user.update"
                                color="info"
                                dense
                              />
                            </td>
                            <td>
                              <v-checkbox
                                v-model="project_user.create"
                                color="info"
                                dense
                              />
                            </td>
                            <td>
                              <v-checkbox
                                v-model="project_user.delete"
                                color="info"
                                dense
                              />
                            </td>
                            <td style="width: 20px">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    v-on="on"
                                    icon
                                    small
                                    outlined
                                    color="error"
                                    @click="
                                      arrDelete(
                                        i,
                                        data.project_users,
                                        'colaborador'
                                      )
                                    "
                                  >
                                    <v-icon small> mdi-delete </v-icon>
                                  </v-btn>
                                </template>
                                Eliminar
                              </v-tooltip>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
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
import {
  API,
  hdrs,
  val,
  err,
  rules,
  objAssign,
  toFormData,
  dateTimeNow,
} from "@/control";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import BtnDwd from "@/components/BtnDwd.vue";
import InpDate from "@/components/InpDate.vue";
import DataFile from "@/components/DataFile.vue";
import Avatar from "@/components/Avatar.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    BtnDwd,
    InpDate,
    DataFile,
    Avatar,
  },

  data() {
    return {
      rte: "projects",
      id: this.$route.params.id ? this.$route.params.id : null,
      log: this.$store.getters.getLog,
      ldg: true,
      store: true,
      data: null,
      rules: rules(),
      //CATALOGS
      states: [],
      states_ldg: true,
      priorities: [],
      priorities_ldg: true,
      users: [],
      users_ldg: true,
      //OTHERS
      user: null,
      project_module: {
        name: "",
        icon: "",
      },
    };
  },

  methods: {
    getCatalogs() {
      Axios.get(API + "/states", hdrs(this.log.token)).then((rsp) => {
        rsp = val(rsp);
        this.states = rsp.data;
        this.states_ldg = false;
      });

      Axios.get(API + "/priorities", hdrs(this.log.token)).then((rsp) => {
        rsp = val(rsp);
        this.priorities = rsp.data;
        this.priorities_ldg = false;
      });

      Axios.get(
        API + "/users?id=" + this.log.user.id,
        hdrs(this.log.token)
      ).then((rsp) => {
        rsp = val(rsp);
        this.users = rsp.data;
        this.users_ldg = false;
      });
    },

    usersFilter(item, queryText) {
      return item.nickname
        .trim()
        .toLowerCase()
        .includes(queryText.trim().toLowerCase());
    },

    getData() {
      this.store = this.id == null;

      if (this.store) {
        this.data = {
          id: null,
          name: null,
          description: null,
          start_date: dateTimeNow().substring(0, 10),
          end_date: null,
          logo: null,
          logo_doc: null,
          logo_dlt: false,
          user_property_id: this.log.user.id,
          state_id: null,
          priority_id: null,
          project_users: [],
          project_modules: [],
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

    arrDelete(i, arr, txt) {
      this.$root
        .$confirm("¿Confirma eliminar " + txt + " (" + (i + 1) + ")?")
        .then((confirmed) => {
          if (confirmed) {
            if (arr[i].id === null) {
              arr.splice(i, 1);
            } else {
              arr[i].active = false;
            }
          }
        });
    },

    projectModuleAdd() {
      const res = this.data.project_modules.find(
        (item) => item.name === this.project_module.name.trim().toUpperCase()
      );

      if (typeof res == "undefined") {
        this.data.project_modules.push({
          id: null,
          active: true,
          icon: "mdi-" + this.project_module.icon.trim().toLowerCase(),
          name: this.project_module.name.trim().toUpperCase(),
          project_id: null,
        });
      } else {
        this.$root.$alert(
          "warning",
          "El modulo ya se encuentra registrado en la lista"
        );
      }

      this.project_module.icon = "";
      this.project_module.name = "";
    },

    projectUserAdd() {
      const res = this.data.project_users.find(
        (item) => item.user_id === this.user.id
      );

      if (typeof res == "undefined") {
        this.data.project_users.push({
          id: null,
          active: true,
          create: false,
          read: true,
          update: false,
          delete: false,
          project_id: null,
          user_id: this.user.id,
          user: this.user,
        });
      } else {
        this.$root.$alert(
          "warning",
          "El usuario ya se encuentra en la lista de colaboradores"
        );
      }

      this.user = null;
    },

    dataHandle() {
      if (
        !this.data.end_date ||
        new Date(this.data.end_date) >= new Date(this.data.start_date)
      ) {
        if (this.$refs.data_form.validate()) {
          this.$root
            .$confirm(
              "¿Confirma " +
                (this.store ? " agregar" : " editar") +
                " registro?"
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
      } else {
        this.$root.$alert(
          "error",
          "La fecha de Termino no puede ser menor a la de Inicio"
        );
      }
    },
  },

  mounted() {
    this.getCatalogs();
    this.getData();
  },
};
</script>