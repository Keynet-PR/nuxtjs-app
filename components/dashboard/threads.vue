<template>
  <aside class="hidden xl:order-first xl:block xl:flex-shrink-0">
    <div class="relative flex h-full w-96 flex-col border-r">
      <div class="flex-shrink-0">
        <div class="flex h-16 flex-col justify-center px-6">
          <div class="flex items-baseline space-x-3">
            <h2 class="text-lg font-medium">Threads</h2>
            <p class="text-sm font-medium">42 devices</p>
          </div>
        </div>
        <div
          class="border-b border-t  px-6 py-2 text-sm font-medium text-gray-500"
        >
          Sorted by date
        </div>
      </div>
      <nav aria-label="Message list" class="min-h-0 flex-1 overflow-y-auto">
        <ul role="list" class="divide-y">
          <li
            v-for="n in 25"
            class="relative px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-100 hover:bg-gray-50"
          >
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <a href="#" class="block focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="truncate text-sm font-medium text-gray-900">Rafael Klocko</p>
                  <p class="truncate text-sm text-gray-500">
                    Aut sed aut illum delectus maiores laboriosam ex
                  </p>
                </a>
              </div>
              <time
                datetime="2021-01-27T16:35"
                class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                >1d ago</time
              >
            </div>
            <div class="mt-1">
              <p class="line-clamp-2 text-sm text-gray-600">
                Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus
                facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in.
                Eos reiciendis deserunt maiores et accusamus quod dolor.
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts" setup></script>

<style></style>
