<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="card">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import url('~/assets/scss/main.scss');

body {
  background: #AFAFAF;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.card {
  background: #FFF;
  min-width: 33%;
  min-height: 33%;
  border-radius: 8px;
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2));
}
</style>