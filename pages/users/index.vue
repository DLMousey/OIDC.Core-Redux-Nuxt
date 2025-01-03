<script setup lang="ts">
import {useFetchConfig} from "#imports";
import {useFetchWithRefresh} from "#imports";
import ListItem from "~/components/users/ListItem.vue";
import type IUser from "~/data/models/IUser";

const loading = ref(true);
const fetchConfig = useFetchConfig(`/users`, { server: false, lazy: true });
const { data, error } = await useFetchWithRefresh(fetchConfig.url, fetchConfig.config);

if (data) {
  loading.value = false;
}
</script>

<template>
<div class="users">
  <div class="users-toolbar">
    <NuxtLink to="/users/create" class="button">Create User</NuxtLink>
  </div>
  <div class="users-list">
    <div v-if="loading">Loading</div>
    <div v-if="!loading && !data">
      No users found
    </div>
    <ListItem v-for="user in data as IUser[]" :key="user.id" :user="user" />
  </div>
</div>
</template>

<style scoped lang="scss">
.users {
  display: flex;
  flex-direction: column;
  background: #FFF;
  width: 100%;
  height: 100%;

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

  &-toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
    border-bottom: 1px solid #EBEBEB;
    box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.1);
  }
}
</style>