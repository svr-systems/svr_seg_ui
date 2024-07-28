<template>
  <div>
    <v-avatar size="21">
      <v-img v-if="fileObj" :src="fileObj" />
      <v-icon v-else size="21"> mdi-{{ icon_prop }} </v-icon> 
    </v-avatar>
    <span v-if="lab_prop" v-text="lab" class="ml-2 caption" />
  </div>
</template>

<script>
import { b64ToBlob } from "@/control";

export default {
  props: ["val", "lab", "icon"],
  data() {
    return {
      fileObj: null,
      lab_prop: null,
      icon_prop: null,
    };
  },

  mounted() {
    if (this.val) {
      this.fileObj = URL.createObjectURL(b64ToBlob(this.val.cnt, this.val.ext));
    }

    this.lab_prop = typeof this.lab != "undefined";
    this.icon_prop =
      typeof this.icon != "undefined" ? this.icon : "account-circle";
  },
};
</script>