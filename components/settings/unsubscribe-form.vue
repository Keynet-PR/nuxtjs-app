<template>
  <form class="mt-4 space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Custom Keywords</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Keywords" />
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
        <FormDescription>
          <label for="">Default Unsubscribe Keywords</label>
          <div class="flext flex-row gap-2 p-2">
            <Badge>STOP</Badge>
            <Badge>UNSUB</Badge>
            <Badge>UNSUBSCRIBE</Badge>
            <Badge>CANCEL</Badge>
            <Badge>OPTOUT</Badge>
            <Badge>STOPALL</Badge>
            <Badge>END</Badge>
            <Badge>QUIT</Badge>
          </div>
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Opt out message</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder=" You have opted out successfully"
            v-bind="componentField"
          />
        </FormControl>
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
