<script setup lang="ts">
import {ref, useFetchConfig} from "#imports";
import {useFetchWithRefresh} from "~/composables/fetch-refresh";

const state = ref({
  loading: true,
  error: false
});

const application = ref(JSON.parse(sessionStorage.getItem('__application')));

async function updateApplication() {
  state.value.loading = true;
  const fetchConfig = useFetchConfig(`/applications/${application.value.id}`, {
    server: false,
    lazy: true,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const { data, error } = await useFetchWithRefresh(fetchConfig.url, fetchConfig.config);

  if (error) {
    state.value.loading = false;
    state.value.error = true;
  }

  // application.value = data;
  state.value.loading = false;
  state.value.error = false;
}
</script>

<template>
  <h2>FORM</h2>
<!--<form class="pr-2 pl-2 pt-2" @submit="updateApplication">-->
<!--  <h2>Edit Application</h2>-->
<!--  <hr>-->
<!--  <div class="field">-->
<!--    <label class="label">Name</label>-->
<!--    <input type="text" class="input" v-model="application.name" />-->
<!--  </div>-->
<!--  <div class="field">-->
<!--    <label class="label">Description</label>-->
<!--    <textarea class="textarea" v-model="application.description"></textarea>-->
<!--  </div>-->
<!--  <div class="field">-->
<!--    <label class="label">Homepage URL</label>-->
<!--    <input type="text" class="input" v-model="application.homepageUrl" />-->
<!--  </div>-->
<!--  <div class="field">-->
<!--    <label class="label">Callback URL</label>-->
<!--    <input type="text" class="input" v-model="application.callbackUrl" />-->
<!--  </div>-->
<!--  <div class="field">-->
<!--    <button type="button" class="button">Update</button>-->
<!--    <button type="button" class="button" @click="$router.go(-1)">Cancel</button>-->
<!--  </div>-->
<!--</form>-->
</template>

<style scoped lang="scss">

</style>