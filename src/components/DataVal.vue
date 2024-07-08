<template>
  <div>
    <div class="text-caption font-weight-bold" v-text="lab" />
    <div v-if="!v_bool" class="text-description" v-text="v_val" />
    <div v-if="v_sub" class="text-caption" v-text="sub" />
  </div>
</template>

<script>
export default {
  props: ["lab", "val", "sub"],
  data() {
    return {
      v_val: null,
      v_sub: false,
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
  },
};
</script>

<style>
.text-description {
  white-space: pre-line;
}
</style>