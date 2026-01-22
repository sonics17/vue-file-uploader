<script setup>
import { ref } from "vue";
import FileInput from "./FileInput.vue";
import Dropzone from "../ui/Dropzone.vue";
import Spinner from "../ui/Spinner.vue";
import router from "@/router/router";
import { useFileStore } from "@/stores/FileStore";

const fileStore = useFileStore();

const isError = ref(false);
const errorList = ref({});

const inputRef = ref(null);

const goToFileList = () => {
  router.push({ name: "files" });
};

const processFiles = async (files) => {
  fileStore.isLoading = true;
  isError.value = false;
  errorList.value = {};
  errorList.value = await fileStore.uploadMultipleFiles(files);

  if (Object.keys(errorList.value).length === 0) {
    goToFileList();
  } else {
    isError.value = true;
  }
};
</script>

<template>
  <div class="file-uploader">
    <Spinner v-if="fileStore.isLoading" />

    <div v-else class="file-uploader__content">
      <Dropzone
        @files-dropped="processFiles"
        @click="inputRef?.triggerFileInput()"
      />

      <div class="file-uploader__text">
        <h2 class="subtitle">Start by uploading a file</h2>
        <p class="light-text">
          Any assets used in projects will live here. Start creating by uploading
          your files.
        </p>
      </div>

      <FileInput
        ref="inputRef"
        @files-selected="processFiles"
        class="file-uploader__input"
      />

      <div v-if="isError" class="file-uploader__errors">
        <h3 class="subtitle file-uploader__errors-title">
          Can't upload these files:
        </h3>
        <ol class="file-uploader__error-list">
          <li
            class="error-item"
            v-for="(item, key, index) in errorList"
            :key="key"
          >
            <span class="file-uploader__error-file">{{ item.fileName }}</span>
            —
            <span class="file-uploader__error-message">{{
              item.errorMessage
            }}</span>
          </li>
        </ol>
        <RouterLink :to="{ name: 'files' }" class="file-uploader__link"
          >Go to list with uploaded files
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-uploader__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  max-width: 28rem;
}

.file-uploader__input {
  width: 100%;
}

.file-uploader__text {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.file-uploader__errors {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-uploader__errors-title {
  color: red;
}

.file-uploader__error-list {
  list-style-type: decimal;
  list-style-position: inside;
}

.file-uploader__error-file {
  font-weight: 600;
}

.file-uploader__link {
  text-decoration: underline;
  transition: all 0.3s ease;
}

.file-uploader__link:hover {
  color: rgb(98, 98, 98);
}
</style>
