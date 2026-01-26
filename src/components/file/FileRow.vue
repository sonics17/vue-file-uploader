<script setup>
import DropdownMenu from "../ui/DropdownMenu.vue";
import { useFileStore } from "@/stores/FileStore";
import { useFileFormatting } from "@/composables/useFileFormatting";

const fileStore = useFileStore();
const { formatFileSize, formatDate, getIconPath, isImage } = useFileFormatting();

const props = defineProps({
  file: Object,
  index: Number,
});
</script>

<template>
  <div
    class="file-list__row"
    :class="{ 'file-list__row--odd': props.index % 2 === 0 }"
  >
    <div class="file-list__row-inner file-list-grid">
      <div class="file-list__cell file-list__cell--icon">
        <img
          :src="getIconPath(props.file.metadata.mimetype, props.file.name)"
          alt=""
        />
      </div>
      <div class="file-list__cell file-list__cell--name regular-text">
        {{ props.file.name }}
        <span class="light-text">
          {{ formatFileSize(props.file.metadata.size) }}
        </span>
      </div>
      <div class="file-list__cell file-list__cell--size light-text">
        {{ formatFileSize(props.file.metadata.size) }}
      </div>
      <div class="file-list__cell file-list__cell--date light-text">
        {{ formatDate(props.file.created_at) }}
      </div>
      <div class="file-list__cell file-list__cell--menu">
        <DropdownMenu>
          <a
            :href="fileStore.getFileUrl(props.file)"
            target="_blank"
            v-if="isImage(props.file.metadata.mimetype)"
            >Open image in a new tab</a
          >
          <button type="button" @click="fileStore.deleteFile(props.file)">
            Delete
          </button>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-list__row-inner {
  padding: 16px 40px;
}

.file-list__row--odd {
  background-color: #f9fafb;
}

.file-list__cell--icon img {
  vertical-align: middle;
}

.file-list__cell--name {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
