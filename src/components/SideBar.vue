<template>
  <v-navigation-drawer v-model="drawerValue" fixed temporary app clipped>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-img
            contain
            height="40"
            alt="logo"
            class="shrink mr-2"
            transition="scale-transition"
            :src="require('@/assets/logo.png')"
          />
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list dense nav>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="{ name: item.link }"
        v-if="item.show"
        link
      >
        <v-list-item-icon class="mr-0">
          <v-icon small>
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      log: this.$store.getters.getLog,
      items: [],
    };
  },
  computed: {
    drawerValue: {
      get: function () {
        return this.drawer;
      },
      set: function (v) {
        this.$emit("update:drawer", v);
      },
    },
  },
  mounted() {
    this.items = [
      {
        link: "home",
        title: "INICIO",
        icon: "mdi-home",
        show: true,
      },
      {
        link: "users",
        title: "USUARIOS",
        icon: "mdi-account-multiple",
        show: true,
      },
    ];
  },
};
</script>