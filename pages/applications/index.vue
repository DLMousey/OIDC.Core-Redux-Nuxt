<script async setup lang="ts">
import {useFetch, useFetchConfig} from "#imports";
import ListItem from "~/components/applications/ListItem.vue";

const loading = ref(true);
const fetchConfig = useFetchConfig(`/applications`, { server: false, lazy: true });
const { data, error } = await useFetch(fetchConfig.url, fetchConfig.config);

console.log(data, error);
if (data) {
  loading.value = false;
}
</script>

<template>
<div class="applications">
  <div class="applications-toolbar">
    <NuxtLink to="applications/create">Create application</NuxtLink>
  </div>
  <div class="applications-list">
    <div v-if="loading">Loading</div>
    <div v-if="!loading && !data">
      No applications found.
    </div>
    <ListItem v-for="application in data" :application="application" :key="application.id" />
  </div>
</div>
</template>

<style scoped lang="scss">
.applications {
  display: flex;
  background: #FFF;
  width: 100%;
  height: 100%;
}
</style>