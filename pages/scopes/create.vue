<script setup lang="ts">
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useFetchWithRefresh} from "~/composables/fetch-refresh";

const scope = reactive({
  name: null
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("A name must be provided", required)
    }
  }
});

const v$ = useVuelidate(rules, scope);
async function processForm(event: Event): Promise<void> {
  event.preventDefault();
  await v$.value.$validate();
  if (v$.value.$errors.length != 0) {
    console.warn('validation failed', v$.value.$errors);
    return;
  }

  const fetchConfig = useFetchConfig(`/scopes`, {
    server: false,
    lazy: false,
    method: "POST",
    body: scope
  });

  const result = await useFetchWithRefresh(fetchConfig.url, fetchConfig.config);
}
</script>

<template>
<div class="container--form">
  <form class="form" @submit="processForm">
    <h2 class="form_header">Create a Scope</h2>
    <div class="form_group">
      <label class="form_group-label" for="name">Name</label>
      <input
          class="form_group-input"
          type="text"
          id="name"
          v-model="scope.name"
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
      <button type="submit" :disabled="v$.$errors.length > 0">
        <Icon name="duo-icons:add-circle" /> Create Scope
      </button>
    </div>
  </form>
</div>
</template>

<style scoped lang="scss">

</style>