<template>
  <Dialog :open="isOpen" @update:open="isOpen = false">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ dialog.title }}</DialogTitle>
        <DialogDescription>
          {{ dialog.description }}
        </DialogDescription>
      </DialogHeader>
      <div>qr</div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  const emit = defineEmits(["onSubmitForm"]);

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
    dialog: {
      default: {
        title: "Device QR Code",
        description: "It manages scan device QR Code.",
      },
    },
  });

  const form = computed(() => props.form);

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
