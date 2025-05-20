<script setup lang="ts">
import ListItem from "~/components/scopes/ListItem.vue";
import {useFetchWithRefresh} from "~/composables/fetch-refresh";
import {useFetchConfig} from "#imports";
import type IScope from "~/data/models/IScope";
import ErrorCard from "~/components/core/ErrorCard.vue";

const loading = ref(true);
const fetchConfig = useFetchConfig(`/scopes`, { server: false, lazy: true });


console.log('no cache hit, using network');
const { data, error } = await useFetchWithRefresh(fetchConfig.url, fetchConfig.config);

if (data) {
  loading.value = false;
}
</script>

<template>
<div class="scopes">
  <div class="scopes-toolbar">
    <NuxtLink to="scopes/create" class="button">Create Scope</NuxtLink>
  </div>
  <div class="table-container">
    <table class="table" v-if="!loading && data">
      <thead>
      <tr>
        <th>Name</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="scope in data" :key="scope.name">
        <td>{{ scope.name }}</td>
        <td width="10%"><NuxtLink class="button" :to="'/scopes/'+scope.name">Edit</NuxtLink> </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped lang="scss">
.scopes {
  &-toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
    border-bottom: 1px solid #EBEBEB;
    box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.1);
  }
}

.table-container {
  display: flex;
  flex-direction: column;
}

.table {
  //width: 100%;
  //border-collapse: collapse;
  //border: 1px solid red;
  margin: 1em;

  thead, tbody {
    width: 100%;
  }

  tr, th, td {
    text-align: left;
  }

  th {
    font-weight: bold;
    padding: 1em 0 1em 0.5em;
    border-bottom: 1px solid #DDD;
  }

  td {
    padding: 1em 0 1em 0.5em;
    border-bottom: 1px solid #DDD;

    &:last-child {
      padding-right: 1em;
    }

    .button {
      padding: 0.8em 0.25em;
      margin: 0;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 12px;
    }
  }

  tr {
    &:hover {
      cursor: pointer;
      background: #EEE;
    }
  }
}
</style>