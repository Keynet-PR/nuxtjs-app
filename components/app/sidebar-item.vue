<template>
  <div>
    <template v-for="(l, i) in links" :key="i">
      <li class="group mt-1 cursor-pointer transition-colors">
        <a
          :href="l.path"
          :class="[
            currentPath == l.path ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
          ]"
          class="relative z-50 inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg"
        >
          <span class="sr-only">{{ l.name }}</span>
          <Icon :name="l.icon" class="h-6 w-6 shrink-0" />
          <SubItem v-if="l.items" :items="l.items" />
      </a>
      </li>
    </template>
  </div>
</template>
<script lang="ts" setup>
import SubItem from './sidebar-sub-item.vue';
  defineProps<{
    links?: any[];
  }>();

  const { currentRoute } = useRouter();
  const currentPath = computed(() => currentRoute.value.path);

</script>
