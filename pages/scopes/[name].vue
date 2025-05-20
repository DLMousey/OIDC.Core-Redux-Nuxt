<script setup lang="ts">
const route = useRoute();
const name = ref(route.params.name);
</script>

<template>
<form class="container container--form">
  <div class="form">
    <div class="form_group">
      <label for="name" class="form_group-label">Scope Name</label>
      <input type="email" class="form_group-input" v-model="name" />
    </div>
  </div>
  <pre>{{ name }}</pre>
</form>
</template>

<style scoped lang="scss">

</style>