<script setup lang="ts">
import {definePageMeta, useFetchConfig} from "#imports";
import type IAuthAttemptResponse from "~/data/models/IAuthAttemptResponse";

definePageMeta({
  layout: 'form-card'
})

const state = reactive({
  formErrors: [],
  credentials: {
    email: null,
    password: null
  },
  loading: false,
  error: false
})

const sendRequest = async() : Promise<string> => {
  const config = useFetchConfig(`/authentication`, {
    server: false,
    lazy: false,
    method: "POST",
    body: {
      email: state.credentials.email,
      password: state.credentials.password
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

    const route = useRoute();
    if (Object.keys(route.query).includes('redirectTo')) {
      return JSON.stringify(route.query.redirectTo)
          .replaceAll('"', '')
          .replace('/', '');
    } else {
      return '/';
    }
  } catch {
    state.loading = false;
    state.error = true;
    return null;
  }
}

const submitForm = async (event: any) => {
  console.log('submitting form');
  event.preventDefault();
  const result: boolean = validate();
  if (!result) {
    return;
  }

  let destination: string | null = await sendRequest();
  if (destination == null) {
    return;
  }

  navigateTo(destination);
}

const addError = (field: string, error: string) => {
  if (state.formErrors[field] === undefined) {
    state.formErrors[field] = [];
  }

  state.formErrors[field].push(error);
}

const validate = () : boolean  => {
  state.formErrors = [];
  let pass: boolean = true;

  if (state.credentials.email == null || !state.credentials.email.length) {
    addError('email', 'Email address is required');
    pass = false;
  }

  if (state.credentials.password == null || !state.credentials.password.length) {
    addError('password', 'Password is required')
    pass = false;
  }

  return pass;
}
</script>

<template>
  <form class="form">
    <div class="header">
      <span class="text">
        <NuxtLink class="text--lead" to="/">
          <img src="/wordmark-light-theme.png" />
        </NuxtLink>
      </span>
    </div>
    <div class="form">
      <div class="form_group">
        <label for="email" class="form_group-label">Email Address</label>
        <input type="email" v-on:blur="validate()" v-model="state.credentials.email" class="form_group-input" placeholder="info@example.com" />
        <ul class="form_group-errors" v-if="state.formErrors.length">
          <li v-for="(err) in state.formErrors['email']">{{ err }}</li>
        </ul>
      </div>
      <div class="form_group">
        <label for="password" class="form_group-label">Password</label>
        <input type="password" v-on:blur="validate()" v-model="state.credentials.password" class="form_group-input" />
        <ul class="form_group-errors" v-if="state.formErrors.length">
          <li v-for="(err) in state.formErrors['password']">{{ err }}</li>
        </ul>
      </div>
      <div class="form_group">
        <button type="submit" @click="submitForm" :disabled="state.loading">
          <span v-if="!state.loading">Log In</span>
          <span v-if="state.loading">Logging in...</span>
        </button>
      </div>
      <div class="form_group form_group--error" v-if="state.error">
        <Icon name="duo-icons:alert-octagon" />
        An error occurred, please double check your credentials and try again
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  padding: 24px;

  .header {
    border-bottom: 2px solid #FF575F;
    padding: 6px 12px;

    .text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 6px;

      &--lead {
        display: block;
        img {
          display: block;
          max-width: 100%;
          height: 50px;
        }
      }

      &--sub {
        display: block;
        font-size: 18px;
      }
    }
  }
}
</style>