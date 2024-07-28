<template>
  <v-card flat :disabled="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
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
                color="success"
                :to="{
                  name: rte + '.store',
                }"
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
            <template v-slot:item.logo="{ item }">
              <Avatar :val="item.logo_b64" icon="folder" />
            </template>
            <template v-slot:item.state.name="{ item }">
              <ItemVal :val="item.state.name" :color="item.state.color" />
            </template>
            <template v-slot:item.priority.name="{ item }">
              <ItemVal :val="item.priority.name" :color="item.priority.color" />
            </template>
            <template v-slot:item.user_property.nickname="{ item }">
              <Avatar
                :val="item.user_property.avatar_b64"
                :lab="item.user_property.nickname"
              />
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
                      :to="{
                        name: rte + '.show',
                        params: { id: item.id },
                      }"
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
  </v-card>
</template>

<script>
import { API, hdrs, val, err } from "@/control";
import Axios from "axios";
import CardTitle from "@/components/CardTitle.vue";
import Avatar from "@/components/Avatar.vue";
import ItemVal from "@/components/ItemVal.vue";

export default {
  components: {
    CardTitle,
    Avatar,
    ItemVal,
  },
  data() {
    return {
      rte: "projects",
      log: this.$store.getters.getLog,
      ldg: false,
      tbl: [],
      tbl_srch: "",
      tbl_hdrs: [],
      tbl_item: null,
    };
  },
  methods: {
    getTbl() {
      this.ldg = true;
      this.tbl = [];

      Axios.get(API + "/" + this.rte, hdrs(this.log.token))
        .then((rsp) => {
          rsp = val(rsp);
          this.tbl = rsp.data;
          this.ldg = false;
        })
        .catch((e) => {
          this.$root.$alert("error", err(e));
        });
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
        value: "logo",
        text: "",
        filterable: false,
        width: "22",
        sortable: false,
      },
      {
        value: "name",
        text: "Nombre",
        filterable: true,
      },
      {
        value: "start_date",
        text: "Inicio",
        filterable: true,
      },
      {
        value: "end_date",
        text: "Termino",
        filterable: true,
      },
      {
        value: "state.name",
        text: "Estado",
        filterable: true,
      },
      {
        value: "priority.name",
        text: "prioridad",
        filterable: true,
      },
      {
        value: "user_property.nickname",
        text: "Propietario",
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

    this.getTbl();
  },
};
</script>