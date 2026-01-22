<template>
  <div class="error-toast">
    <span class="error-toast__message">{{ message }}</span>
    <button @click="$emit('close')" class="error-toast__close">×</button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.error-toast {
  position: fixed;
  z-index: 1000;
  left: 50%;
  top: 15px;
  transform: translateX(-50%);
  border-radius: 20px;
  background-color: rgba(255, 179, 179, 0.794);
  padding: 5px 10px;
  border: 1px solid rgb(255, 0, 0);
  color: var(--text-color-primary);
  animation: appear 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  max-width: 350px;
  text-align: center;
}

.error-toast__close {
  background-color: transparent;
  border: none;
  padding: 2px;
  color: rgb(255, 0, 0);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
