<script setup>
  import Modal from "./modal.vue";

  const emit = defineEmits(["close"]);

  defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: "xl",
    },
    closeable: {
      type: Boolean,
      default: true,
    },
  });

  const close = () => {
    emit("close");
  };
</script>

<template>
  <Modal :show="show" :max-width="maxWidth" :closeable="closeable" @close="close">
    <div class="px-6 py-4">
      <slot />
    </div>
  </Modal>
</template>
