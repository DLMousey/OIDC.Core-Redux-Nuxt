<script setup lang="ts">
import {useFetchConfig} from "~/composables/fetch-config";
let data;

if (import.meta.browser) {
  const route = useRoute();

  let string = '';
  const keys = Object.keys(route.query);
  for (const key of keys) {
    if (key != keys[keys.length - 1]) {
      string += `${key}=${route.query[key]}&`;
    } else {
      string += `${key}=${route.query[key]}`;
    }
  }


  try {
    const fetchConfig = useFetchConfig(`/oauth?${string}`, { server: false, lazy: true });
    data = await useFetch(fetchConfig.url, fetchConfig.config);
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
<div>
  <h1>OAuth page</h1>
  <ClientOnly fallback="Loading consent...">
    <pre>{{ data }}</pre>
  </ClientOnly>

</div>
</template>

<style scoped lang="scss">

</style>