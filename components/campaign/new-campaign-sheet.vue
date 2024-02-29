<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">
        <Icon name="heroicons:squares-plus-20-solid" class="mr-1 h-4 w-4 text-gray-400" />
        New Campaign
      </Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>New Campaign</SheetTitle>
        <SheetDescription> This is how others will see you on the site. </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <form class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="campaign_name">
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="SMSgo, Get start 10 SMS a day."
                  v-bind="componentField"
                />
              </FormControl>
              <!-- <FormDescription>
                This is your public display name. It can be your real name or
                a pseudonym. You can only change this once every 30 days.
              </FormDescription> -->
              <FormMessage />
            </FormItem>
          </FormField>

          <div>
            <FieldArray v-slot="{ fields, push, remove }" name="messages">
              <div v-for="(field, index) in fields" :key="`messages-${field.key}`">
                <FormField v-slot="{ componentField }" :name="`messages[${index}].value`">
                  <FormItem>
                    <FormLabel :class="cn(index !== 0 && 'sr-only')"> Messages </FormLabel>
                    <!-- <FormDescription :class="cn(index !== 0 && 'sr-only')">
                      Add links to your website, blog, or social media profiles.
                    </FormDescription> -->
                    <div class="relative flex items-center">
                      <FormControl>
                        <Select v-bind="componentField">
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Message" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Starbuck"> Brand Name (Starbuck) </SelectItem>
                              <SelectItem value="RANDOM_SID"> Random RSID </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <button
                        type="button"
                        class="absolute end-0 py-2 pe-0 text-muted-foreground"
                        @click="remove(index)"
                      >
                        <Icon name="heroicons:x-mark-20-solid" class="w-4" />
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
                class="w-30 mt-2 text-xs"
                @click="push({ value: '' })"
              >
                Add Message
              </Button>
            </FieldArray>
          </div>

          <FormField v-slot="{ componentField }" name="msg_rotation">
            <FormItem>
              <FormLabel>Message Rotation</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Message Rotation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="round_robin"> Round Robin </SelectItem>
                    <SelectItem value="sequential"> Sequential </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Send To</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Send To" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Starbuck"> Brand Name (Starbuck) </SelectItem>
                    <SelectItem value="RANDOM_SID"> Random RSID </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="gateway">
            <FormItem>
              <FormLabel>Gateway</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gateway" />
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
            <FormField v-slot="{ componentField }" name="sender_id">
              <FormItem>
                <FormLabel>Sender ID</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sender ID" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Starbuck"> Brand Name (Starbuck) </SelectItem>
                      <SelectItem value="RANDOM_SID"> Random RSID </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </FormField>
          </FormField>

          <FormField v-slot="{ componentField }" name="seeding_number">
            <FormItem>
              <FormLabel>Seeding</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter phone number(s), separated by comma"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="seeding_every">
            <FormItem>
              <FormLabel>Send to seed every(SMS)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex justify-start gap-2">
            <Button type="submit"> Send </Button>
            <Button type="button" variant="outline" @click="resetForm"> Reset form </Button>
          </div>
        </form>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
  import { h, ref } from "vue";
  import { FieldArray, useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useToast } from "@/components/ui/toast/use-toast";
  const { toast } = useToast();
  import * as z from "zod";
  import { cn } from "@/lib/utils";

  const verifiedEmails = ref(["m@example.com", "m@google.com", "m@support.com"]);

  const form: Ref = ref({
    name: "",
    messages: [],
    footer: "",
    msg_rotation: "",
    group_id: [],
    gateway: "",
    sender_id: "",
    seeding_number: "",
    seeding_every: "",
  });

  const formSchema = toTypedSchema(
    z.object({
      campaign_name: z
        .string()
        .min(2, {
          message: "Campaign must be at least 2 characters.",
        })
        .max(30, {
          message: "Campaign must not be longer than 30 characters.",
        }),
      messages: z.array(z.object({})).optional(),
      sender_id: z.string({
        required_error: "Please select an Sender ID to display.",
      }),
      msg_rotation: z.string({
        required_error: "Please select an msg rotation to display.",
      }),
      gateway: z.string({
        required_error: "Please select an Gateway to display.",
      }),
      seeding_number: z.string(),
      seeding_every: z.string({
        required_error: "Seeding Every select an email to display.",
      }),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
      campaign_name: "",
      messages: [],
      sender_id: "",
      msg_rotation: "",
      seeding_number: "",
      seeding_every: "0",
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
