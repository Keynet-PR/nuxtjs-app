<template>
  <form class="space-y-3" @submit="onSubmit">
    <FormField v-slot="{ componentField, value }" name="range">
      <FormItem class="flex flex-col">
        <FormLabel class="sr-only">Date</FormLabel>
        <FormControl>
          <div :class="cn('grid gap-2', $attrs.class ?? '')">
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  id="date"
                  size="sm"
                  :variant="'outline'"
                  :class="
                    cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  <span>
                    {{
                      date.start
                        ? date.end
                          ? `${format(date.start, "LLL dd, y")} - ${format(
                              date.end,
                              "LLL dd, y"
                            )}`
                          : format(date.start, "LLL dd, y")
                        : "Pick a date"
                    }}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0" align="start">
                <Calendar
                  v-model.range="date"
                  :columns="2"
                  v-bind="componentField"
                />
              </PopoverContent>
            </Popover>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel class="sr-only">name=""</FormLabel>
        <FormControl>
          <Input
            type="text"
            class="h-9"
            placeholder="Name"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="status">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Active</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <div class="flex justify-end">
      <Button size="sm" type="submit"> Apply </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";

import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const date = ref({
  start: addDays(new Date(), -7),
  end: new Date(),
});

const formSchema = toTypedSchema(
  z.object({
    range: z.object({
      start: z.date(),
      end: z.date(),
    }),
    name: z.string().optional(),
    status: z.boolean().default(false).optional(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    status: true,
    name: '',
    range: date.value,
  },
});

const emit = defineEmits(["onSubmit"]);
const onSubmit = handleSubmit((form) => {
  const range = `${format(form.range.start, "y/LL/d")} - ${format(
    form.range.end,
    "y/LL/dd"
  )}`;

  emit("onSubmit", {
    range: range,
    name: form.name,
    status: form.status,
  });
});
</script>
