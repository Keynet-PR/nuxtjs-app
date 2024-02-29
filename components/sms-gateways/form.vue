<script setup lang="ts">
  import { defineProps } from "vue";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  import { sms_gateways, delivery_statuses } from "@/models/data";

  const props = defineProps({
    form: {
      default: null,
      require: false,
    },
  });

  const default_form = ref({
    price: 0.5,
    max_length_unicode: 9999,
    max_length_ascii: 9999,
    cost: 0.5,
    bill_except: ["1"],
  });

  const form = computed(() => (props.form ? props.form : default_form.value));

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
      username: z
        .string()
        .min(2, {
          message: "Username must be at least 2 characters.",
        })
        .max(30, {
          message: "Username must not be longer than 30 characters.",
        }),
      password: z
        .string()
        .min(2, {
          message: "Password must be at least 2 characters.",
        })
        .max(30, {
          message: "Password must not be longer than 30 characters.",
        }),
      sender: z.string({
        required_error: "Please select an sender to display.",
      }),

      smpp: z.boolean().default(false).optional(),
      allow_custom_sid: z.boolean().default(false).optional(),
      "1_way_sms": z.boolean().default(false).optional(),
      price: z.number(),
      cost: z.number(),
      max_length_unicode: z.number(),
      max_length_ascii: z.number(),
      bill_except: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: form.value,
  });

  const emit = defineEmits(["onSubmitForm"]);
  const onSubmit = handleSubmit((form) => {
    emit("onSubmitForm", form);
  });
</script>
<template>
  <form class="space-y-4" @submit="onSubmit">
    <div class="grid w-full grid-cols-2 gap-4">
      <div class="grid gap-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Gateway Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="sender">
          <FormItem>
            <FormLabel>Sender</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an sms gateways" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="sms in sms_gateways" :key="sms.id" :value="sms.name">
                    {{ sms.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder="username" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" type="checkbox" name="smpp">
          <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>SMPP</FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" type="checkbox" name="allow_custom_sid">
          <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Allow Custom SID</FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" type="checkbox" name="1_way_sms">
          <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>1 way_sms</FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>

      <div class="grid gap-4">
        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0.050" step="any" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="max_length_unicode">
          <FormItem>
            <FormLabel>Max Length Unicode</FormLabel>
            <FormControl>
              <Input type="number" placeholder="9999" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="max_length_ascii">
          <FormItem>
            <FormLabel>Max Length</FormLabel>
            <FormControl>
              <Input type="number" placeholder="9999" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="cost">
          <FormItem>
            <FormLabel>Cost</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0.050" step="any" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="bill_except">
          <FormItem>
            <FormLabel>Do not bill on these status</FormLabel>
            <div class="grid w-72 grid-cols-2">
              <FormField
                v-for="item in delivery_statuses"
                v-slot="{ value, handleChange }"
                :key="item.code"
                type="checkbox"
                :value="item.code"
                :unchecked-value="false"
                name="bill_except"
              >
                <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox :checked="value.includes(item.code)" @update:checked="handleChange" />
                  </FormControl>
                  <FormLabel class="font-normal">
                    {{ item.label }}
                  </FormLabel>
                </FormItem>
              </FormField>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>
    <Separator class="mb-4" />
    <div class="flex justify-start gap-2">
      <Button type="submit"> Save changes </Button>
      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>
