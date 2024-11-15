<script setup lang="ts">
import {definePageMeta} from "#imports";

definePageMeta({
  layout: 'form-card'
})

const performLogout = () => {
  sessionStorage.clear();
  navigateTo('/login');
}
</script>

<template>
  <div class="form">
    <div class="header">
      <span class="text">
        <span class="text--lead">
          <NuxtLink to="/">
            <img src="/wordmark-light-theme.png" />
          </NuxtLink>
        </span>
        <span class="text--sub">Sign Out</span>
      </span>
    </div>
    <div class="form">
      <div class="form-group">
        <button type="button" @click="performLogout">Log out</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>