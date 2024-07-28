<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="val"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-on="on"
        v-bind="attrs"
        v-model="val"
        :label="label"
        :rules="rules"
        :disabled="$attrs.disabled"
        readonly
        dense
        filled
      />
    </template>
    <v-date-picker
      v-model="val"
      no-title
      scrollable
      :min="date_min"
      :max="date_max"
      color="warning"
    >
      <v-spacer />
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            x-small
            outlined
            color="danger"
            @click.prevent="cancel"
          >
            <v-icon small> mdi-close </v-icon>
          </v-btn>
        </template>
        Cancelar
      </v-tooltip>
      <v-tooltip v-if="clean" top>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            x-small
            outlined
            color="info"
            class="ml-1"
            @click.prevent="erase"
          >
            <v-icon small> mdi-eraser </v-icon>
          </v-btn>
        </template>
        Limpiar
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            small
            outlined
            color="warning"
            class="ml-1"
            @click.prevent="select"
          >
            <v-icon small> mdi-check </v-icon>
          </v-btn>
        </template>
        Aceptar
      </v-tooltip>
    </v-date-picker>
  </v-menu>
</template>

<script>
import { dateTimeNow } from "@/control";

export default {
  props: ["label", "model", "rules"],
  data() {
    return {
      menu: false,
      disabled: false,
      clean: false,
      date_min: "",
      date_max: "",

      // enableAllDate: typeof this.$attrs.all_date !== "undefined" ? true : false,
      // enableAfterDate:
      //   typeof this.$attrs.enableAfterDate !== "undefined" ? true : false,
    };
  },
  computed: {
    val: {
      get: function () {
        return this.model;
      },
      set: function (val_new) {
        this.$emit("update:model", val_new);
      },
    },
  },
  methods: {
    cancel() {
      this.menu = false;
    },
    erase() {
      this.$refs.menu.save(null);
    },
    select() {
      this.$refs.menu.save(this.val);
    },
  },
  mounted() {
    this.disabled =
      typeof this.$attrs.disabled !== "undefined"
        ? this.$attrs.disabled
        : false;
    this.clean = typeof this.$attrs.clean !== "undefined";

    const before = typeof this.$attrs.before !== "undefined";
    const after = typeof this.$attrs.after !== "undefined";

    if (before || after) {
      const now = dateTimeNow().substring(0, 10);

      if (before) {
        this.date_min = "1900-01-01";
        this.date_max = now;
      }

      if (after) {
        this.date_min = now;
        this.date_max = "";
      }
    }
  },
};
</script>