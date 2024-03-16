<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="w-6 h-6 p-1" variant="outline">
        <Icon name="radix-icons:plus-circled" class="w-3 h-3" />
      </Button>
    </DialogTrigger>
    <DialogContent class="px-0">
      <DialogHeader class="px-4">
        <DialogTitle>Add new messages</DialogTitle>
        <DialogDescription>
          Add a message to this campiagn. This will create a new group message
        </DialogDescription>
      </DialogHeader>
      <div
        class="flex h-full w-full flex-col rounded-md bg-popover text-popover-foreground overflow-hidden rounded-t-none border-t"
      >
        <Command>
          <CommandInput placeholder="Search message..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="item in items"
                :key="item.value"
                :value="item.value"
                @select="
                  (value) => {
                    selectedStatus = item;
                    open = false;
                  }
                "
              >
                <!-- <component
                  :is="item.icon"
                  :key="item.value"
                  :class="
                    cn(
                      'mr-2 h-4 w-4',
                      item.value === selectedStatus?.value
                        ? 'opacity-100'
                        : 'opacity-40'
                    )
                  "
                /> -->
                <div class="flex justify-between w-full">
                  <span>{{ item.name }}</span>
                  <Icon name="lucide:check" class="w-4 h-4" />
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div class="w-full border-t flex px-4 pt-2 justify-between">
        <div class="flex items-center">
          <template v-if="selectedStatus">
            <component :is="selectedStatus?.icon" class="mr-2 h-4 w-4 shrink-0" />
            {{ selectedStatus?.name }}
          </template>
          <template v-else> + Set meassage </template>
        </div>
        <Button type="submit"> Continue </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-vue-next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Status {
  value: string;
  name: string;
  icon: Icon;
}
const { items } = defineProps<{
  items: any;
}>();

const open = ref(false);
const value = ref<typeof items[number]>();
const selectedStatus = ref<Status>();
//const selectedStatus = computed(() => new Set(props.column?.getFilterValue() as string[]));
</script>
