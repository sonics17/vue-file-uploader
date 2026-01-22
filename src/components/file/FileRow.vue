<script setup>
import dayjs from "dayjs";
import DropdownMenu from "../ui/DropdownMenu.vue";
import { useFileStore } from "@/stores/FileStore";

const fileStore = useFileStore();

const props = defineProps({
  file: Object,
});

const getFileIcon = (mimeType, name) => {
  const [mainType] = mimeType.split("/");
  const extension = name.split(".").pop();

  if (extension.toLowerCase() === "fig") return "figma-icon";
  if (extension.toLowerCase() === "framerx") return "framer-icon";

  switch (mainType) {
    case "application":
      return "document-icon";
    case "image":
      return "image-icon";
    case "video":
      return "video-icon";
    default:
      return "document-icon";
  }
};

const getIconPath = (mimeType, name) => {
  const iconName = getFileIcon(mimeType, name);
  return new URL(
    `/src/assets/images/file-icons/${iconName}.svg`,
    import.meta.url,
  ).href;
};

const formatFileSize = (size) => {
  const sizeGradation = ["B", "KB", "MB", "GB", "TB"];
  if (size === 0) return "0 B";
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(1) + " " + sizeGradation[i];
};

const formatDate = (date) => {
  return dayjs(date).format("MMM D, YYYY");
};

const isImage = (mimeType) => {
  const [fileType] = mimeType.split("/");
  return fileType === "image";
};
</script>

<template>
  <tr>
    <td class="file-list__cell file-list__cell--icon">
      <img
        :src="getIconPath(props.file.metadata.mimetype, props.file.name)"
        alt=""
      />
    </td>
    <td class="file-list__cell file-list__cell--name regular-text">
      {{ props.file.name }}
    </td>
    <td class="file-list__cell file-list__cell--size light-text">
      {{ formatFileSize(props.file.metadata.size) }}
    </td>
    <td class="file-list__cell file-list__cell--date light-text">
      {{ formatDate(props.file.created_at) }}
    </td>
    <td class="file-list__cell file-list__cell--menu">
      <DropdownMenu>
        <a
          :href="fileStore.getFileUrl(props.file)"
          target="_blank"
          v-if="isImage(props.file.metadata.mimetype)"
          >Open image in a new tab</a
        >
        <button
          type="button"
          @click="fileStore.deleteFile(props.file)"
        >
          Delete
        </button>
      </DropdownMenu>
    </td>
  </tr>
</template>

<style scoped>
.file-list__cell--icon {
  width: fit-content;
}

.file-list__cell--name {
  width: 60%;
  word-break: break-all;
}

.file-list__cell--size {
  width: 20%;
}

.file-list__cell--date {
  width: 20%;
}

.file-list__cell--menu {
  width: 22px;
}

td {
  padding: 16px 12px 16px 0;
  vertical-align: middle;
}

td > img {
  vertical-align: middle;
}

td:last-child {
  padding: 16px 0;
}
</style>
