<script setup lang="ts">
import {useFetchConfig} from "~/composables/fetch-config";
import type IScope from "~/data/models/IScope";
import type IApplication from "~/data/models/IApplication";
let data;

const state = ref({
  loading: true,
  error: false
});

const application = ref(null);
const scopes = ref(null);

  const route = useRoute();

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
<div class="container container--form">
  <div class="error" v-if="state.error">
    <h1>An Error Occurred</h1>
    Please use the back button on your browser to go back
  </div>
  <div class="prompt" v-if="!state.loading && !state.error">
    <div class="heading">
      <span class="heading-lead">Authorise Application</span>
      <span class="heading-sub"><b><a :href="application.homepageUrl" target="_blank">{{ application.name }}</a></b> is requesting access to your account</span>
    </div>
    <div class="application">
      <div>
        It has requested the following permissions
        <ul>
          <li v-for="scope in scopes" :key="scope.name">{{ scope.name }}</li>
        </ul>
      </div>
      <div><i>This application is <b>not</b> built or maintained by oidc.core</i></div>
    </div>
    <div class="actions">
      <button class="button" @click="addConsent">Accept</button>
      <button class="button button--secondary" @click="navigateTo(application.homepageUrl, { external: true })">Reject</button>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
//.container--form {
//  background: #EBEBEB;
//}
//
//.prompt {
//  background: #FFF;
//  border-radius: 8px;
//  padding: 1em;
//
//  .heading {
//    display: flex;
//    flex-direction: column;
//    border-bottom: 1px solid #FF575F;
//    padding-bottom: 0.4em;
//
//    &-lead {
//      font-size: 24px;
//      font-weight: bold;
//      color: #FF575F;
//    }
//
//    &-sub {
//      font-size: 16px;
//    }
//  }
//
//  .application {
//    padding: 1em 0;
//  }
//
//  .actions {
//    display: flex;
//    flex-direction: row;
//    border-top: 1px solid #FF575F;
//    padding-top: 0.4em;
//    justify-items: space-between;
//
//    button {
//      width: 100%;
//    }
//
//    &-heading {
//      display: flex;
//      flex-direction: column;
//
//      &--lead {
//        font-size: 16px;
//        font-weight: bold;
//        color: #FF575F;
//      }
//    }
//  }
//}
</style>