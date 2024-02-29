<script setup lang="ts">
  import { h, ref } from "vue";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { useForm } from "vee-validate";

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

  useHead({
    title: "Messages",
  });

  const tags = ["PHONE", "EMAIL", "FIRST_NAME", "LAST_NAME", "UNSUB"];

  let cursorPos = 0; // props.cursorPos ?? 0;
  const form: Ref = ref({
    name: "",
    content: "",
  });

  const setCursorPos = (event: Event) => (cursorPos = event?.target?.selectionStart);

  const insertAtCaret = (form: any, tag: any) => {
    tag = "#" + tag + "#";
    if (!tag) return;

    var startPos = cursorPos,
      tmpStr = form.content || "";

    form.content = tmpStr.substring(0, startPos) + tag + tmpStr.substring(startPos, tmpStr.length);

    setTimeout(() => {
      cursorPos += tag.length;
    }, 10);
  };

  const messageFormSchema = toTypedSchema(
    z.object({
      name: z
        .string()
        .min(2, {
          message: "Name must be at least 2 characters.",
        })
        .max(30, {
          message: "Name must not be longer than 30 characters.",
        }),
      content: z
        .string()
        .max(160, { message: "Content must not be longer than 160 characters." })
        .min(4, { message: "Content must be at least 2 characters." }),
    })
  );

  watchEffect(() => (props.form ? (form.value = props.form) : form.value));

  const { handleSubmit, resetForm } = useForm({
    validationSchema: messageFormSchema,
  });

  const emit = defineEmits(["onSubmitForm", "onClose"]);
  const onSubmit = handleSubmit((form) => {
    emit("onSubmitForm", form);
  });
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name" v-model="form.name">
      <FormItem>
        <FormLabel>Message</FormLabel>
        <FormControl>
          <Input type="text" placeholder="message" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="content"
      v-model="form.content"
      id="content"
      ref="content"
      @mouseup="setCursorPos"
      @change="setCursorPos"
    >
      <FormItem>
        <FormLabel>Content</FormLabel>
        <FormControl>
          <div class="text-xs">
            SMS: <b>1</b> | Char: <b>{{ form.content?.length | 0 }}</b>
          </div>
          <Textarea v-bind="componentField" />
        </FormControl>
        <FormMessage />
        <FormDescription>
          <div class="grid gap-1">
            <Label for="content">Tags:</Label>
            <div class="inlne-flex">
              <Badge
                size="icon"
                class="mx-[1px] my-[2px] text-xs"
                @click="insertAtCaret(form, tag)"
                variant="outline"
                v-for="tag in tags"
              >
                #{{ tag }}#
              </Badge>
            </div>
          </div>
        </FormDescription>
      </FormItem>
    </FormField>

    <Separator class="mb-0" />
    <div class="flex justify-end gap-2">
      <Button type="submit"> Save Changes </Button>
      <Button type="button" variant="outline" @click="emit('onClose', false)"> Close </Button>
    </div>
  </form>
</template>
