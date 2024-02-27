<template>
  <div
    v-if="form.progress"
    class="absolute bottom-4 right-8 flex w-[240px] flex-col rounded border border-gray-900 bg-white p-2 shadow-lg"
  >
    <div class="mb-2 text-xs">Uploading {{ form.files.length }} files</div>
    <div class="h-3 rounded-md bg-gray-100">
      <div
        class="h-full rounded-md bg-gray-900 transition-all"
        :style="{ width: form.progress.percentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    form: Object,
  });
</script>

<style scoped></style>
