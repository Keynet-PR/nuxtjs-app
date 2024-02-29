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
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
          <Icon name="radix-icons:plus" class="mr-2 h-4 w-4" />
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[150px]">
        <DropdownMenuLabel>Toggle actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="() => (shoModel = true)"> Add Contact </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ButtonImportCsv />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog :show="shoModel" :close="shoModel">
      <DialogTile>
        <h1>Add Contact</h1>
      </DialogTile>
      <DialogContent>
        <ContactForm @onClose="onClose" @onSubmitForm="onSubmitForm" />
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
  import { computed } from "vue";
  import { type Table } from "@tanstack/vue-table";
  import { type Contact } from "@/models/schema";
  import ButtonImportCsv from "@/components/subscribers/contacts/button-import-csv.vue";
  import { Dialog, DialogTile, DialogContent } from "@/components/app/dialog";
  import ContactForm from "@/components/subscribers/contacts/form.vue";

  interface DataTableToolbarProps {
    table: Table<Contact>;
  }

  const props = defineProps<DataTableToolbarProps>();
  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);

  const shoModel = ref<boolean>(false);
  const modelStore = useContactStore();
  const onSubmitForm = (form: Contact) => {
    modelStore.onStore(form);
    shoModel.value = false;
  };
  const onClose = () => (shoModel.value = false);
</script>
