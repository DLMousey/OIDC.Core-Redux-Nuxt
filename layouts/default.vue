<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const colourMode = useColorMode();
const imgSrc = ref(`/wordmark-dark-theme.png`);

const authState = useAuth();
const isAdmin = useIsAdmin();

const active = ref();
defineShortcuts({
  1: () => {
    active.value = '0'
  },
  2: () => {
    active.value = '1'
  },
  3: () => {
    active.value = '2'
  }
})

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Applications',
    icon: 'i-lucide-app-window-mac',
    to: '/applications',
    children: [
      {
        label: 'Create New',
        icon: 'i-lucide-circle-fading-plus',
        to: '/applications/create',
        description: 'Create a new OAuth application'
      },
      {
        label: 'Published Applications',
        icon: 'i-lucide-user',
        to: '/applications',
        description: 'Applications belonging to you'
      },
      {
        label: 'Authorised Applications',
        icon: 'i-lucide-user-plus',
        to: '/applications',
        description: 'Applications with access to your account'
      }
    ]
  },
  {
    label: 'Users',
    icon: 'i-lucide-book-user',
    to: '/users',
    children: [
      {
        label: 'Create New',
        icon: 'i-lucide-circle-fading-plus',
        to: '/users/create',
        description: 'Create a new user'
      }
    ]
  },
  {
    label: 'Scopes',
    icon: 'i-lucide-telescope',
    to: '/scopes',
    children: [
      {
        label: 'Create New',
        icon: 'i-lucide-circle-fading-plus',
        to: '/scopes/create',
        description: 'Create a new scope'
      },
      {
        label: 'Dangerous',
        icon: 'i-lucide-triangle',
        to: '/scopes',
        description: 'List scopes marked as dangerous'
      }
    ]
  },
]);

if (authState) {
  items.value.push({
    label: 'Log out',
    icon: 'i-lucide-log-out',
    to: '/logout'
  })
}
</script>

<template>
<header class="backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50">
  <div class="w-full max-w-(--ui-container) mx-auto px-4 flex items-center justify-between gap-3 h-full">
    <div class="lg:flex-1 flex items-center gap-1.5 min-w-0">
      <RouterLink to="/"><img class="w-auto h-6 shrink-0" :src="imgSrc" /></RouterLink>
    </div>
    <div class="hidden lg:flex grow">
      <UNavigationMenu v-model="active" :items="items" class="w-full justify-center" />
    </div>
  </div>
</header>
<main class="h-full">
  <slot />
</main>
</template>