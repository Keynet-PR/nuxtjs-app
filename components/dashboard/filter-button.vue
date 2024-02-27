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
          <p class="text-sm text-muted-foreground">Filterby name.</p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Input id="maxWidth" type="text" class="col-span-4 h-8" />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
