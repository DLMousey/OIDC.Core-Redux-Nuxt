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
    <ListItem class="applications-listitem" v-for="application in data" :application="application" :key="application.id" />
  </div>
</div>
</template>

<style scoped lang="scss">
.applications {
  display: flex;
  flex-direction: column;
  background: #FFF;
  width: 100%;
  height: 100%;

  //&-list {
  //  display: flex;
  //  flex-basis: 23%;
  //  flex-wrap: wrap;
  //  flex-grow: 1;
  //  flex-shrink: 0;
  //  width: 100%;
  //  height: 100%;
  //  align-items: center;
  //  justify-content: center;
  //}

  &-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  &-listitem {
    flex-basis: 30%;
    height: 275px;
  }
}
</style>