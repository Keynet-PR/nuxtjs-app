<template>
  <form class="mt-4 space-y-8" @submit="onSubmit">
    <div>
      <FieldArray v-slot="{ fields, push, remove }" name="moreFields">
        <div
          v-for="(field, index) in fields"
          :key="`moreFields-${field.key}`"
          class="mb-2 grid grid-cols-2 items-center gap-2"
        >
          <FormField v-slot="{ componentField }" :name="`moreFields[${index}].fieldType`">
            <FormItem>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Field Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="fieldType in fieldTypes" :key="fieldType" :value="fieldType">
                      {{ fieldType }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" :name="`moreFields[${index}].fieldName`">
            <FormItem>
              <div class="relative flex items-center">
                <FormControl>
                  <Input type="text" v-bind="componentField" placeholder="Field Name" />
                </FormControl>
                <button
                  type="button"
                  class="absolute end-0 py-2 pe-3 text-muted-foreground"
                  @click="remove(index)"
                >
                  <Cross1Icon class="w-3" />
                </button>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          class="mt-2 text-xs"
          @click="push({ value: '' })"
        >
          Add Field
        </Button>
      </FieldArray>
    </div>

    <div class="flex justify-start gap-2">
      <Button type="submit"> Save Change</Button>
      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { h, ref } from "vue";
  import { FieldArray, useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  // import { Cross1Icon } from "@radix-icons/vue";
  import { cn } from "@/lib/utils";

  import { toast } from "@/components/ui/toast";

  const fieldTypes = ref(["number", "string", "datetime"]);

  const profileFormSchema = toTypedSchema(
    z.object({
      moreFields: z
        .array(
          z.object({
            fieldName: z.string({ message: "Please enter a valid Field Name." }),
            fieldType: z.string({ message: "Please enter a valid Field Type." }),
          })
        )
        .optional(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: profileFormSchema,
    initialValues: {
      moreFields: [
        { fieldName: "first_name", fieldType: "string" },
        { fieldName: "last_name", fieldType: "string" },
        { fieldName: "phone", fieldType: "string" },
        { fieldName: "email", fieldType: "string" },
      ],
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
