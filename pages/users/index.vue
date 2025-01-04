<script setup lang="ts">
import {useFetchConfig} from "#imports";
import ListItem from "~/components/users/ListItem.vue";
import type IUser from "~/data/models/IUser";
import type IAuthRefreshResponse from "~/data/models/IAuthRefreshResponse";

const state = ref({
  loading: true,
  error: false
});

const users = ref(null);

const fetchUsers = async() : Promise<IUser[]> => {
  const config = useFetchConfig(`/users`, {
    server: false,
    lazy: false,
    method: "GET"
  });

  try {
    state.value.loading = true;
    const users = await $fetch<IUser[]>(config.url, config.config);
    state.value.loading = false;

    return users;
  } catch(err) {
    // Get a new access token and automatically retry if the API rejects our access token.
    // @TODO - add a property that identifies a retry so we don't end up in an infinite refresh loop
    // @TODO - abstract this out into a reusable method for cleaner error handling on pages
    if (err.statusCode == 401) {
      const errConfig = useFetchConfig(`/authentication/refresh`, {
        server: false,
        lazy: false,
        method: "POST",
        body: {
          refreshToken: sessionStorage.getItem('_oidc.core.rt')
        }
      });

      const rt = await $fetch<IAuthRefreshResponse>(errConfig.url, errConfig.config);
      let expVal: string|null = rt.expires_in.toString(10);
      let exp: number | null = null;
      if (expVal != null && expVal != "NaN") {
        exp = new Date(parseInt(expVal, 10)).valueOf();
        sessionStorage.setItem('_oidc.core.exp', JSON.stringify(exp));
      }

      sessionStorage.setItem('_oidc.core.at', rt.access_token);
      return await fetchUsers();
    }

    state.value.loading = false;
    state.value.error = true;
    return null;
  }
};

users.value = await fetchUsers();
</script>

<template>
<div class="users">
  <div class="users-toolbar">
    <NuxtLink to="/users/create" class="button">Create User</NuxtLink>
  </div>
  <div class="users-list">
    <div v-if="state.loading">fetching</div>
    <div v-if="!state.loading && !users">
      No users found
    </div>
    <ListItem v-for="user in users as IUser[]" :key="user.id" :user="user" />
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