<script setup lang="ts">
import {useFetchConfig} from "~/composables/fetch-config";
import type IScope from "~/data/models/IScope";
import type IApplication from "~/data/models/IApplication";
import type IAuthRefreshResponse from "~/data/models/IAuthRefreshResponse";
import type {_AsyncData} from "#app/composables/asyncData";
let data;

const state = ref({
  loading: true,
  error: false,
  refreshing: false
});

const authState = useAuth();
const route = useRoute();
const toast = useToast();

const queryParams = JSON.stringify(route.query)

if (!authState.value) {
  navigateTo({
    path: '/login',
    query: {
      redirectTo: queryParams
    }
  });
}

// An expired access token won't work on the oauth endpoint so before we make the request for the
// consent screen data, we'll do a quick access token refresh
state.value.refreshing = true;
state.value.loading = true;

const at: string | null = sessionStorage.getItem('_oidc.core.at');
const rt: string | null = sessionStorage.getItem('_oidc.core.rt');

let expVal: string | null = sessionStorage.getItem('_oidc.core.exp');
let exp: number | null = null;
if (expVal != null && expVal != "NaN") {
  exp = new Date(parseInt(expVal, 10)).valueOf();
}

if (expVal == "NaN") {
  console.warn("Removing invalid expiry time value");
  sessionStorage.removeItem('_oidc.core.exp');
  expVal = null;
  exp = null;
}

if (!at || !rt || !exp) {
  toast.add({
    title: 'Access token expired',
    description: 'Your access token has expired, you are being redirected to login',
    color: 'warning'
  });

  navigateTo({ path: '/login', query: { redirectTo: queryParams }});
}

const refreshConfig = useFetchConfig('/authentication/refresh', {
  method: 'POST',
  body: { refreshToken: rt }
});

const refreshResponse: _AsyncData<IAuthRefreshResponse, Error | null> = await useFetch(refreshConfig.url, refreshConfig.config);
if (!refreshResponse) {
  console.error(refreshResponse);
  toast.add({
    title: 'Access token refresh failed',
    description: 'Unable to refresh your access token, you are being redirected to login',
    color: 'error'
  });

  navigateTo({ path: '/login', query: { redirectTo: queryParams }});
}

sessionStorage.setItem('_oidc.core.at', refreshResponse.data.value.access_token);
state.value.refreshing = false;

// Now that's refreshed - we can continue

const application = ref(null);
const scopes = ref(null);

  let string = '';
  const keys = Object.keys(route.query);
  for (const key of keys) {
    if (key != keys[keys.length - 1]) {
      string += `${key}=${route.query[key]}&`;
    } else {
      string += `${key}=${route.query[key]}`;
    }
  }

  try {
    state.value.loading = true;
    state.value.error = false;
    const fetchConfig = useFetchConfig(`/oauth?${string}`, {
      server: false,
      lazy: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('_oidc.core.at')}`,
      }
    });
    const data = await $fetch<{
      application: IApplication,
      scopes: IScope[]
    }>(fetchConfig.url, fetchConfig.config);

    if (data.application != null) {
      application.value = data.application;
    }

    if (data.scopes != null) {
      scopes.value = data.scopes;
    }

    state.value.loading = false;
    state.value.error = false;
  } catch (err) {
    state.value.loading = false;
    state.value.error = true;
  }

  const addConsent = async() => {
    const consentFetchConfig = useFetchConfig(`/oauth/consent`, {
      server: false,
      lazy: false,
      method: "POST",
      body: {
        clientId: application.value.clientId,
        consent: true,
        scopes: scopes.value.map((scope) => scope.name),
        state: route.query['state']
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('_oidc.core.at')}`,
      }
    });

    const response = await $fetch<{code: string, redirectUrl: string, state: string}>(consentFetchConfig.url, consentFetchConfig.config);
    navigateTo(`${response.redirectUrl}?code=${response.code}&state=${response.state}`, { external: true });
}
</script>

<template>
  <UContainer class="flex flex-wrap justify-center content-center w-full h-full">
    <UCard>
      <template #header>
        <h1 v-if="state.refreshing && state.loading && !state.error">Getting ready...</h1>
        <h1 class="font-bold" v-if="!state.refreshing && !state.loading && !state.error">Authorisation Prompt</h1>
        <h1 v-if="!state.refreshing && !state.loading && state.error">Something went wrong</h1>
      </template>
      <template #default>
        <div v-if="!state.refreshing && !state.loading && state.error">
          <b>An error occurred</b> - please use the back button on your browser or refresh the page
        </div>
        <div v-if="!state.refreshing && !state.loading && !state.error">
          <NuxtLink class="font-bold" :to="application.homepageUrl" :external="true">{{ application.name }}</NuxtLink> is requesting access to your account.<br><br>
          It has requested the following permissions;
          <ul>
            <li v-for="scope in scopes" :key="scope.name">{{ scope.name }}</li>
          </ul>
          <br><br>
          This application is <b>not</b> built or maintained by OIDC.Core
        </div>
      </template>
      <template #footer>
        <UButton type="button" @click="addConsent" color="primary">Allow access</UButton>
        <UButton type="button" @click="navigateTo(application.homepageUrl, { external: true })" color="secondary">Deny access</UButton>
      </template>
    </UCard>
  </UContainer>
</template>