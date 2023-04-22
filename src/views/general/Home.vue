<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.png')"
          class="my-3"
          contain
          height="90"
        />
      </v-col>

      <v-col cols="12" class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3" v-text="'Bienvenido'" />

        <p class="subheading font-weight-regular">
          <span v-text="login.email" />
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      login: this.$store.getters.getLogin,
    };
  },
};
</script>
