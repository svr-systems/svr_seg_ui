<template>
  <div>
    <span class="text-caption font-weight-bold">
      {{ $attrs.label }}
    </span>
    <v-icon v-if="$attrs.alert" small color="orange"> mdi-alert </v-icon>
    <br />
    <span class="text-description">
      {{ $attrs.value !== "" ? $attrs.value : "-" }}
    </span>
    <span v-if="$attrs.subvalue">
      <br />
      <span class="text-caption">
        {{ $attrs.subvalue }}
      </span>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style>
.text-description {
  white-space: pre-line;
}
</style>