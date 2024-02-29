<template>
  <form class="mt-4 space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Brand Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="name of brand" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Timezone</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Timezone" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="email in verifiedEmails" :key="email" :value="email">
                {{ email }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="default_gateway">
      <FormItem>
        <FormLabel>Default Gateway</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Default Gateway" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="email in verifiedEmails" :key="email" :value="email">
                {{ email }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Snooze Time</FormLabel>
        <div class="flex items-center gap-4 space-x-2">
          <Switch id="airplane-mode" />
          <Input type="time" class="w-28" id="appt" min="09:00" max="18:00" />
        </div>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start gap-2">
      <Button type="submit"> Save Change</Button>
      <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { h, ref } from "vue";
  import { FieldArray, useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";

  import { cn } from "@/lib/utils";

  import { toast } from "@/components/ui/toast";

  const verifiedEmails = ref(["m@example.com", "m@google.com", "m@support.com"]);

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
      email: z
        .string({
          required_error: "Please select an email to display.",
        })
        .email(),
      bio: z
        .string()
        .max(160, { message: "Bio must not be longer than 160 characters." })
        .min(4, { message: "Bio must be at least 2 characters." }),
      urls: z
        .array(
          z.object({
            value: z.string().url({ message: "Please enter a valid URL." }),
          })
        )
        .optional(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: profileFormSchema,
    initialValues: {
      bio: "I own a computer.",
      urls: [{ value: "https://shadcn.com" }, { value: "http://twitter.com/shadcn" }],
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
