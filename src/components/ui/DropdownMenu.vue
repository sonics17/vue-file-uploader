<script setup>
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef } from "vue";

const isOpen = ref(false);
const menuRef = useTemplateRef("menu");
const isUp = ref(false);

const toggleMenu = async (event) => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    const btn = event.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - btn.bottom;
    const menuHeight = 100;
    isUp.value = spaceBelow < menuHeight;
  }
};

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="dropdown" ref="menu">
    <button class="dropdown__button" type="button" @click="toggleMenu">
      <img src="@/assets/images/dropdown-menu-icons/dots-menu.svg" alt="..." />
    </button>

    <div
      class="dropdown__menu"
      v-if="isOpen"
      @click="isOpen = false"
      :class="{ 'dropdown__menu--up': isUp }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown__button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 22px;
  aspect-ratio: 1 / 1;
  padding: 0;
}

.dropdown__button img {
  display: block;
}

.dropdown__button:hover {
  background-color: #e4ebff;
}

.dropdown__button:active {
  background-color: #d4dffe;
}

.dropdown__menu {
  position: absolute;
  z-index: 100;
  transform: translate(-90%, 5px);
  min-width: 230px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
  padding: 2px 0;
}

.dropdown__menu--up {
  transform: translate(-90%, -5px);
  top: auto;
  bottom: 100%;
}

.dropdown__menu > * {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  text-align: left;
}

.dropdown__menu > * + * {
  border-top: 1px solid rgba(221, 230, 253, 0.5);
}

.dropdown__menu > *:hover {
  background-color: #f0f4fd;
}

.dropdown__menu > *:active {
  background-color: #e6ecfa;
}
</style>
