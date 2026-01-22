<script setup></script>

<template>
  <div class="app">
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding: 25px 40px;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 500px) {
  .app {
    padding: 15px;
  }
}
</style>
