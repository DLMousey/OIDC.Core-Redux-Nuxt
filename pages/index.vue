<script setup lang="ts">
import type IUser from "~/data/models/IUser";

const user = ref<IUser>();
const loading = ref(true);
const error = ref(false);

const config = useFetchConfig(`/users/private`, {
  server: false,
  lazy: false,
  method: "GET"
});

try {
  loading.value = true;
  user.value = await $fetch<IUser>(config.url, config.config);
  console.log(user);
  loading.value = false;
} catch {
  error.value = true;
  loading.value = false;
}
</script>

<template>
  <div class="homepage">
    <div class="homepage-toolbar">
      Toolbar here
    </div>
    <div class="homepage-content" v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div class="homepage-content" v-if="!loading">
      <div class="hero">
        <h2 class="hero-text">Welcome back, {{ user.username }}</h2>
      </div>
      <!-- todo: account security event endpoints to populate here -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.homepage {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &-toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
    border-bottom: 1px solid #EBEBEB;
    box-shadow: 0px 5px 25px 0px rgba(0,0,0,0.1);
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }
}
</style>