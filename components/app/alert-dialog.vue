<template>
  <Modal :show="show" max-width="md">
    <div class="p-6">
      <h2 class="mb-2 text-2xl font-semibold">Please Confirm</h2>
      <p>{{ message }}</p>
      <div class="mt-6 flex justify-end">
        <Button variant="outline" @click="($event) => emit('cancel')">Cancel</Button>
        <Button class="ml-3" @click="($event) => emit('confirm')"> Confirm </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
  import Modal from "@/components/app/dialog/modal.vue";
  import { Button } from "@/components/ui/button";

  const props = defineProps({
    show: Boolean,
    message: {
      type: String,
      default:
        "This will permanently delete your data from our servers, This action cannot be undone",
    },
  });
  const emit = defineEmits(["cancel", "confirm"]);
</script>
