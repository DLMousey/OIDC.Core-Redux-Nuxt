<script async setup lang="ts">
import * as v from 'valibot';
import {useFetchConfig} from "#imports";

const state = reactive({
  loading: false,
  error: false
});

const formState = reactive({
  name: '',
  homepageUrl: '',
  description: '',
  callbackUrl: ''
});

const schema = v.object({
  name: v.pipe(v.string()),
  homepageUrl: v.pipe(v.string(), v.url('A homepage URL must be provided')),
  description: v.pipe(v.string()),
  callbackUrl: v.pipe(v.string(), v.url('A callback URL must be provided'))
});

type Schema = v.InferOutput<typeof schema>;
const toast = useToast();

async function processForm(event: Event): Promise<void> {
  state.loading = true;
  state.error = false;

  const fetchConfig = useFetchConfig(`/applications`, {
    server: false,
    lazy: false,
    method: "POST",
    body: formState
  });

  const result = await useFetch(fetchConfig.url, fetchConfig.config);
  if (!result) {
    state.error = true;
    toast.add({
      title: 'Failed to create application',
      description: 'Please double check your input and try again',
      color: 'error'
    });
  }

  toast.add({
    title: 'Application created successfully',
    description: `${formState.name} was created successfully. Redirecting to application list`,
    color: 'success'
  });

  navigateTo({path: '/applications'});
}
</script>

<template>
  <UContainer class="flex flex-wrap justify-content content-center w-full h-full">
    <UForm :schema="schema" :state="formState" class="space-y-4 grow" @submit="processForm">
      <h1>Create Application</h1>
      <UFormField label="Name (required)" name="name" class="w-full">
        <UInput v-model="formState.name" class="w-full" />
      </UFormField>
      <UFormField label="Description" name="description" class="w-full">
        <UTextarea v-model="formState.description" class="w-full" />
      </UFormField>
      <UFormField label="Homepage URL (required)" name="homepageUrl" class="w-full">
        <UInput v-model="formState.homepageUrl" class="w-full" />
      </UFormField>
      <UFormField label="Callback URL (required)" name="callbackUrl" class="w-full">
        <UInput v-model="formState.callbackUrl" class="w-full" />
      </UFormField>
      <UButton type="submit" :disabled="state.loading">
        Create Application
      </UButton>
    </UForm>
  </UContainer>
</template>