<template>
  <div>
    <h3 class="text-lg font-medium">Change Passowrd</h3>
    <p class="text-sm text-muted-foreground">
      This is how system will protect you lost on the site.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="text" placeholder="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password_confirmation">
      <FormItem>
        <FormLabel>Password Confirmation</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="password confirmation"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-start gap-2">
      <Button type="submit"> Change Passord </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const modelStore = useSettingsStore();
watchEffect(() => modelStore.getUser());
const user = computed(() => modelStore.user);

const formSchema = toTypedSchema(
  z.object({
    password: z.string().min(8).optional(),
        password_confirmation: z.string().min(8).optional(),
      })
      .refine((input) => input.password === input.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
      })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema
});

const onSubmit = handleSubmit(async (values: any) => {
  await modelStore.onChangePassword(values);
});

definePageMeta({
  layout: "settings",
  middleware: "auth",
});
useHead({
  title: "Change Password",
});
</script>
