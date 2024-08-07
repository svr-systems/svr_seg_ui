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
    <v-card-text v-if="item">
      <v-form v-on:submit.prevent ref="item_form" lazy-validation>
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
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="item.name"
                      label="Nombre"
                      filled
                      dense
                      type="text"
                      :rules="rules.required"
                      maxlength="30"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-color-picker
                      v-model="item.color"
                      mode="hexa"
                      hide-canvas
                      hide-sliders
                      hide-inputs
                      show-swatches
                    />
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
                    @click.prevent="saveItem"
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

export default {
  components: {
    BtnBack,
    CardTitle,
  },

  data() {
    return {
      rte: "tags",
      id: this.$route.params.id ? this.$route.params.id : null,
      log: this.$store.getters.getLog,
      ldg: true,
      store: true,
      item: null,
      rules: rules(),
    };
  },

  methods: {
    getItem() {
      this.store = this.id == null;

      if (this.store) {
        this.item = {
          id: null,
          name: null,
          color: "#F44336",
        };
        this.ldg = false;
      } else {
        Axios.get(API + "/" + this.rte + "/" + this.id, hdrs(this.log.token))
          .then((rsp) => {
            rsp = val(rsp);
            this.item = rsp.item;
            this.ldg = false;
          })
          .catch((e) => {
            this.$root.$alert("error", err(e));
          });
      }
    },

    saveItem() {
      if (this.$refs.item_form.validate()) {
        this.$root
          .$confirm(
            "¿Confirma " + (this.store ? " agregar" : " editar") + " registro?"
          )
          .then((confirmed) => {
            if (confirmed) {
              this.ldg = true;

              let obj = objAssign(this.item, this.store);

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
                      params: { id: this.store ? rsp.item.id : this.id },
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
    this.getItem();
  },
};
</script>