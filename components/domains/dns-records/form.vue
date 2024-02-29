<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <FormLabel>Types</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="A" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="dns in dnsReportTypes" :key="dns.value" :value="dns.value">
                {{ dns.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="content">
      <FormItem>
        <FormLabel>Content</FormLabel>
        <FormControl>
          <Input type="text" placeholder="content" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="ttl">
      <FormItem>
        <FormLabel>TTL</FormLabel>
        <FormControl>
          <Input type="text" placeholder="1" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Separator class="mb-0" />
    <div class="flex justify-end gap-2">
      <Button type="submit"> Save Changes </Button>
      <Button type="button" variant="outline" @click="emit('onClose', false)"> Close </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
  import { defineProps } from "vue";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { dnsReportTypes } from "@/models/data";

  const props = defineProps({
    form: {
      typ: Object,
      default: {},
      require: false,
    },
  });

  const default_form = ref({
    type: "A",
    name: "",
    content: "",
    ttl: 1,
  });

  const form = computed(() => (props.form ? props.form : default_form.value));

  const formSchema = toTypedSchema(
    z.object({
      type: z.string(),
      name: z.string(),
      content: z.string(),
      ttl: z.number(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: form.value,
  });

  const emit = defineEmits(["onSubmitForm", "onClose"]);
  const onSubmit = handleSubmit((form) => {
    emit("onSubmitForm", form);
  });
</script>
