<script setup>
import FileList from "@/components/file/FileList.vue";
import Button from "@/components/ui/Button.vue";
import ErrorToast from "@/components/ui/ErrorToast.vue";
import router from "@/router/router";
import { useFileStore } from "@/stores/FileStore";
import { watch } from "vue";

const fileStore = useFileStore();

const goToUploader = () => {
  router.push({ name: "upload" });
};

watch(
  () => fileStore.deleteFileError,
  (newVal) => {
    if (newVal && newVal !== "") {
      setTimeout(() => {
        fileStore.deleteFileError = "";
      }, 3000);
    }
  },
);
</script>

<template>
  <div class="file-list-view">
    <ErrorToast
      v-if="fileStore.deleteFileError"
      :message="fileStore.deleteFileError"
      @close="fileStore.deleteFileError = ''"
    />

    <div class="page-header">
      <h1 class="title">Files uploaded</h1>
      <Button @click="goToUploader">
        <img src="@/assets/images/upload-img.svg" alt="" />
        Upload
      </Button>
    </div>

    <div class="page-body">
      <FileList />
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}
</style>
