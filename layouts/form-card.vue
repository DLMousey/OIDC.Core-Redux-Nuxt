<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const imgSrc = ref(`/wordmark-dark-theme.png`);
const items = ref<NavigationMenuItem[]>([
  {
    label: 'Log in',
    icon: 'i-lucide-log-in',
    to: '/login'
  }
])
</script>

<template>
  <header class="backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50">
    <div class="w-full max-w-(--ui-container) mx-auto px-4 flex items-center justify-between gap-3 h-full">
      <div class="lg:Flex-1 flex-items-center gap-1.5 min-w-0">
        <RouterLink to="/login"><img class="w-auth h-6 shrink-0" :src="imgSrc" /></RouterLink>
      </div>
      <div class="hidden lg:flex grow">
        <UNavigationMenu :items="items" class="w-full justify-center" />
      </div>
    </div>
  </header>
  <main>
    <slot />
  </main>
</template>