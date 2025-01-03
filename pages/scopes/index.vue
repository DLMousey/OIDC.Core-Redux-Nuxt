<script setup lang="ts">
import ListItem from "~/components/scopes/ListItem.vue";
import {useFetchWithRefresh} from "~/composables/fetch-refresh";
import {useFetchConfig} from "#imports";
import type IScope from "~/data/models/IScope";

const loading = ref(true);
const fetchConfig = useFetchConfig(`/scopes`, { server: false, lazy: true });
const { data, error } = await useFetchWithRefresh(fetchConfig.url, fetchConfig.config);

if (data) {
  loading.value = false;
}
</script>

<template>
<div class="scopes">
  <div class="scopes-toolbar">
<!--    <select>-->
<!--      <option v-for="(ns, idx) in namespaceList" :value="ns" :key="ns">{{ ns }}</option>-->
<!--    </select>-->
    <NuxtLink to="scopes/create" class="button">Create Scope</NuxtLink>
  </div>
  <div class="scopes-list">
    <div v-if="loading">Loading</div>
    <div v-if="!loading && !data">
      No scopes found.
    </div>
    <ListItem class="scopes-listitem" v-for="scope in data" :scope="scope" :key="scope.name" />
  </div>
</div>
</template>

<style scoped lang="scss">
.scopes {
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