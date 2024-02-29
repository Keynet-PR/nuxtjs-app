<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name" v-model="form.name">
      <FormItem>
        <FormLabel>Device Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Your device" v-bind="componentField" />
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

  const emit = defineEmits(["onSubmitForm", "onClose"]);

  const default_form = ref({
    name: "",
  });

  const props = defineProps({
    form: {
      type: Object,
      required: false,
      default: {},
    },
  });

  const form = computed(() => props.form ?? default_form.value);

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
    })
  );
  const submitForm = useForm({
    validationSchema: formSchema,
  });
  const onSubmit = submitForm.handleSubmit((values) => {
    emit("onSubmitForm", values);
  });
</script>
