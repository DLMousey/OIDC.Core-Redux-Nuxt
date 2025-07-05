<script setup lang="ts">
import {useFetchConfig} from "#imports";
import ListItem from "~/components/users/ListItem.vue";
import type IUser from "~/data/models/IUser";
import type IAuthRefreshResponse from "~/data/models/IAuthRefreshResponse";
import ErrorCard from "~/components/core/ErrorCard.vue";
import {useFetchWithRefresh} from "~/composables/fetch-refresh";

const loading = ref(true);
const users = ref(null);

const fetchConfig = useFetchConfig(`/users`, { server: false, lazy: true });
const { data, error } = await useFetchWithRefresh<IUser[]>(fetchConfig.url, fetchConfig.config);

if (data) {
  loading.value = false;
  users.value = data;
}
</script>

<template>
<div class="users">
  <div class="users-toolbar">
    <NuxtLink to="/users/create" class="button">Create User</NuxtLink>
  </div>
  <div class="table-container">
    <table class="table" v-if="!loading && data">
      <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Applications</th>
        <th>Access Tokens</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in data" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td><a :href="'mailto:'+user.email">{{ user.email }}</a></td>
        <td>0</td>
        <td>0</td>
        <td>
          <div class="button-group">
            <button class="button">Edit</button>
            <button class="button">Deactivate</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped lang="scss">
//.users {
//  display: flex;
//  flex-direction: column;
//  background: #FFF;
//  width: 100%;
//  height: 100%;
//
//  &-list {
//    display: flex;
//    flex-wrap: wrap;
//    width: 100%;
//    height: 100%;
//  }
//
//  &-listitem {
//    flex-basis: 30%;
//    height: 275px;
//  }
//
//  &-toolbar {
//    display: flex;
//    justify-content: flex-end;
//    padding: 1em;
//    border-bottom: 1px solid #EBEBEB;
//    box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.1);
//  }
//}
//
//.table-container {
//  display: flex;
//  flex-direction: column;
//}
//
//.table {
//  //width: 100%;
//  //border-collapse: collapse;
//  //border: 1px solid red;
//  margin: 1em;
//
//  thead, tbody {
//    width: 100%;
//  }
//
//  tr, th, td {
//    text-align: left;
//  }
//
//  th {
//    font-weight: bold;
//    padding: 1em 0 1em 0.5em;
//    border-bottom: 1px solid #DDD;
//  }
//
//  td {
//    padding: 1em 0 1em 0.5em;
//    border-bottom: 1px solid #DDD;
//
//    &:last-child {
//      padding-right: 1em;
//    }
//
//    .button {
//      padding: 0.8em 0.25em;
//      margin: 0;
//      text-transform: uppercase;
//      font-weight: bold;
//      font-size: 12px;
//    }
//  }
//
//  tr {
//    &:hover {
//      cursor: pointer;
//      background: #EEE;
//    }
//  }
//
//  .button-group {
//    display: flex;
//
//    .button:first-child {
//      border-top-right-radius: 0;
//      border-bottom-right-radius: 0;
//      border-right: 1px solid black;
//    }
//    .button:last-child {
//      border-top-left-radius: 0;
//      border-bottom-left-radius: 0;
//      border-left: 1px solid black;
//    }
//
//    .button:not(:first-child):not(:last-child) {
//      border-radius: 0;
//      border-left: 1px solid black;
//      border-right: 1px solid black;
//    }
//  }
//}
</style>