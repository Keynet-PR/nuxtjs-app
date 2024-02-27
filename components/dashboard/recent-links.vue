<template>
  <header class="flex items-center border-t bg-white px-4 py-1 dark:bg-transparent">
    <div class="flex items-center">
      <h2 id="content-caption" class="font-semibold">Linked Number(s)</h2>
    </div>
    <div class="ml-auto">
      <!-- <button title="See available tickets in this view" aria-label="play"
        class="border rounded-md px-3 py-2 leading-none">
        Play
      </button> -->
    </div>
  </header>

  <div
    class="h-72 overflow-x-auto border-t bg-background scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md"
  >
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b text-left text-xs">
          <th class="w-36 p-4 font-medium uppercase text-muted-foreground">Date</th>
          <th class="w-2/3 p-4 font-medium uppercase text-muted-foreground">Recipient</th>
          <th class="p-4 text-center font-medium uppercase text-muted-foreground">Quantity</th>
          <th class="p-4 font-medium uppercase text-muted-foreground">Sender</th>
          <th class="p-4 font-medium uppercase text-muted-foreground">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 25" class="border-b text-left text-sm last:border-b-0 hover:bg-muted">
          <td class="p-4">Tuesday 09:56</td>
          <td class="p-4">#12534</td>
          <td class="p-4 text-center">100K</td>
          <td class="p-4">John Doe</td>
          <td class="p-4">delivery</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
