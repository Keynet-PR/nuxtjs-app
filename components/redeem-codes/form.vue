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

  const form = ref({
    amount: 0,
  });

  const formSchema = toTypedSchema(
    z.object({
      amount: z.number(),
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
    <div class="grid w-full grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="amount">
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input type="number" placeholder="0.00" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <Separator class="mb-4" />
    <div class="flex justify-start gap-2">
      <Button type="submit"> Save changes </Button>
      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>
