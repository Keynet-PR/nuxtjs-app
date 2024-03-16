<template>
  <div
    class="flex items-center border-t bg-white px-4 py-1 dark:bg-transparent"
  >
    <div class="flex items-center">
      <h2 id="content-caption" class="font-semibold">
        Messages requiring your attention ({{ items?.length }})
      </h2>
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="link"> Use Messages? </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[420px]">
          <div class="grid gap-1">
            <div
              v-for="item in items"
              class="-mx-2 flex items-center gap-1 border space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Button variant="outline" size="icon">
                {{ item.num_of_msg + 1 }}
              </Button>
              <div class="space-y-1 flex-1">
                <p class="text-sm font-medium leading-none">
                  {{ item.name }}
                </p>
                <p class="text-sm text-muted-foreground truncate text-wrap">
                  {{ item.content }}
                </p>
              </div>
              <Badge variant="outline">
                {{ item.num_of_msg }}
              </Badge>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <div class="ml-auto">
      <!-- <button title="See available tickets in this view" aria-label="play"
        class="border rounded-md px-3 py-2 leading-none">
        Play
      </button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  items: any;
}>();
</script>
