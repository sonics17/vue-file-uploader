import dayjs from "dayjs";

export const useFileFormatting = () => {
  const formatFileSize = (size) => {
    const sizeGradation = ["B", "KB", "MB", "GB", "TB"];
    if (size === 0) return "0 B";
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(1) + " " + sizeGradation[i];
  };

  const formatDate = (date) => {
    return dayjs(date).format("MMM D, YYYY");
  };

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

  const isImage = (mimeType) => {
    const [fileType] = mimeType.split("/");
    return fileType === "image";
  };

  return { formatFileSize, formatDate, getIconPath, isImage };
};
