<template>
  <v-icon small :color="val ? 'info' : ''">
    mdi-checkbox-{{ val ? "marked" : "blank-outline" }}
  </v-icon>
</template>

<script>
export default {
  props: ["val"],
};
</script>