<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Start</TableHead>
        <TableHead>End</TableHead>
        <TableHead>File Name</TableHead>
        <TableHead>File Size</TableHead>
        <TableHead>Exported</TableHead>
        <TableHead>Status</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="n in 5">
        <TableCell class="font-medium">
          {{ n }}
        </TableCell>
        <TableCell>2023-12-22 04:19:29</TableCell>
        <TableCell>2023-12-22 04:19:29</TableCell>
        <TableCell>export-41703218769.csv</TableCell>
        <TableCell> 0.00KB</TableCell>
        <TableCell>0</TableCell>
        <TableCell>Exporting</TableCell>
        <TableCell class="text-center">
          <div>
            <Button variant="outline" size="sm" class="h-8 px-2 lg:px-3">
              <Icon name="radix-icons:download" class="mr-1 h-4 w-4" />
              Export
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>