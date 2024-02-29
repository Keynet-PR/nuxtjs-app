<template>
  <form class="mt-4 space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Operator Name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="country_code">
      <FormItem>
        <FormLabel>Country Code</FormLabel>
        <vSelect
          v-bind="componentField"
          :options="dial_codes"
          :reduce="(dial_code) => dial_code.code"
        />
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="color">
      <FormItem>
        <FormLabel>Color</FormLabel>
        <FormControl>
          <Input
            type="color"
            v-bind="componentField"
            class="block h-10 w-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="!mt-4 flex justify-start gap-2">
      <Button type="submit" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-5 w-5 animate-spin text-white" />
        <span v-if="isLoading">Saving</span>
        <span v-else>Save</span>
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { h, ref } from "vue";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { cn } from "@/lib/utils";
  import { toast } from "@/components/ui/toast";
  // import vSelect from "vue-select";

  const settingStore = useSettingStore();

  watchEffect(() => settingStore.getDialCodes());
  const dial_codes = computed(() => settingStore.dial_codes);
  const isLoading = computed(() => settingStore.isLoading);

  const operatorFormSchema = toTypedSchema(
    z.object({
      name: z
        .string()
        .min(2, {
          message: "Name must be at least 2 characters.",
        })
        .max(255, {
          message: "Name must not be longer than 255 characters.",
        }),
      country_code: z.number().optional(),
      color: z.string().optional(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: operatorFormSchema,
    initialValues: {
      color: "#6fc2ff",
      country_code: 44,
    },
  });

  const onSubmit = handleSubmit((values) => {
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    });
  });
</script>
<style>
  /* @import "vue-select/dist/vue-select.css"; */
  .vs__dropdown-toggle {
    height: 40px;
  }
  .vs__deselect {
    margin-left: 7px;
  }
  .list-message-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 12px;
  }
  .stt {
    height: 40px;
    width: 40px;
    line-height: 16px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
