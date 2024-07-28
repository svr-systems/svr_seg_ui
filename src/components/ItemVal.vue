<template>
  <div>
    <div v-if="lab_prop" class="text-caption font-weight-bold" v-text="lab" />
    <div v-if="!bool_prop" class="text-description">
      <span v-if="!color_prop" v-text="val" />
      <v-chip v-else x-small dark :color="color">
        {{ val }}
      </v-chip>
    </div>
    <div v-else>
      <v-icon small :color="val ? 'info' : ''">
        checkbox-blank-circle{{ val ? "" : "-outline" }}
      </v-icon>
    </div>
    <div v-if="sub_prop" class="text-caption" v-text="sub" />
  </div>
</template>

<script>
export default {
  props: ["val", "lab", "sub", "color"],
  data() {
    return {
      val_prop: null,
      lab_prop: false,
      sub_prop: false,
      color_prop: false,
      bool_prop: false,
    };
  },

  mounted() {
    if (typeof this.val == "boolean") {
      this.bool_prop = true;
    } else {
      this.val = !this.val || this.val == "" ? "-" : this.val;
    }

    this.lab_prop = typeof this.lab != "undefined";
    this.sub_prop = typeof this.sub != "undefined";
    this.color_prop = typeof this.color != "undefined";
  },
};
</script>

<style>
.text-description {
  white-space: pre-line;
}
</style>