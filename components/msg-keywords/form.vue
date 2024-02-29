<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name" v-model="form.name">
      <FormItem>
        <FormLabel>Keyword</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Your keyword" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="group_id" v-model="form.group_id">
      <FormItem>
        <FormLabel>List Name</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select an list name" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="(group, index) in groups" :key="index" :value="group.id">
                {{ group.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="auto_confirm_status"
      v-model="form.auto_confirm_status"
    >
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel> Auto confirm</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="confirm_message" v-model="form.confirm_message">
      <FormItem>
        <FormLabel>Auto confirm message</FormLabel>
        <FormControl>
          <Textarea
            :disabled="!form.auto_confirm_status"
            placeholder="Type your message here."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Separator class="mb-0" />
    <div class="flex justify-end gap-2">
      <Button type="submit"> Save Changes </Button>
      <Button type="button" variant="outline" @click="emit('onClose', false)"> Close </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import type { MsgKeyword } from "~/models/schema";

  const traitFormStore = useTraitFormStore();
  watchEffect(() => traitFormStore.getGroups());
  const groups = computed(() => traitFormStore.groups);
  const form = ref<MsgKeyword>();

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    form: {
      type: Object,
      required: false,
      default: {},
    },
  });

  watchEffect(() => {
    props.form ? (form.value = props.form) : form.value;
  });

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
      group_id: z.number(),
      auto_confirm_status: z.boolean().default(false).optional(),
      confirm_message: z.string({
        required_error: "Please type your message here.",
      }),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: form.value,
  });

  const emit = defineEmits(["onSubmitForm", "onClose"]);
  const onSubmit = handleSubmit((form) => {
    emit("onSubmitForm", form);
  });
</script>
