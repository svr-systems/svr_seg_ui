<template>
  <div>
    <div class="text-caption font-weight-bold" v-text="lab" />
    <div v-if="!v_bool" class="text-description">
      <span v-if="!v_color" v-text="v_val" />
      <v-chip v-else x-small dark :color="v_val">
        {{ v_val }}
      </v-chip>
    </div>
    <div v-if="v_sub" class="text-caption" v-text="sub" />
  </div>
</template>

<script>
export default {
  props: ["lab", "val", "sub", "color"],
  data() {
    return {
      v_val: null,
      v_sub: false,
      v_color: false,
      v_bool: false,
    };
  },

  mounted() {
    if (typeof this.val == "boolean") {
      this.v_bool = true;
      this.v_val = this.val;
    } else {
      this.v_val = !this.val || this.val == "" ? "-" : this.val;
    }

    this.v_sub = typeof this.sub != "undefined";
    this.v_color = typeof this.color != "undefined";
  },
};
</script>

<style>
.text-description {
  white-space: pre-line;
}
</style>