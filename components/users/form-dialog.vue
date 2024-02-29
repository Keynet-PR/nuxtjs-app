<template>
  <form class="space-y-8" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="first_name">
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="fist name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="last_name">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="last name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="role_name">
      <FormItem>
        <FormLabel>Roles</FormLabel>
        <Select v-bind="componentField" multiple>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select an role name" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="role in roles" :key="role.id" :value="role.name">
                {{ role.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
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
        <FormLabel> Password Confirmation</FormLabel>
        <FormControl>
          <Input type="text" placeholder="password confirmation" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-end gap-2">
      <Button type="submit"> Save changes </Button>
      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  const emit = defineEmits(["onSubmitForm"]);
  const traitFormStore = useTraitFormStore();
  watchEffect(() => traitFormStore.getRoles());
  const roles = computed(() => traitFormStore.roles);

  const formSchema = toTypedSchema(
    z
      .object({
        first_name: z.string(),
        last_name: z.string(),
        role_name: z.string(),
        email: z
          .string({
            required_error: "Please input an email to display.",
          })
          .email(),
        password: z.string().min(8),
        password_confirmation: z.string().min(8),
      })
      .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
      })
  );
  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
  });
  const onSubmit = handleSubmit((form) => {
    emit("onSubmitForm", form);
  });
</script>
