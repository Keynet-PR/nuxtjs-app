<template>
  <form class="mt-4 space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="cloudflare_token" v-model="cloudflare_token">
      <FormItem>
        <FormLabel>API Token</FormLabel>
        <FormControl>
          <Input type="text" placeholder="API Token" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

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
  import { Button } from "@/components/ui/button";
  import { useForm } from "vee-validate";
  import { toast } from "@/components/ui/toast";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { Loader2 } from "lucide-vue-next";
  import { computed, watchEffect } from "vue";

  const settingStore = useSettingStore();
  watchEffect(() => settingStore.getCloudFlare());
  const cloudflare_token = computed(() => settingStore.cloud_flare as string);
  const isLoading = computed(() => settingStore.isLoading)
  const formSchema = toTypedSchema(
    z.object({
      cloudflare_token: z.string(),
    })
  );
  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
  });

  const onSubmit = handleSubmit((values) => {
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
