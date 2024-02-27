<template>
  <div>
    <template v-for="(l, i) in links" :key="i">
      <li class="group mt-1 cursor-pointer transition-colors">
        <NuxtLink
          :to="l.path"
          :class="[
            currentPath == l.path ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
          ]"
          class="relative z-50 inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg"
        >
          <span class="sr-only">{{ l.name }}</span>
          <Icon :name="l.icon" class="h-6 w-6 shrink-0" />
          <div v-if="l.items" class="tooltip px-2">
            <div v-for="sub in l.items" class="flex flex-col gap-4">
              <NuxtLink :to="sub.path" class="w-auto text-nowrap px-2 py-1">
                {{ sub.name }}
              </NuxtLink>
            </div>
          </div>
        </NuxtLink>
      </li>
    </template>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    links?: any[];
  }>();

  const { currentRoute } = useRouter();
  const currentPath = computed(() => currentRoute.value.path);
</script>
