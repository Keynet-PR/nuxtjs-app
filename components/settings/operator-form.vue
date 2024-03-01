<template>
  <form class="mt-4 space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Operator Name"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex items-center space-x-2">
      <FormField v-slot="{ componentField }" name="color">
        <FormItem>
          <FormLabel class="sr-only">Color</FormLabel>
          <FormControl>
            <Input
              type="color"
              v-bind="componentField"
              class="block h-10 w-10 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900"
            />
          </FormControl>
          <!-- <FormMessage /> -->
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="country_code">
        <FormItem class="grid flex-1 gap-2">
          <FormLabel class="sr-only">Country Code</FormLabel>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Select a code" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>country_code</SelectLabel>
                <SelectItem
                  v-for="dial_code in dial_codes"
                  :value="dial_code?.code"
                >
                  {{ dial_code?.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <!-- <FormMessage /> -->
        </FormItem>
      </FormField>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="submit"> Save Changes </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";

const settingStore = useSettingStore();

watchEffect(() => settingStore.getDialCodes());
const dial_codes = computed(() => settingStore.dial_codes);

const operatorFormSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(255, {
        message: "Name must not be longer than 255 characters.",
      }),
    country_code: z.number().optional(),
    color: z.string().optional(),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: operatorFormSchema,
  initialValues: {
    color: "#6fc2ff",
    country_code: 855,
  },
});

const onSubmit = handleSubmit((values) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
});
</script>

<style>
.vs__dropdown-toggle {
  height: 40px;
}
</style>
