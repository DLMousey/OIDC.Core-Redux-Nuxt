<script async setup lang="ts">
import {useFetch, useFetchConfig} from "#imports";
import ListItem from "~/components/applications/ListItem.vue";

const loading = ref(true);
const fetchConfig = useFetchConfig(`/applications`, { server: false, lazy: true });
const data = useFetch(fetchConfig.url, fetchConfig.config).then((res) => {
  loading.value = false;
  console.log(res.data);
  return res.data;
});

// console.log(data);
// loading.value = false;
</script>

<template>
<div class="applications">
  <div class="applications-toolbar">
    <NuxtLink to="applications/create">Create application</NuxtLink>
  </div>
  <div class="applications-list">
    <div v-if="loading">Loading</div>
    <div v-if="!loading && data == []">
      No applications found.
    </div>
    <ListItem v-for="application in data" key="application.id" application="application"></ListItem>
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