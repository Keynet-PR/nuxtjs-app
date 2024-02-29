<template>
  <Dialog :open="isOpen" @update:open="isOpen = false">
    <DialogContent v-if="onUploadProgress" class="sm:max-w-md">
      <div>
        <Icon name="svg-spinners:180-ring-with-bg" class="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </div>
    </DialogContent>
    <DialogContent v-else class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Import Contacts</DialogTitle>
        <DialogDescription>
          Supported file format: <br />
          txt, csv (separated by comma) Max file size 1 GB
        </DialogDescription>
      </DialogHeader>
      <form class="w-96 space-y-8" :initial-values="initialData" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="group_id">
          <FormItem>
            <FormLabel>List</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an list" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="(group, index) in groupOptions" :key="index" :value="index">
                    {{ group }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ handleChange, value }" type="checkbox" name="exclude_first_row">
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel> Exclude first row </FormLabel>
            </div>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="fileContent" v-model="fileContent">
          <FormItem>
            <FormLabel>Define Fields</FormLabel>
            <FormControl>
              <Textarea v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div>
          <FieldArray name="samples">
            <div
              v-for="(field, index) in samples"
              :key="`samples-${field.key}`"
              class="mb-2 grid grid-cols-2 gap-4"
            >
              <FormField
                v-model="field.value"
                v-slot="{ componentField }"
                :name="`samples[${index}].value`"
              >
                <FormItem>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField
                v-slot="{ componentField }"
                v-model="field.field_name"
                :name="`samples[${index}].field_name`"
              >
                <FormItem>
                  <FormControl>
                    <Select v-bind="componentField">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="skip"> skip </SelectItem>
                          <SelectItem v-for="(item, index) in _fields" :value="index">
                            {{ item }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </FieldArray>
        </div>
        <div class="flex justify-end gap-2">
          <Button type="submit">
            <div v-if="isLoading">
              <Icon name="svg-spinners:180-ring-with-bg" class="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </div>
            <span v-else>Import</span>
          </Button>
          <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { FieldArray, useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  const subscriber = useSubscriberStore();
  const isLoading = computed(() => subscriber.isLoading);
  const onUploadProgress = computed(() => subscriber.onUploadProgress);

  const props = defineProps({
    checkUpfileFormat: Object,
    isOpen: false,
  });
  const emit = defineEmits(["onSubmit"]);
  const groupOptions = computed(
    () => props?.checkUpfileFormat.checkUpfileFormat?.original?.groupOptions
  );
  const fileContent = computed(
    () => props?.checkUpfileFormat?.checkUpfileFormat?.original?.fileContent
  );

  const samples = computed(() =>
    props?.checkUpfileFormat?.checkUpfileFormat?.original?.sample.map((item: any) => {
      return { value: item, field_name: "skip" };
    })
  );

  const _fields = computed(() => props?.checkUpfileFormat?.checkUpfileFormat?.original?.fields);

  const checkUpfileFormatSchema = toTypedSchema(
    z.object({
      group_id: z.string(),
      exclude_first_row: z.boolean().default(false).optional(),
      fileContent: z.string(),
      samples: z
        .array(
          z.object({
            value: z.string(),
            field_name: z.string(),
          })
        )
        .optional(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: checkUpfileFormatSchema,
  });

  const onSubmit = handleSubmit(async (values) => {
    emit("onSubmit", values);
  });
</script>
