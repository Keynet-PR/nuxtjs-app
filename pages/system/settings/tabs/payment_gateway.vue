<template>
  <form class="mt-4 space-y-8" enctype="multipart/form-data">
    <h1 class="text-2xl font-bold">Paypal</h1>
    <FormField v-slot="{ componentField }" name="paymentGetway[client_id]" v-model="client_id">
      <FormItem>
        <FormLabel>Client ID</FormLabel>
        <FormControl>
          <Input placeholder="Client ID" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="paymentGetway[secret_key]" v-model="secret_key">
      <FormItem>
        <FormLabel>Secret Key</FormLabel>
        <FormControl>
          <Input placeholder="Secret Key" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="paymentGetway[mode]" v-model="mode">
      <FormItem>
        <FormLabel>Mode</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select an mode" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="role_name in role_names" :key="role_name" :value="role_name">
                {{ role_name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <h1 class="text-2xl font-bold">Manual Payment</h1>
    <FormField v-slot="{ componentField }" name="enabled">
      <FormItem>
        <FormLabel>Enabled</FormLabel>
        <div class="flex items-center gap-4 space-x-2">
          <Switch id="airplane-mode" />
          <!-- <Input type="time" class="w-28" id="appt" min="09:00" max="18:00" /> -->
        </div>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="paymentGetway[instruction]" v-model="instruction">
      <FormItem>
        <FormLabel>Instruction</FormLabel>
        <FormControl>
          <Textarea placeholder="Instruction" v-bind="componentField" />
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
  import { Textarea } from "@/components/ui/textarea";
  import { Button } from "@/components/ui/button";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { Loader2 } from "lucide-vue-next";
  import { watchEffect } from "vue";

  const settingStore = useSettingStore();
  watchEffect(() => settingStore.getInvoice());
  const role_names = ref(["Sandbox", "Live"]);

  const settingFormSchema = toTypedSchema(
    z.object({
      invoice: z.string().optional(),
    })
  );
</script>
