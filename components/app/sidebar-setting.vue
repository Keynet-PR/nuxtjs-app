<script setup lang="ts">
  import { cn } from "@/lib/utils";
  import { sidebarNavItems } from "~/constants";
  const $route = useRoute();
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.name"
      as="a"
      :href="item.path"
      variant="ghost"
      :class="
        cn(
          'w-full justify-start text-left',
          $route.path === `${item.path}.html` && 'bg-muted hover:bg-muted'
        )
      "
    >
      {{ item.name }}
    </Button>
  </nav>
</template>
