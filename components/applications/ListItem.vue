<script setup lang="ts">
import type IApplication from "~/data/models/IApplication";

defineProps<{
  application: IApplication
}>();
</script>

<template>
<div class="card">
  <div class="card-header">
    <h1>{{ application.name }}</h1>
  </div>
  <div class="card-body">
    <b>{{ application.description ?? "No description provided" }}</b>
  </div>
  <div class="card-footer">
    <a class="button" :href="application.homepageUrl">Homepage URL</a>
    <a class="button" :href="application.callbackUrl">Callback URL</a>
  </div>
</div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 8px;
  margin: 1em;
  padding: 1em;
  box-shadow: 0px 25px 25px 0px rgba(0,0,0,0.1);

  &-header {
    font-size: 16px;
    font-weight: bold;
    padding: 1em 1em 1em 0;
    border-bottom: 1px solid #EBEBEB;
  }

  &-body {
    padding: 1em 1em 1em 0;
    flex-grow: 1;
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    padding: 1em 1em 0em 0;
    border-top: 1px solid #EBEBEB;
  }
}
</style>