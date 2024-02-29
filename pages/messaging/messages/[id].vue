<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="w-full px-8 lg:max-w-[800px]">
      <div class="mb-4">
        <h3 class="text-lg font-medium">Messages</h3>
        <p class="text-sm text-muted-foreground">It manages adding-and-editing form.</p>
      </div>
      <Separator />
      <form class="mt-8 space-y-8" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
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
            <div class="text-xs">
              SMS: <b>1</b> | Char: <b>{{ form.content?.length | 0 }}</b>
            </div>
            <FormControl>
              <Textarea v-bind="componentField" />
            </FormControl>
            <FormDescription>
              <div class="grid gap-1">
                <Label for="content">Tags:</Label>
                <div class="mb-2 mt-2">
                  <Button
                    type="button"
                    @click="insertAtCaret(form, tag)"
                    variant="outline"
                    v-for="tag in tags"
                    class="text-sx mr-2 h-6 bg-gray-200 px-2 py-0"
                    >#{{ tag }}#</Button
                  >
                </div>
              </div>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-start gap-2">
          <Button type="submit"> Save changes </Button>
          <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { h, ref } from "vue";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const { breadcrumbs } = useBreadcrumbs();

  useHead({
    title: "Messages",
  });

  definePageMeta({
    breadcrumb: "Messages",
  });

  const tags = ["PHONE", "EMAIL", "FIRST_NAME", "LAST_NAME", "UNSUB"];

  let cursorPos = 0; // props.cursorPos ?? 0;
  const form: Ref = ref({
    content: "",
  });

  const setCursorPos = (event: Event) => (cursorPos = event.target?.selectionStart);

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

  const { handleSubmit, resetForm } = useForm({
    validationSchema: messageFormSchema,
  });

  const onSubmit = handleSubmit((values) => {});
</script>
