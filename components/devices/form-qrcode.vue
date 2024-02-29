<template>
  <div>qrcode content</div>
  <Separator class="mb-0" />
  <div class="flex justify-end gap-2">
    <Button type="button" variant="outline" @click="emit('onClose', false)"> Close </Button>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(["onClose"]);
</script>
