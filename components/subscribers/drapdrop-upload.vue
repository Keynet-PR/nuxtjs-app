<template>
  <main
    @drop.prevent="handleDrop"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    class="flex flex-1 flex-col overflow-hidden px-4"
    :class="[dragOver ? 'dropzone' : '']"
  >
    <template v-if="dragOver" class="py-8 text-center text-sm text-gray-500">
      Drop files here to upload
    </template>
    <template v-else>
      <div class="flex flex-1 flex-col overflow-hidden">
        <slot />
      </div>
    </template>
  </main>
  <CheckupFileFormat :isOpen="onCheckUpfileFormat" :checkUpfileFormat="checkUpfileFormat" />
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { emitter, FILE_UPLOAD_STARTED } from "@/event-bus.js";
  import CheckupFileFormat from "@/components/subscribers/checkup-file-format.vue";
  const modelStore = useSubscriberStore();
  const onCheckUpfileFormat = computed(() => modelStore.onCheckUpfileFormat);
  const checkUpfileFormat = computed(() => modelStore.checkUpfileFormat);

  const uploadForm = ref();
  const dragOver = ref(false);

  const onDragOver = () => (dragOver.value = true);
  const onDragLeave = () => (dragOver.value = false);

  const handleDrop = (inputFiles: any) => {
    dragOver.value = false;
    const inputFile = inputFiles.dataTransfer.files[0] as HTMLInputElement;
    if (!inputFile) {
      return;
    }
    uploadFiles(inputFile);
  };

  const uploadFiles = async (inputFile: any) => {
    uploadForm.value = inputFile;
    const fileUploadForm = new FormData();
    fileUploadForm.append("import", uploadForm.value);
    modelStore.importCSV(fileUploadForm);
  };

  onMounted(() => {
    emitter.on(FILE_UPLOAD_STARTED, uploadFiles);
  });
  watchEffect(() => {
    onCheckUpfileFormat.value = false;
  });
</script>

<style scoped>
  .dropzone {
    color: green;
  }
</style>
