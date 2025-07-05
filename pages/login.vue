<script setup lang="ts">
import {definePageMeta, useFetchConfig} from "#imports";
import type IAuthAttemptResponse from "~/data/models/IAuthAttemptResponse";
import type IAuthJwt from "~/data/models/IAuthJwt";
import * as v from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
  layout: 'form-card'
})

const state = reactive({
  loading: false,
  error: false
})

const formState = reactive({
  email: '',
  password: ''
});

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>;

const toast = useToast();
async function submitForm(event: FormSubmitEvent<Schema>): Promise<void> {
  const config = useFetchConfig(`/authentication`, {
    server: false,
    lazy: false,
    method: "POST",
    body: {
      email: event.data.email,
      password: event.data.password
    }
  });

  try {
    state.loading = true;
    const data = await $fetch<IAuthAttemptResponse>(config.url, config.config);
    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + data.expires_in);

    sessionStorage.setItem('_oidc.core.at', data.access_token);
    sessionStorage.setItem('_oidc.core.rt', data.refresh_token);
    sessionStorage.setItem('_oidc.core.exp', JSON.stringify(expiry.valueOf()));

    toast.add({
      title: 'Logged in successfully',
      description: 'You will be redirected in a moment...',
      color: 'success'
    });

    const route = useRoute();
    let redirPath = null;
    if (Object.keys(route.query).includes('redirectTo')) {
      redirPath = JSON.stringify(route.query.redirectTo)
          .replaceAll('"', '')
          .replace('/', '');
    } else {
      redirPath = '/';
    }

    await delay(3000);
    navigateTo(redirPath);
  } catch {
    state.loading = false;
    state.error = true;
    return null;
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<template>
  <UContainer class="flex flex-wrap justify-center content-center w-full h-full">
    <UForm :schema="schema" :state="formState" class="space-y-4 grow" @submit="submitForm">
      <h1>Log in</h1>
      <UFormField label="Email" name="email" class="w-full">
        <UInput v-model="formState.email" class="w-full" />
      </UFormField>
      <UFormField label="Password" name="password" class="w-full">
        <UInput v-model="formState.password" type="password" class="w-full" />
      </UFormField>
      <UButton type="submit" :disabled="state.loading && !state.error">
        Log in
      </UButton>
    </UForm>
  </UContainer>

</template>

<style scoped lang="scss">

</style>