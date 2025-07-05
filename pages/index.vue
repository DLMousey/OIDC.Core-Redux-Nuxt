<script setup lang="ts">
import type IUser from "~/data/models/IUser";

const user = ref<IUser>();
const loading = ref(true);
const error = ref(false);

const config = useFetchConfig(`/users/private`, {
  server: false,
  lazy: false,
  method: "GET"
});

try {
  loading.value = true;
  user.value = await $fetch<IUser>(config.url, config.config);
  console.log(user);
  loading.value = false;
} catch {
  error.value = true;
  loading.value = false;
}
</script>

<template>
  <h2>Welcome back, {{ user?.username ?? "Unknown" }}</h2>
</template>

<style scoped lang="scss">

</style>