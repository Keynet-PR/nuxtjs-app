<template>
  <section
    class="hidden flex-col dark:bg-transparent lg:block lg:flex-shrink-0 lg:border-r lg:bg-white"
  >
    <ul class="relative flex w-20 flex-1 flex-col space-y-3 p-3">
      <SidebarItem :links="links" />
    </ul>
  </section>
</template>
<script lang="ts" setup>
  import { menu as links } from "~/constants";
  import SidebarItem from "@/components/app/sidebar-item.vue";
</script>
