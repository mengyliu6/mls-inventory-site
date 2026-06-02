<template>
  <span class="vue-runtime-marker" aria-hidden="true"></span>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(async () => {
  await import("../../app.js");
});
</script>
