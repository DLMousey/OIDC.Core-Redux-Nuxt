<script setup lang="ts">
import type IUser from "~/data/models/IUser";

defineProps<{
  user: IUser
}>();
</script>

<template>
<div class="card">
  <div class="card-header">
    <h1>{{ user.username }}</h1>
  </div>
  <div class="card-body">
    <div class="card-picture">
      <img src="https://picsum.photos/80/80" :alt="user.username" />
    </div>
    <div class="card-profile">
      <dl>
        <dt>ID</dt>
        <dd>{{ user.id }}</dd>
        <dt>Email</dt>
        <dd>{{ user.email }}</dd>
      </dl>
    </div>
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
    display: flex;
    justify-content: space-between;

    .card-picture > img {
      border-radius: 8px;
      border: 2px solid #EBEBEB;
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    padding: 1em 1em 0em 0;
    border-top: 1px solid #EBEBEB;
  }
}
</style>