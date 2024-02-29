<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <Icon name="radix-icons:dots-horizontal" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem @click="() => (showModelEdit = true)">Edit</DropdownMenuItem>
      <DropdownMenuItem @click="() => (showModelQRCode = true)">QR Code</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="() => (isAlertDialog = true)">
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Dialog :show="showModelEdit" :close="showModelEdit">
    <DialogTile>
      <h1>Edit Device</h1>
    </DialogTile>
    <DialogContent>
      <DeviceForm :form="modelRow" @onClose="onClose" @onSubmitForm="onSubmitForm" />
    </DialogContent>
  </Dialog>
  <Dialog :show="showModelQRCode" :close="showModelQRCode">
    <DialogTile>
      <h1>QR Code Device</h1>
    </DialogTile>
    <DialogContent>
      <QRCodeForm :form="modelRow" @onClose="onCloseQr" @onSubmitForm="onSubmitForm" />
    </DialogContent>
  </Dialog>
  <AlertDialog
    :show="isAlertDialog"
    @cancel="() => (isAlertDialog = false)"
    @confirm="onDeleteConfirm"
  />
</template>

<script setup lang="ts">
  import type { Row } from "@tanstack/vue-table";
  import { computed, ref } from "vue";
  import { type Device } from "@/models/schema";
  import { useDeviceStore } from "@/stores/useDeviceStore";
  import { Dialog, DialogTile, DialogContent } from "@/components/app/dialog";
  import QRCodeForm from "@/components/devices/form-qrcode.vue";
  import DeviceForm from "@/components/devices/form.vue";
  import AlertDialog from "@/components/app/alert-dialog.vue";

  interface DataTableRowActionsProps {
    row: Row<Device>;
  }

  const props = defineProps<DataTableRowActionsProps>();
  const modelRow = computed(() => props.row.original);
  const modelStore = useDeviceStore();
  const showModelQRCode = ref<boolean>(false);
  const showModelEdit = ref<boolean>(false);
  const isAlertDialog = ref<boolean>(false);

  const onSubmitForm = (form: Device) => {
    modelStore.onUpdate(modelRow.value.id, form);
    showModelEdit.value = false;
  };

  const onDeleteConfirm = () => {
    modelStore.onDelete(modelRow.value.id);
    isAlertDialog.value = false;
  };
  const onCloseQr = () => (showModelQRCode.value = false);
  const onClose = () => (showModelEdit.value = false);
</script>
