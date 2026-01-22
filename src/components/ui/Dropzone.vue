<script setup>
import { computed, ref } from "vue";
import GraySvg from "@/assets/images/drag-and-drop-images/upload-dnd-img-gray.svg";
import PurpleSvg from "@/assets/images/drag-and-drop-images/upload-dnd-img-purple.svg";

const isDragging = ref(false);

const emit = defineEmits(["files-dropped", "drag-over", "drag-leave"]);

const currentSVG = computed(() => {
  return isDragging.value ? PurpleSvg : GraySvg;
});

const onDrop = (event) => {
  isDragging.value = false;
  const files = event.dataTransfer.files;

  if (files.length === 0) {
    return;
  }

  emit("files-dropped", files);
};
</script>

<template>
  <div
    class="dropzone"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <div class="dropzone__image" :class="{ 'dropzone__image--dragging': isDragging }">
      <img :src="currentSVG" alt="upload files" />
    </div>
    <div class="dropzone__text">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dropzone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

.dropzone__image {
  border: 2px dashed var(--color-light-grey);
  border-radius: 24px;
  padding: clamp(1.25rem, 5vw, 4.375rem);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 15px,
    rgba(0, 0, 0, 0.015) 15px,
    rgba(0, 0, 0, 0.015) 17px
  );
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.dropzone__image--dragging {
  border-color: #a855f7;
  background-color: rgba(168, 85, 247, 0.04);
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 15px,
    rgba(168, 85, 247, 0.08) 15px,
    rgba(168, 85, 247, 0.08) 17px
  );
  transform: scale(1.02);
  cursor: copy;
}

.dropzone__image--dragging * {
  pointer-events: none;
}

.dropzone__image img {
  max-width: 100%;
  height: auto;
  display: block;
}

.dropzone:hover .dropzone__image:not(.dropzone__image--dragging) {
  border-color: #d1d5db;
  background-color: #f3f4f6;
}
</style>
