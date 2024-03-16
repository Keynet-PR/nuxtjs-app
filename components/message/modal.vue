<template>
  <form @submit="onSubmit">
    <div class="grid gap-2">
      <Input type="hidden" v-model="form.id" />
      <div class="grid gap-1">
        <Label for="name">Name</Label>
        <Input v-model="form.name" placeholder="Name" type="text" :disabled="isLoading" id="name" />
      </div>

      <div class="grid gap-1">
        <Label for="content">Content</Label>
        <Textarea
          v-model="form.content"
          id="content"
          ref="content"
          @mouseup="setCursorPos"
          @change="setCursorPos"
        />
        <div class="text-right">
          SMS: <b>1</b> | Char: <b>{{ form.content?.length | 0 }}</b>
        </div>
      </div>

      <div class="grid gap-1">
        <Label for="content">Tags:</Label>
        <div class="mb-2 mt-2">
          <Button
            type="button"
            @click="insertAtCaret(form, tag)"
            variant="surface"
            v-for="tag in tags"
            class="text-sx mr-2 h-6 bg-gray-200 px-2 py-0"
            >#{{ tag }}#</Button
          >
        </div>
      </div>

      <div
        class="mt-3 flex flex-col space-y-2 sm:flex-row sm:justify-start sm:space-x-2 sm:space-y-0"
      >
        <Button type="submit" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          <span v-if="isLoading">Saving</span>
          <span v-else>Save</span>
        </Button>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
  import { ref, computed } from "vue";
  import { Loader2 } from "lucide-vue-next";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { type Message } from "@/models/schema";
  const tags = ["PHONE", "EMAIL", "FIRST_NAME", "LAST_NAME", "UNSUB"];

  const emit = defineEmits(["closeDialog"]);

  interface MessageProps {
    action?: string;
    message?: {
      id?: number | null;
      name: string;
      content: string;
    };
    cursorPos?: Number;
  }

  const props = defineProps<MessageProps>();

  let cursorPos = props.cursorPos ?? 0;

  function setCursorPos(event: Event) {
    cursorPos = event.target.selectionStart;
  }

  function insertAtCaret(form, tag) {
    tag = "#" + tag + "#";

    if (!tag) {
      return;
    }

    var startPos = cursorPos,
      tmpStr = form.content || "";

    form.content = tmpStr.substring(0, startPos) + tag + tmpStr.substring(startPos, tmpStr.length);

    setTimeout(() => {
      cursorPos += tag.length;
    }, 10);
  }

  const messageStore = useMessageStore();
  const isLoading = computed(() => messageStore.isLoading);

  const form: Ref = ref({
    id: props.message.id,
    name: props.message.name,
    content: props.message.content,
  });

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    let result;
    if (props.action === "create") {
      result = await messageStore.create(form.value);
    } else {
      result = await messageStore.update(form.value.id, form.value);
    }
    if (result) {
      emit("closeDialog");
    }
  };
</script>
