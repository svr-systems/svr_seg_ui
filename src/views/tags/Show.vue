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
                <v-col cols="12" sm="12" md="6">
                  <DataVal :val="data.name" lab="Nombre" />
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <DataVal :val="data.color" lab="Color" color />
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
  </v-card>
</template>

<script>
import { API, hdrs, val, err } from "@/control";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import DataVal from "@/components/DataVal.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    DataVal,
  },
  data() {
    return {
      rte: "tags",
      id: this.$route.params.id ? this.$route.params.id : null,
      log: this.$store.getters.getLog,
      ldg: true,
      data: null,
      reg_dlg: false,
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
  },
  mounted() {
    this.getData();
  },
};
</script>