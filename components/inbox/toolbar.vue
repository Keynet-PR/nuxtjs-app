<template>
  <div class="flex-shrink-0 border-b">
    <div class="flex h-16 flex-col justify-center">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between py-3">
          <div>
            <Sheet>
              <SheetTrigger as-child>
                <Button variant="outline">
                  <Icon name="heroicons:arrow-uturn-left-16-solid" class="mr-2.5 h-5 w-5" />
                  Reply
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle class=" text-sm">
                    From:+855967832586 to +855967832586
                  </SheetTitle>
                  <SheetDescription>
                    Re: New pricing for existing customers
                  </SheetDescription>
                </SheetHeader>
                <div class="py-4">
                  <Textarea placeholder="Type your message here." />
                </div>
                <SheetFooter>
                  <SheetClose as-child>
                    <Button type="submit">
                      <Icon name="heroicons:arrow-uturn-left-16-solid" class="mr-2.5 h-5 w-5" />
                      Reply
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Pagination from '@/components/inbox/pagination.vue';
</script>
 
