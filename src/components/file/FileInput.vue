<template>
  <div @keydown.enter.prevent>
    <input
      type="file"
      name="file-input"
      id="file-input"
      ref="fileInput"
      multiple
      hidden
      @change="handleFileChange"
    />

    <Button @click="triggerFileInput" :full-width="true">
      <img src="@/assets/images/upload-img.svg" alt="" />
      Upload
    </Button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "../ui/Button.vue";

const emit = defineEmits(["allSuccess", "hasError", "files-selected"]);

const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = () => {
  const files = fileInput.value.files;

  if (files.length === 0) {
    return;
  }
  emit("files-selected", fileInput.value.files);
};

defineExpose({
  triggerFileInput,
});
</script>
