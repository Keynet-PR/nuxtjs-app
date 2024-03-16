<template>
  <div
    class="h-72 overflow-x-auto border-t bg-background scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md"
  >
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b text-left text-xs">
          <th class="w-48 p-4 font-medium uppercase text-muted-foreground">
            Date
          </th>
          <th class="w-2/3 p-4 font-medium uppercase text-muted-foreground">
            Recipient
          </th>
          <th
            class="p-4 text-center font-medium uppercase text-muted-foreground"
          >
            Quantity
          </th>
          <th class="p-4 font-medium uppercase text-muted-foreground">
            Sender ID
          </th>
          <th class="p-4 font-medium uppercase text-muted-foreground">
            Status
          </th>
        </tr>
      </thead>
      <template v-if="items?.length">
        <tbody>
          <tr
            v-for="item in items"
            class="border-b text-left text-sm last:border-b-0 hover:bg-muted"
          >
            <td class="p-4">{{ item.sent_at }}</td>
            <td class="p-4">{{ item.recipient }}</td>
            <td class="p-4 text-center">{{ item.sms_count }}</td>
            <td class="p-4">{{ item.sender_id }}</td>
            <td class="p-4">{{ item.status_text }}</td>
          </tr>
        </tbody>
      </template>
      <template v-else>
        <tfoot>
          <tr class="border-b text-sm text-center last:border-b-0">
            <td colspan="5" class="py-4">No results.</td>
          </tr>
        </tfoot>
      </template>
    </table>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  items: any;
}>();
const emit = defineEmits(["onCampiagnDetail"]);
</script>
