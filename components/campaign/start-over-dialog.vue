<template>
  <Dialog :open="start_over" @update:open="() => start_over">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Campaign Checks</DialogTitle>
      </DialogHeader>
      <div class="rounded-md border">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium"> Sender Id </TableCell>
              <TableCell>
                <Icon
                  v-if="checkUpResult?.senderId"
                  name="radix-icons:check-circled"
                  class="w-5 h-5 text-green-600"
                />
                <Icon
                  v-else
                  name="radix-icons:cross-2"
                  class="w-5 h-5 text-red-600"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> SMS Quantity </TableCell>
              <TableCell> {{ checkUpResult?.smsQuantity }} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> Message Length </TableCell>
              <TableCell>
                <Icon
                  v-if="checkUpResult?.messageLen"
                  name="radix-icons:check-circled"
                  class="w-5 h-5 text-green-600"
                />
                <Icon
                  v-else
                  name="radix-icons:cross-2"
                  class="w-5 h-5 text-red-600"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> Estimated Cost </TableCell>
              <TableCell>
                {{
                  `(${checkUpResult?.rcptProgress}/${checkUpResult?.totalContacts})`
                }}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> Suppression </TableCell>
              <TableCell> {{ checkUpResult?.suppressions }} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> List Size </TableCell>
              <TableCell> {{ checkUpResult?.totalContacts }} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> Total Send Cost </TableCell>
              <TableCell> ${{ checkUpResult?.totalCost }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <DialogFooter>
        <Button
          @click="emit('onClose', false)"
          type="button"
          variant="secondary"
        >
          Close
        </Button>
        <Button :disiable="checkUpResult?.isDone" @click="emit('onSend', true)" type="submit"> Send </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
 defineProps<{
  start_over?: boolean;
  checkUpResult: any;
}>();
const emit = defineEmits(["onClose", "onSend"]);
</script>
