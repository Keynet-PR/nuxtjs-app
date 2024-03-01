<template>
  <form class="mt-4 space-y-8" @submit="onSubmitInvoice" enctype="multipart/form-data">
    <FormField v-slot="{ componentField }" name="invoice[logo]" v-model="logo">
      <FormItem>
        <FormControl>
          <Input type="file" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="invoice[company_name]" v-model="company_name">
      <FormItem>
        <FormLabel>Company Name</FormLabel>
        <FormControl>
          <Textarea placeholder="Company Name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="invoice[company_info]" v-model="company_info">
      <FormItem>
        <FormLabel>Company Info</FormLabel>
        <FormControl>
          <Textarea placeholder="Company Info" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="invoice[note]" v-model="note">
      <FormItem>
        <FormLabel>Note</FormLabel>
        <FormControl>
          <Textarea placeholder="Note" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid gap-1">
      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Currency</label>
      <div class="flex items-center space-x-2">
        <div class="col-span-2">
          <FormField
            v-slot="{ componentField }"
            name="invoice[currency][name]"
            v-model="currency_name"
          >
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Currency Name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="col-span-2">
          <FormField
            v-slot="{ componentField }"
            name="invoice[currency][code]"
            v-model="currency_code"
          >
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Currency Code" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="col-span-2">
          <FormField
            v-slot="{ componentField }"
            name="invoice[currency][exchange_rate]"
            v-model="currency_exchange_rate"
          >
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Currency Exchange Rate" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>
    </div>
    <div class="!mt-4 flex justify-start gap-2">
      <Button type="submit" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-5 w-5 animate-spin text-white" />
        <span v-if="isLoading">Saving</span>
        <span v-else>Save Changes</span>
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { Button } from "@/components/ui/button";
  import { useForm } from "vee-validate";
  import { toast } from "@/components/ui/toast";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { Loader2 } from "lucide-vue-next";
  import { computed, watchEffect } from "vue";

  const settingStore = useSettingStore();
  watchEffect(() => settingStore.getInvoice());
  const invoice = computed(() => settingStore.invoice);

  const settingFormSchema = toTypedSchema(
    z.object({
      invoice: z.string().optional(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: settingFormSchema,
    initialValues: {
      invoice: [],
    },
  });

  const onSubmitInvoice = handleSubmit((values) => {
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[440px] rounded-md bg-slate-950 p-4 max-h-[200px] overflow-auto" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    });
  });
</script>
