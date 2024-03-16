<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        <Icon name="heroicons:funnel-20-solid" class="mr-1 h-4 w-4" />
        Filters
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Apply Filters</h4>
          <p class="text-sm text-muted-foreground">
            Filterby date, name, and status.
          </p>
        </div>
        <FilterForm @onSubmit="onSubmit" />
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import FilterForm from "@/components/campaign/filter-form.vue";
const modelStore = useCampaignStore();
const onSubmit = (form: any) => {
  modelStore.query = {
    range: form.range,
    s: form.name,
    status: form.status,
  };
};
</script>
