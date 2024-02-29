<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        :model-value="(table.getColumn('phone')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('phone')?.setFilterValue($event.target.value)"
      />
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <RefreshCcw class="ml-2 h-4 w-4" />
      </Button>
      <Button as-child variant="outline" size="sm" class="h-8 border-dashed">
        <NuxtLink to="/subscribers">
          <Icon name="radix-icons:person" class="mr-2 h-4 w-4" />
          Subscribers
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed } from "vue";
  import { type Table } from "@tanstack/vue-table";
  import { type Unsubscriber } from "@/models/schema";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";

  interface DataTableToolbarProps {
    table: Table<Unsubscriber>;
  }

  const props = defineProps<DataTableToolbarProps>();
  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>
