<template>
  <section class="main-cotent w-full">
    <Toolbar />
    <div class="min-h-0 flex-1 overflow-y-auto">
      <div class="pb-6 pt-5 shadow dark:border-b">
        <div class="px-4 sm:flex sm:items-baseline sm:justify-between sm:px-6 lg:px-8">
          <div class="sm:w-0 sm:flex-1">
            <h1 id="message-heading" class="text-lg font-medium">
              Re: New pricing for existing customers
            </h1>
            <p class="mt-1 truncate text-sm">+855967832586</p>
          </div>
          <div class="sr-only">toolbar</div>
        </div>
      </div>
      <ul role="list" class="space-y-2 py-4 sm:space-y-4 sm:px-6 lg:px-8">
        <li v-for="n in 4" class="px-4 py-6 shadow dark:border sm:rounded-lg sm:px-6">
          <div class="sm:flex sm:items-baseline sm:justify-between">
            <h3 class="text-base font-medium">
              <span>Monica White</span>
              <!-- space -->
              <span>wrote</span>
            </h3>
            <p class="mt-1 whitespace-nowrap text-sm sm:ml-3 sm:mt-0">
              <time datetime="2021-01-27T16:35">Wednesday at 4:35pm</time>
            </p>
          </div>
          <div class="mt-4 space-y-6 text-sm">
            <p>
              Adam Wathan is an asshole. ipsum dolor sit amet, consectetur adipiscing elit.
              Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non
              fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.
            </p>
            <p><strong style="font-weight: 600">Monica White</strong><br />Customer Service</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <Messages />
</template>

<script lang="ts" setup>
  import Messages from "~/components/inbox/messages.vue";
  import Toolbar from "~/components/inbox/toolbar.vue";
</script>
