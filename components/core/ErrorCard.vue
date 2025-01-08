<script setup lang="ts">
defineProps<{
  heading: string | undefined,
  icon: string | undefined,
  message: string | undefined
}>();
</script>

<template>
<div class="card">
  <div class="card-heading">
    <div class="card-icon">
      <Icon :name="icon ?? 'duo-icons:alert-triangle'" />
    </div>
    <div class="card-title">
      <span class="card-body--lead">{{ heading ?? "An error occurred" }}</span>
    </div>
  </div>
  <div class="card-body">
    <span class="card-body--sub">
      {{ message ?? "You may not have permission to access this resource" }}
    </span>
  </div>
</div>
</template>

<style scoped lang="scss">

.card {
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-content: center;
  justify-content: center;
  margin: 0 auto;
  border: 2px solid #FF575F;

  &-heading {
    display: flex;
    flex-direction: column;
    padding: 1em;

    * {
      display: block;
      width: 100%;
      text-align: center;
    }

    .card-icon {
      color: #FF575F;
      font-size: 64px;
      font-weight: bold;
    }

    .card-title {
      font-size: 32px;
      font-weight: bold;
    }
  }

  &-body {
    text-align: center;
  }
}
</style>