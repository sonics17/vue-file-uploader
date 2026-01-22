<script setup>
import { useFileStore } from "@/stores/FileStore";
import { onMounted } from "vue";
import FileRow from "./FileRow.vue";
import Spinner from "../ui/Spinner.vue";
import Button from "../ui/Button.vue";

const fileStore = useFileStore();

onMounted(async () => {
  if (!fileStore.filesLoaded) {
    await fileStore.loadFiles();
  }
});
</script>

<template>
  <div class="file-list">
    <div v-if="fileStore.isLoading" class="file-list__spinner">
      <Spinner />
    </div>

    <div
      class="file-list__empty"
      v-else-if="!fileStore.isLoading && fileStore.isStorageEmpty"
    >
      <h1 class="title light-text">No files in storage</h1>
    </div>

    <div v-else-if="fileStore.loadError" class="file-list__error">
      <h1 class="title light-text">{{ fileStore.loadError }}</h1>
      <Button @click="fileStore.loadFiles" class="file-list__retry"
        >Try again</Button
      >
    </div>

    <div v-else class="file-list__content">
      <div class="file-list__row file-list__row--header">
        <div class="file-list__row-inner file-list-grid light-text">
          <div class="file-list__header-name">File name</div>
          <div class="file-list__header-size">File size</div>
          <div class="file-list__header-date">Date uploaded</div>
        </div>
      </div>

      <FileRow
        class="file-list__row"
        v-for="(file, index) in fileStore.files"
        :key="index"
        :file="file"
        :index="index"
      />
    </div>
  </div>
</template>

<style scoped>
.file-list__spinner,
.file-list__empty,
.file-list__error {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.file-list__content {
  margin: 0 -40px;
}

.file-list__row {
  border-bottom: 1px solid #EAECF0;
}

.file-list__row-inner {
  padding: 0 40px;
}

.file-list__row--header {
  padding: 13px 0;
}

.file-list__header-name {
  grid-column: 1 / span 2;
}

.file-list__header-date {
  grid-column: 4 / span 2;
}
</style>
