<script setup lang="ts">
  import { defineProps } from "vue";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  const props = defineProps({
    form: {
      default: null,
      require: false,
    },
  });

  const default_form = ref({
    name: "",
  });

  const form = computed(() => (props.form ? props.form : default_form.value));

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
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
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Domain Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Separator class="mb-4" />
    <div class="flex justify-start gap-2">
      <Button type="submit"> Save changes </Button>
      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>
