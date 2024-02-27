<template>
  <Input
    placeholder="Filter..."
    v-model="search"
    class="h-8 w-[150px] lg:w-[250px]"
    @input="onSearch"
  />
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { emitter, ON_SEARCH } from "@/event-bus.js";

  // Uses

  let params = "";

  // Refs
  const search = ref("");

  // Props & Emit

  // Computed

  // Methods
  function onSearch() {
    params.set("search", search.value);
    emitter.emit(ON_SEARCH, search.value);
  }

  // Hooks
  onMounted(() => {
    params = new URLSearchParams(window.location.search);
    search.value = params.get("search");
  });
</script>

<style scoped></style>
