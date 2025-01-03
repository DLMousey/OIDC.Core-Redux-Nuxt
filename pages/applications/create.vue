<script async setup lang="ts">
import {helpers, required, url} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useFetchConfig} from "#imports";

const application = reactive({
  name: null,
  homepageUrl: null,
  description: null,
  callbackUrl: null
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("A name must be provided", required)
    },
    homepageUrl: {
      required: helpers.withMessage("A homepage url must be provided", required),
      url: helpers.withMessage("The homepage URL must be a valid URL", url)
    },
    callbackUrl: {
      required: helpers.withMessage("A valid callback url must be provided", required),
      url: helpers.withMessage("The callback URL must be a valid URL", url)}
  }
});

const v$ = useVuelidate(rules, application);
async function processForm(event: Event): Promise<void> {
  event.preventDefault();
  await v$.value.$validate();
  if (v$.value.$errors.length != 0) {
    console.warn('validation failed', v$.value.$errors);
    return;
  }

  const fetchConfig = useFetchConfig(`/applications`, {
    server: false,
    lazy: false,
    method: "POST",
    body: application
  });

  const result = await useFetch(fetchConfig.url, fetchConfig.config);
}
</script>

<template>
<div class="container--form">
  <form class="form" @submit="processForm">
    <h2 class="form_header">Create an Application</h2>
    <div class="form_group">
      <label class="form_group-label" for="name">Name</label>
      <input
          class="form_group-input"
          type="text"
          id="name"
          v-model="application.name"
          @change="v$.name.$touch"
      />
      <div v-if="v$.name.invalid && v$.name.$errors">
        <ul>
          <li v-for="error in v$.name.$errors">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
    <div class="form_group">
      <label class="form_group-label" for="description">Description</label>
      <textarea
          class="form_group-input"
          id="description"
          v-model="application.description"
          @change="v$.description.$touch"
      ></textarea>
    </div>
    <div class="form_group">
      <label class="form_group-label" for="homepageUrl">Homepage URL</label>
      <input
          class="form_group-input"
          type="text"
          id="homepageUrl"
          v-model="application.homepageUrl"
          @change="v$.homepageUrl.$touch"
      />
    </div>
    <div class="form_group">
      <label class="form_group-label" for="callbackUrl">Callback URL</label>
      <input
          class="form_group-input"
          type="text"
          id="callbackUrl"
          v-model="application.callbackUrl"
          @change="v$.callbackUrl.$touch"
      />
      <div v-if="v$.callbackUrl.$invalid || v$.callbackUrl.$error">
        <ul>
          <li v-for="error in v$.callbackUrl.$errors">
            {{ error.$message }}
          </li>
        </ul>
      </div>
    </div>
    <div class="form_group">
      <button type="submit" :disabled="v$.$errors.length > 0">Create Application</button>
    </div>
  </form>
</div>
</template>

<style scoped lang="scss">

</style>