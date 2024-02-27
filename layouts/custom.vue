<template>
  <div class="h-screen">
    <div class="flex h-full flex-col">
      <Header />
      <div class="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />
        <main class="min-w-0 flex-1 xl:flex">
          <section class="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last">
            <slot />
          </section>
          <MenuExplorer />
        </main>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import MenuExplorer from "~/components/app/menu-explorer.vue";
</script>
