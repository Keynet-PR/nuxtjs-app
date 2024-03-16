<template>
  <Button
    variant="outline"
    size="sm"
    class="mr-1 h-8"
    @click="
      $emit('selectMessage', {
        id: props.row.getValue('id'),
        name: props.row.getValue('name'),
        content: props.row.getValue('content'),
      })
    "
  >
    <Check class="mr-1 h-4 w-4" />
    Select
  </Button>
</template>
<script setup lang="ts">
  import type { Row } from "@tanstack/vue-table";
  import { type Message } from "@/models/schema";
  import { Check } from "lucide-vue-next";

  import { Button } from "@/components/ui/button";

  interface DataTableRowActionsProps {
    row: Row<Message>;
  }
  const props = defineProps<DataTableRowActionsProps>();
</script>
