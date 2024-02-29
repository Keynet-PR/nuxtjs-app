<script setup lang="ts">
  import { ref } from "vue";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";

  import DatePicker from "@/components/app/date-picker.vue";

  const SHEET_SIDES = ["right"] as const;

  const username = ref("");
</script>
<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        <Icon name="heroicons:funnel-20-solid" class="mr-1 h-4 w-4" />
        Filter
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Apply Filters</h4>
          <p class="text-sm text-muted-foreground">Filterby date, name, and status.</p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="width">Date</Label>
            <DatePicker />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="maxWidth">Name</Label>
            <Input id="maxWidth" type="text" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="height">Active</Label>
            <Checkbox id="status" checked class="col-span-2" />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
