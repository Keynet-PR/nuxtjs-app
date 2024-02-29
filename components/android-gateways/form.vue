<template>
  <form class="space-y-4" @submit="onSubmit">
    {{ form }}
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
 
    <FormField v-slot="{ componentField }" name="device_id">
      <FormItem>
        <FormLabel>Devices</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="(device, index) in devices" :key="index" :value="device.id">
                {{ device.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="send_cross_carrier">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Send cross carrier</FormLabel>
        </div>
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
  import { h, ref } from "vue";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import * as z from "zod";
  
  const traitFormStore = useTraitFormStore();
  watchEffect(() => traitFormStore.getDevices());
  const devices = computed(() => traitFormStore.devices);

  const props = defineProps({
    form: {
      type: Object,
      default: null,
      require: false,
    },
  });

  const default_form: Ref = ref({
    name: ""
  });

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
      device_id: z.number(),
      send_cross_carrier: z.boolean()
    })
  );

  const form = computed(() => (props.form ?? default_form.value));

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: form.value,
  });

  const emit = defineEmits(["onSubmitForm", "onClose"]);
  const onSubmit = handleSubmit((form) => {
    emit("onSubmitForm", form);
  });
</script>
