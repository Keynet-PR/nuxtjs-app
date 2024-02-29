<template>
  <form class="space-y-8" @submit="onSubmit">
    <div class="grid w-full gap-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input type="number" placeholder="0.00" step="any" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="recurry">
        <FormItem>
          <FormLabel>Recurry</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an recurry" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="recurry in recurrys" :key="recurry.value" :value="recurry.value">
                  {{ recurry.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="msg_quota">
        <FormItem>
          <FormLabel>Send Quota </FormLabel>
          <FormControl>
            <Input type="number" placeholder="10" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div>
        <FieldArray v-slot="{ fields }" name="sending_speed">
          <div v-for="(field, index) in fields" :key="field.key" class="grid grid-cols-3 gap-4">
            <FormField v-slot="{ componentField }" :name="`sending_speed[${index}].speed`">
              <FormItem>
                <FormLabel :class="cn(index !== 0 && 'sr-only')"> Sending Speed </FormLabel>
                <div class="relative flex items-center">
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" :name="`sending_speed[${index}].interval`">
              <FormItem>
                <FormLabel :class="cn(index !== 0 && 'sr-only')" class="text-xs text-gray-600">
                  Interval
                </FormLabel>
                <div class="relative flex items-center">
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" :name="`sending_speed[${index}].unit`">
              <FormItem>
                <FormLabel :class="cn(index !== 0 && 'sr-only')" class="text-xs text-gray-600">
                  Unit
                </FormLabel>
                <div class="relative flex items-center">
                  <FormControl>
                    <Select v-bind="componentField">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="unit in sending_units"
                            :key="unit.value"
                            :value="unit.value"
                          >
                            {{ unit.label }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </FieldArray>
      </div>
      <div>
        <FieldArray v-slot="{ fields }" name="quota_price">
          <div v-for="(field, index) in fields" :key="`quota_price-${field.key}`">
            <FormField v-slot="{ componentField }" :name="`quota_price[${index}].value`">
              <FormItem>
                <FormLabel :class="cn(index !== 0 && 'sr-only')"> Quota Pricing </FormLabel>
                <FormLabel class="text-xs font-normal text-gray-600">
                  {{ field?.value?.label }}
                </FormLabel>
                <div class="relative flex items-center">
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      :placeholder="field?.value?.label"
                      v-bind="componentField"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </FieldArray>
      </div>
      <div>
        <FieldArray v-slot="{ fields }" name="over_quota_price">
          <div v-for="(field, index) in fields" :key="`over_quota_price-${field.key}`">
            <FormField v-slot="{ componentField }" :name="`over_quota_price[${index}].value`">
              <FormItem>
                <FormLabel :class="cn(index !== 0 && 'sr-only')"> Over Quota Pricing </FormLabel>
                <FormLabel class="text-xs font-normal text-gray-600">
                  {{ field?.value?.label }}
                </FormLabel>
                <div class="relative flex items-center">
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      :placeholder="field?.value?.label"
                      v-bind="componentField"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </FieldArray>
      </div>
    </div>
    <Separator class="mb-4" />
    <div class="flex justify-start gap-2">
      <Button type="submit"> Save changes </Button>
      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
  import { defineProps } from "vue";
  import { FieldArray, useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { cn } from "@/lib/utils";
  import { recurrys, sending_units } from "@/models/data";

  const props = defineProps({
    form: {
      type: Object,
      default: null,
      require: false,
    },
  });

  const default_form = ref({
    name: "Free",
    price: 10,
    recurry: "monthly",
    msg_quota: 10,
    sending_speed: [
      {
        speed: 100,
        interval: 1,
        unit: "H",
      },
    ],
    quota_price: [
      { label: "1s2u", value: 0.05 },
      { label: "khmer", value: 0.05 },
    ],
    over_quota_price: [
      { label: "1s2u", value: 0.05 },
      { label: "khmer", value: 0.05 },
    ],
  });

  const form = computed(() => (props.form ? props.form : default_form.value));

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
      price: z.number().nullable(),
      msg_quota: z.number(),
      recurry: z.string({
        required_error: "Please select an recurry to display.",
      }),
      sending_speed: z
        .array(
          z.object({
            speed: z.number(),
            interval: z.number(),
            unit: z.string(),
          })
        )
        .optional(),
      quota_price: z.array(
        z.object({
          label: z.string(),
          value: z.number(),
        })
      ),
      over_quota_price: z
        .array(
          z.object({
            label: z.string(),
            value: z.number(),
          })
        )
        .optional(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: form.value,
  });

  const emit = defineEmits(["onSubmitForm"]);
  const onSubmit = handleSubmit((form) => {
    alert();
    // emit("onSubmitForm", form);
  });
</script>
