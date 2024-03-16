<template>
  <div>
    <h3 class="text-lg font-medium">Profile</h3>
    <p class="text-sm text-muted-foreground">
      This is how others will see you on the site.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="username" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </FormDescription>
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
          <Input type="text" placeholder="email" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your accoun login . It can be your real name@example.com or a
          pseudonym@example.com. You can only change this once every 30 days.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="bio">
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations to link to
          them.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <!-- <div>
      <FieldArray v-slot="{ fields, push, remove }" name="urls">
        <div v-for="(field, index) in fields" :key="`urls-${field.key}`">
          <FormField v-slot="{ componentField }" :name="`urls[${index}].value`">
            <FormItem>
              <FormLabel :class="cn(index !== 0 && 'sr-only')">
                URLs
              </FormLabel>
              <FormDescription :class="cn(index !== 0 && 'sr-only')">
                Add links to your website, blog, or social media profiles.
              </FormDescription>
              <div class="relative flex items-center">
                <FormControl>
                  <Input type="url" v-bind="componentField" />
                </FormControl>
                <button
                  type="button"
                  class="absolute end-0 py-2 pe-3 text-muted-foreground"
                  @click="remove(index)"
                >
                  <Cross1Icon class="w-3" />
                </button>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="mt-2 w-20 text-xs"
          @click="push({ value: '' })"
        >
          Add URL
        </Button>
      </FieldArray>
    </div> -->

    <div class="flex justify-start gap-2">
      <Button type="submit"> Update profile </Button>
      <Button type="button" variant="outline" @click="resetForm">
        Reset form
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { FieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const modelStore = useSettingsStore();
watchEffect(() => modelStore.getUser());
const user = computed(() => modelStore.user);

const profileFormSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    phone: z
      .string()
      .max(12, { message: "Phone number must not be longer than 12 digits." })
      .min(9, { message: "Bio must be at least 9 digits." })
      .optional(),
    email: z
      .string({
        required_error: "Please inpu an email to display.",
      })
      .email(),
    bio: z
      .string()
      .max(160, { message: "Bio must not be longer than 160 characters." })
      .min(4, { message: "Bio must be at least 2 characters." })
      .optional(),
    // urls: z
    //   .array(
    //     z.object({
    //       value: z.string().url({ message: "Please enter a valid URL." }),
    //     })
    //   )
    //   .optional(),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    username: user.value.username,
    phone: user.value.phone,
    email: user.value.email,
    bio: "I own a computer.",
    // urls: [
    //   { value: "https://shadcn.com" },
    //   { value: "http://twitter.com/shadcn" },
    // ],
  },
});

const onSubmit = handleSubmit(async (values: any) => {
  await modelStore.onUpdateProfile(values);
});

definePageMeta({
  layout: "settings",
  middleware: "auth",
});
useHead({
  title: "Profile",
});
</script>
