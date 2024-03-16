<template>
  <form class="space-y-4" @submit="onSubmit">
    <div>
      <FieldArray v-slot="{ fields, push, remove }" name="message_id">
        <div v-for="(field, index) in fields" :key="`message_id-${field.key}`">
          <FormField
            v-slot="{ componentField }"
            :name="`message_id[${index}].id`"
          >
            <FormItem>
              <FormLabel :class="cn(index !== 0 && 'sr-only')">
                Messages
              </FormLabel>
              <div class="border rounded-md px-2 py-1">
                <div class="flex justify-end gap-2 items-center">
                  <Badge variant="outline">1</Badge>
                  <FormControl>
                    <Select v-bind="componentField">
                      <SelectTrigger class="h-7">
                        <SelectValue placeholder="Select a message" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="message in messages"
                            :value="message.id"
                          >
                            <p>{{ message.name }}</p>
                            <p class="text-xs">
                              {{ message.content }}
                            </p>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <Button
                    class="text-muted-foreground"
                    variant="ghost"
                    size="icon"
                    @click="remove(index)"
                  >
                    <Icon name="radix-icons:trash" class="w-5 h-5" />
                  </Button>
                </div>
                <!-- <FormDescription>
                        Add messages to your campaign.
                      </FormDescription> -->
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="mt-2 w-28 text-xs"
          @click="push({ value: '' })"
        >
          Add Message
        </Button>
      </FieldArray>
    </div>
  </form>
</template>

<script lang="ts" setup>

</script>

 
