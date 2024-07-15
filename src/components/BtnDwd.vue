<template>
  <span>
    <v-tooltip v-if="fileObj" bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon small @click.prevent="fileDownload">
          <v-icon small> mdi-download </v-icon>
        </v-btn>
      </template>
      Descargar
    </v-tooltip>
  </span>
</template>

<script>
import { b64ToBlob, dateTimeNow } from "@/control";
import CardTitle from "@/components/CardTitle.vue";

export default {
  props: ["val"],
  components: {
    CardTitle,
  },
  data() {
    return {
      fileObj: null,
      img_prop: null,
      img_dlg: false,
    };
  },

  methods: {
    fileDownload() {
      let link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.href = this.fileObj;
      link.download = dateTimeNow("", "", "") + "." + this.val.ext;
      link.click();
    },
  },

  mounted() {
    if (this.val) {
      this.fileObj = URL.createObjectURL(b64ToBlob(this.val.cnt, this.val.ext));
    }
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>