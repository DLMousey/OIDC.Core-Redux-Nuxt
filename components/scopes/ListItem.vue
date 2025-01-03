<script setup lang="ts">
import type IScope from "~/data/models/IScope";

defineProps<{
  scope: IScope
}>();
</script>

<template>
<div class="card">
  <div class="card-body">
    {{ scope.name }}
  </div>
</div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 8px;
  margin: 1em;
  padding: 1em;
  box-shadow: 0px 25px 25px 0px rgba(0,0,0,0.1);

  &-header {
    font-size: 16px;
    font-weight: bold;
    padding: 1em 1em 1em 0;
    border-bottom: 1px solid #EBEBEB;
  }

  &-body {
    padding: 1em 1em 1em 0;
    flex-grow: 1;
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    padding: 1em 1em 0em 0;
    border-top: 1px solid #EBEBEB;
  }
}
</style>