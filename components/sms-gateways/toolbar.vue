<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        :model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('name')?.setFilterValue($event.target.value)"
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
    </div>

    <Button
      as="a"
      href="/system/sms-gateways/add-gateway"
      variant="outline"
      class="ml-2 h-8 px-2 lg:px-3"
    >
      <Icon name="radix-icons:plus" class="mr-1 h-4 w-4" />
      Add SMS Gateway
    </Button>
  </div>
</template>
<script setup lang="ts">
  import { type Table } from "@tanstack/vue-table";
  import { computed } from "vue";
  import { type SmsGateway } from "@/models/schema";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";

  interface DataTableToolbarProps {
    table: Table<SmsGateway>;
  }

  const props = defineProps<DataTableToolbarProps>();

  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>
