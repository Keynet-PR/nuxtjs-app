<template>
  <main class="min-w-0 flex-1 xl:flex">
    <div class="w-full lg:w-1/2 space-y-6 p-10 pb-16 md:block">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Campaign</h2>
        <p class="text-muted-foreground">
          Manage your campaign and set seeding preferences.
        </p>
      </div>
      <Separator class="my-6" />
      <div class="">
        <div class="mb-2 items-center flex gap-2">
          <h4 class="text-sm">Messages</h4>
          <DialogAddMessage  :items="messages"/>
        </div>
        <Draggable
          v-model="lastTwoMessages"
          item-key="id"
          tab="div"
          class="grid grid-cols-3 gap-4"
        >
          <template #item="{ element, index }">
            <div
              class="flex flex-row items-center mb-2 justify-between rounded-lg border py-2 px-4"
            >
              <div class="space-y-0.5">
                <h3 class="text-sm">{{ element.name }}</h3>
                <p class="text-xs text-muted-foreground">{{ element.content }}</p>
              </div>
              <div>
                <button
                  @click="deleteItem(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <Icon name="radix-icons:cross-2" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </template>
        </Draggable>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Draggable from "vuedraggable";
import DialogAddMessage from "@/components/campaign/dialog-add-message.vue";
const traitForm = useTraitFormStore();
const { messages, groups, sender_ids, lastTwoMessages } = storeToRefs(traitForm);

watchEffect(() => traitForm.getMessages());
const newItemName = ref();
const items = ref([
  { id: 1, name: "Item 1", content: "so it will be extra functionality add" },
  { id: 2, name: "Item 2", content: "so it will be extra functionality add" },
]);
const deleteItem = (index) => {
  items.value.splice(index, 1);
};
const addItem = () => {
  if (newItemName.value.trim() !== "") {
    items.value.push({ id: Date.now(), name: newItemName.value });
    newItemName.value = "";
  }
};
</script>
