<script lang="ts" setup>
  import MenuExplorer from "~/components/app/menu-explorer.vue";
</script>
<template>
  <div class="h-screen">
    <div class="flex h-full flex-col">
      <!-- Top nav-->
      <AppHeader />
      <!-- Bottom section -->
      <div class="flex min-h-0 flex-1 overflow-hidden">
        <!-- Narrow sidebar-->
        <AppSidebar />
        <!-- Main area -->
        <main class="min-w-0 flex-1 xl:flex">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
