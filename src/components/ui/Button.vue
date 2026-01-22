<template>
  <button class="button" :class="{ 'button--full': fullWidth }">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.button {
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #7f56d9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease-in;
  width: fit-content;
}

.button--full {
  width: 100%;
}

.button:hover {
  background-color: #6a47b6;
  cursor: pointer;
}

.button:active {
  transform: translateY(1px);
}
</style>
