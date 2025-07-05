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
        <button class="button" type="submit" @click="performLogout">Log out</button>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
//.form {
//  padding: 24px;
//
//  .header {
//    border-bottom: 2px solid #FF575F;
//    padding: 6px 12px;
//
//    .text {
//      display: flex;
//      justify-content: space-between;
//      align-items: center;
//      width: 100%;
//      margin-bottom: 6px;
//
//      &--lead {
//        display: block;
//        img {
//          display: block;
//          max-width: 100%;
//          height: 50px;
//        }
//      }
//
//      &--sub {
//        display: block;
//        font-size: 18px;
//      }
//    }
//  }
//
//  button {
//    width: 100%;
//  }
//}
</style>