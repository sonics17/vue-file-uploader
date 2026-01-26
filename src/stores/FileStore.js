import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { transliterate } from "@/utils/translit";

export const useFileStore = defineStore("fileStore", () => {
  const files = ref([]);
  const isLoading = ref(false);
  const filesLoaded = ref(false);
  const loadError = ref("");
  const deleteFileError = ref("");

  const isStorageEmpty = computed(() => files.value.length === 0);

  const validateFile = (file) => {
    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      return "The file is too large. Maximum: 20MB";
    }
    return null;
  };

  const uploadFile = async (file) => {
    const originalFileName = file.name;
    const transliteratedFileName = transliterate(file.name);

    const validationError = validateFile(file);
    if (validationError) {
      return {
        success: false,
        error: {
          errorMessage: validationError,
          fileName: originalFileName,
        },
      };
    }

    const { data, error } = await supabase.storage
      .from("files")
      .upload(transliteratedFileName, file);

    if (error) {
      return {
        success: false,
        error: {
          errorMessage: getUploadErrorMessage(error),
          fileName: originalFileName,
        },
      };
    } else {
      return {
        success: true,
      };
    }
  };

  const uploadMultipleFiles = async (files) => {
    isLoading.value = true;
    const uploadErrors = {};

    try {
      const filesArray = Array.from(files);

      const uploadPromises = filesArray.map(async (file, index) => {
        const result = await uploadFile(file);
        if (!result.success) {
          uploadErrors[index] = result.error;
        }
      });

      await Promise.all(uploadPromises);

      await loadFiles();
      return uploadErrors;
    } finally {
      isLoading.value = false;
    }
  };

  const getUploadErrorMessage = (error) => {
    let errorMessage = "";
    switch (error.statusCode) {
      case "413":
        errorMessage = "The file is too large. Maximum: 20MB";
        break;
      case "409":
        errorMessage = "A file with this name already exists";
        break;
      case "404":
        errorMessage = "Storage not found";
        break;
      case "400":
        errorMessage = "Invalid file name";
        break;
      default:
        errorMessage = "Something went wrong";
    }
    return errorMessage;
  };

  const loadFiles = async () => {
    isLoading.value = true;
    loadError.value = "";

    try {
      const { data, error } = await supabase.storage.from("files").list("");
      if (error) {
        loadError.value = "Can't load files from storage";
      } else if (!data) {
        files.value = [];
        filesLoaded.value = true;
      } else {
        files.value = data.filter(
          (file) => file.name !== ".emptyFolderPlaceholder",
        );
        filesLoaded.value = true;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const deleteFile = async (file) => {
    isLoading.value = true;
    deleteFileError.value = "";

    try {
      await supabase.storage.from("files").remove([file.name]);
      await loadFiles();
    } catch {
      deleteFileError.value = `Failed to remove file ${file.name} from storage`;
    } finally {
      isLoading.value = false;
    }
  };

  const getFileUrl = (file) => {
    const { data } = supabase.storage.from("files").getPublicUrl(file.name);
    return data.publicUrl;
  };

  const clearDeleteError = () => {
    deleteFileError.value = "";
  };

  return {
    files,
    isLoading,
    filesLoaded,
    isStorageEmpty,
    loadError,
    deleteFileError,
    uploadFile,
    uploadMultipleFiles,
    loadFiles,
    deleteFile,
    getFileUrl,
    clearDeleteError,
  };
});
