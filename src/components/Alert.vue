<template>
  <v-alert
    :value="visible"
    :type="type"
    transition="scroll-x-transition"
    border="left"
    class="alert-fixed"
    tile
    dense
  >
    {{ msg }}
  </v-alert>
</template>

<script>
export default {
  data: () => ({
    type: null,
    msg: null,
    visible: false,
  }),
  methods: {
    show(type, msg) {
      this.type = type;
      this.msg = msg;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
        this.type = null;
        this.msg = null;
      }, 4000);
    },
  },
};
</script>

<style scoped>
.alert-fixed {
  position: fixed !important;
  bottom: 12px !important;
  right: -3px !important;
  font-size: 15px !important;
}
</style>