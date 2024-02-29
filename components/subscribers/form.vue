<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>List Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="name" v-bind="componentField" />
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

  const default_form = ref();

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
    props.form ? (default_form.value = props.form) : default_form.value;
  });

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: default_form.value,
  });

  const emit = defineEmits(["onSubmitForm", "onClose"]);
  const onSubmit = handleSubmit((form) => {
    emit("onSubmitForm", form);
  });
</script>
