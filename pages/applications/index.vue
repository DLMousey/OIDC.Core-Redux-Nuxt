<script async setup lang="ts">
import {useFetch, useFetchConfig} from "#imports";
import ListItem from "~/components/applications/ListItem.vue";
import {useFetchWithRefresh} from "~/composables/fetch-refresh";

const loading = ref(true);
const fetchConfig = useFetchConfig(`/applications`, { server: false, lazy: true });
const { data, error } = await useFetchWithRefresh(fetchConfig.url, fetchConfig.config);

console.log(data, error);
if (data) {
  loading.value = false;
}
</script>

<template>
<div class="applications">
  <div class="applications-toolbar">
    <NuxtLink to="applications/create" class="button">Create application</NuxtLink>
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

  &-list {
    display: flex;
    flex-wrap: wrap;
  }

  &-listitem {
    flex-basis: 30%;
    height: 275px;
  }

  &-toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
    border-bottom: 1px solid #EBEBEB;
    box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.1);
  }
}
</style>