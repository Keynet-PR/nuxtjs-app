<script setup lang="ts">
  import { defineProps } from "vue";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  const props = defineProps({
    form: {
      type: Object,
      default: {},
      require: false,
    },
  });

  const default_form = ref({
    tracking_domain: z.boolean,
  });

  const form = computed(() => (props.form ? props.form : default_form.value));

  const formSchema = toTypedSchema(
    z.object({
      tracking_domain: z.boolean(),
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
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ value, handleChange }" name="tracking_domain">
      <FormItem class="flex items-center gap-2">
        <FormControl>
          <Switch :checked="value" @update:checked="handleChange" />
        </FormControl>
        <FormLabel class="text-base"> Use for tracking links </FormLabel>
      </FormItem>
    </FormField>
  </form>
</template>
