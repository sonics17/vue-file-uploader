<script setup>
import FileUploader from "@/components/file/FileUploader.vue";
</script>

<template>
  <div class="file-uploader-view">
    <FileUploader />
  </div>
</template>

<style scoped>
.file-uploader-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
