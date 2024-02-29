<template>
  <form class="space-y-4" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="first_name">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="fist name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="last_name">
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="last name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="group_id">
      <FormItem>
        <FormLabel>List Name</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select an list name" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="(group, index) in groups" :key="index" :value="group.id">
                {{ group.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <Input type="text" placeholder="phone" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="email" v-bind="componentField" />
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
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  const traitFormStore = useTraitFormStore();
  watchEffect(() => traitFormStore.getGroups());
  const groups = computed(() => traitFormStore.groups);
  const default_form = ref();

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

  watchEffect(() => {
    props.form ? (default_form.value = props.form) : default_form.value;
  });

  const formSchema = toTypedSchema(
    z.object({
      first_name: z.string(),
      last_name: z.string(),
      group_id: z.number(),
      phone: z.string(),
      email: z.string().email().optional(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: default_form.value,
  });

  const emit = defineEmits(["onSubmitForm", "onClose"]);
  const onSubmit = handleSubmit((form) => {
    emit("onSubmitForm", form);
  });
</script>
