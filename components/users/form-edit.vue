<template>
  <div></div>
  <form class="space-y-8" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="first_name" v-model="form.first_name">
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="fist name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="last_name" v-model="form.last_name">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="last name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="username" v-model="form.username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="username" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="phone" v-model="form.phone">
      <FormItem>
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <Input type="text" placeholder="phone" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="brand_name" v-model="form.brand_name">
        <FormItem>
          <FormLabel>Brand Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="brand name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="company" v-model="form.company">
        <FormItem>
          <FormLabel>Company</FormLabel>
          <FormControl>
            <Input type="text" placeholder="company" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="address" v-model="form.address">
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us a little bit about your address" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="role_name" v-model="form.role_name">
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
      <FormField v-slot="{ componentField }" name="status" v-model="form.status">
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="(statuse, index) in user_statuses" :key="index" :value="statuse.id">
                  {{ statuse.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="password" v-model="form.password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="text" placeholder="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="password_confirmation"
        v-model="form.password_confirmation"
      >
        <FormItem>
          <FormLabel> Password Confirmation</FormLabel>
          <FormControl>
            <Input type="text" placeholder="password confirmation" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="flex justify-start gap-2">
      <Button type="submit"> Save changes </Button>
      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import * as z from "zod";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import { watchEffect, computed } from "vue";
  import { user_statuses } from "@/models/data";

  const emit = defineEmits(["onSubmitForm"]);
  const traitFormStore = useTraitFormStore();

  watchEffect(() => traitFormStore.getRoles());

  const roles = computed(() => traitFormStore.roles);


  const { form } = defineProps({
    form: {
      type: Object,
      required: false,
      default: {},
    }
  });
  
  const formSchema = toTypedSchema(
    z.object({
        first_name: z.string(),
        last_name: z.string(),
        username: z.string().optional().nullable(),
        phone: z.string().optional(),
        email: z.string().optional(),
        brand_name: z.string().optional(),
        company: z.string().optional(),
        address: z.string().optional(),
        role_name: z.string(),
        status: z.number(),
        password: z.string().min(8).optional(),
        password_confirmation: z.string().min(8).optional(),
      })
      .refine((input) => input.password === input.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
      })
  );
  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: form.value
  });
  const onSubmit = handleSubmit((values) => {
    emit("onSubmitForm", values);
  });
</script>
