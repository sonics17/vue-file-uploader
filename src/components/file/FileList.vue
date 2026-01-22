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

    <div
      v-else-if="fileStore.loadError"
      class="file-list__error"
    >
      <h1 class="title light-text">{{ fileStore.loadError }}</h1>
      <Button @click="fileStore.loadFiles" class="file-list__retry">Try again</Button>
    </div>
    
    <table v-else class="file-list__table">
      <thead class="file-list__thead light-text">
        <tr class="file-list__row file-list__row--header">
          <th class="file-list__cell" colspan="2">File name</th>
          <th class="file-list__cell">File size</th>
          <th class="file-list__cell" colspan="2">Date uploaded</th>
        </tr>
      </thead>
      <tbody class="files-table__tbody">
        <FileRow
          class="file-list__row"
          v-for="(file, index) in fileStore.files"
          :key="index"
          :file="file"
        />
      </tbody>
    </table>
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


.file-list__cell:first-child {
  width: 40px;
}
.file-list__table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.file-list__row {
  position: relative;
}

.file-list__row::before {
  content: "";
  position: absolute;
  left: -40px;
  top: 0;
  bottom: 0;
  right: -40px;
  z-index: -1;
  border-top: 1px solid var(--color-light-grey);
}

.file-list__row:last-child::before {
  border-bottom: 1px solid var(--color-light-grey);
}

.file-list__row:nth-child(odd)::before {
  background-color: #f9fafb;
}

.file-list__row--header::before {
  background-color: transparent !important;
  border: none !important;
}

th {
  padding: 13px 0;
}

.file-list__error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 500px) {
  .file-list__row::before {
    right: -15px;
    left: -15px;
  }
}
</style>
