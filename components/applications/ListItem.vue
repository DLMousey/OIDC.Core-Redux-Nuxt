<script setup lang="ts">
defineProps<{
  application: {}
}>();
</script>

<template>
<div>
  <h1>{{ application.name }}</h1>
  <b>{{ application.description ?? "No description provided" }}</b>
  <a :href="application.homepageUrl">Homepage URL</a>
  <a :href="application.callbackUrl">Callback URL</a>
</div>
</template>

<style scoped lang="scss">

</style>