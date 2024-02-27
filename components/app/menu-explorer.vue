<script lang="ts" setup>
  import { menu } from "~/constants";
  const openMenuExplorer = useState("openMenuExplorer");
  // const slug = useRoute().path.split("/")[1];
  const link = menu.filter(function (link) {
    return link.slug == openMenuExplorer.value;
  })[0];
</script>

<template>
  <div>
    {{ openMenuExplorer }}
  </div>
  <aside v-if="openMenuExplorer" class="hidden xl:order-first xl:block xl:flex-shrink-0">
    <div class="relative flex h-full w-96 flex-col border-r bg-gray-50 dark:bg-transparent">
      <div class="flex-shrink-0">
        <div
          class="border-b border-t-0 bg-gray-50 px-6 py-2 text-sm font-medium dark:bg-transparent"
        >
          <div class="flex justify-between">
            <span>{{ link.title }}</span>
            <button @click="openMenuExplorer = ''">
              <Icon name="radix-icons:double-arrow-left" />
            </button>
          </div>
        </div>
      </div>
      <nav aria-label="Message list" class="min-h-0 flex-1 overflow-y-auto">
        <ul role="list" class="divide-y border-b">
          <li
            v-for="item in link.items"
            class="relative bg-white px-4 py-2 focus-within:ring-1 focus-within:ring-inset focus-within:ring-gray-100 hover:bg-gray-50 dark:bg-transparent"
          >
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <NuxtLink :to="item.path" class="block focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="truncate text-sm font-medium">
                    {{ item.title }}
                  </p>
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
