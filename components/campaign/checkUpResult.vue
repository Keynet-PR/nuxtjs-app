<template>
   <div class="rounded-md border">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium"> Sender Id </TableCell>
              <TableCell>
                <Icon
                  v-if="result?.senderId"
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
              <TableCell> {{ result?.smsQuantity }} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> Message Length </TableCell>
              <TableCell>
                <Icon
                  v-if="result?.messageLen"
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
                  `(${result?.rcptProgress}/${result?.totalContacts})`
                }}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> Suppression </TableCell>
              <TableCell> {{ result?.suppressions }} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> List Size </TableCell>
              <TableCell> {{ result?.totalContacts }} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium"> Total Send Cost </TableCell>
              <TableCell> ${{ result?.totalCostCurrency }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
</template>

<script lang="ts" setup>
defineProps<{
  result: any;
}>();
</script>

<style></style>
