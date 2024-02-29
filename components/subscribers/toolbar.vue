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
      <Button as-child variant="outline" size="sm" class="h-8 border-dashed">
        <NuxtLink to="/subscribers/unsubscribers">
          <Icon name="radix-icons:eye-none" class="mr-2 h-4 w-4" />
          Unsubscribers
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
        <DropdownMenuItem @click="() => (showModelList = true)"> Add List </DropdownMenuItem>
        <DropdownMenuItem @click="() => (showModelContact = true)"> Add Contact </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ButtonImportCsv />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog :show="showModelList" :close="showModelList">
      <DialogTile>
        <h1>Add List</h1>
      </DialogTile>
      <DialogContent>
        <SubscriberForm @onClose="onClose" @onSubmitForm="onSubmitForm" />
      </DialogContent>
    </Dialog>
    <Dialog :show="showModelContact" :close="showModelContact">
      <DialogTile>
        <h1>Add Contact</h1>
      </DialogTile>
      <DialogContent>
        <ContactForm @onClose="onCloseModelContact" @onSubmitForm="onSubmitContactForm" />
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
  import { computed } from "vue";
  import { type Table } from "@tanstack/vue-table";
  import { type Contact, type Group } from "@/models/schema";
  import ButtonImportCsv from "@/components/subscribers/contacts/button-import-csv.vue";
  import { Dialog, DialogTile, DialogContent } from "@/components/app/dialog";
  import SubscriberForm from "@/components/subscribers/form.vue";
  import ContactForm from "@/components/subscribers/contacts/form.vue";

  interface DataTableToolbarProps {
    table: Table<Group>;
  }

  const props = defineProps<DataTableToolbarProps>();
  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);

  const showModelList = ref<boolean>(false);
  const showModelContact = ref<boolean>(false);

  const modelStore = useSubscriberStore();
  const modelContactStore = useContactStore();

  const onSubmitForm = (form: Group) => {
    modelStore.onStore(form);
    showModelList.value = false;
  };
  const onSubmitContactForm = (form: Contact) => {
    modelContactStore.onStore(form);
    showModelContact.value = false;
  };

  const onClose = () => (showModelList.value = false);
  const onCloseModelContact = () => (showModelContact.value = false);
</script>
