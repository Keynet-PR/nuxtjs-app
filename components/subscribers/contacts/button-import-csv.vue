<template>
  <div>
    <Icon name="radix-icons:pin-top" class="mr-2.5 h-4 w-4 text-gray-400" />
    <input
      @change="onChange"
      type="file"
      class="absolute bottom-0 left-0 right-0 top-0 cursor-pointer opacity-0"
    />
    <span>Import CSV</span>
  </div>
</template>

<script lang="ts" setup>
  import { emitter, FILE_UPLOAD_STARTED } from "@/event-bus.js";
  const onChange = (event: any) => emitter.emit(FILE_UPLOAD_STARTED, event.target.files[0]);
</script>

<style></style>
