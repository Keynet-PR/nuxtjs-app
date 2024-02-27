<template>
  <AlertDialog :open="onOpen" @update:open="() => onCancel">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ dialog.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ dialog.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="onDeleteConfirm">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
<script setup lang="ts">
  const emit = defineEmits(["onDeleteConfirm"]);
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    dialog: {
      default: {
        title: "Are you absolutely sure?",
        description:
          "This will permanently delete your data from our servers, This action cannot be undone.",
      },
    },
  });

  const onOpen = ref(false);
  watchEffect(() => (onOpen.value = props.isOpen));
  const onCancel = computed(() => (onOpen.value = false));
  const onDeleteConfirm = () => emit("onDeleteConfirm", true);
</script>
