<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button class="h-8 w-8 p-0" variant="secondary">
        <Icon name="radix-icons:plus" class="h-4 w-4 text-gray-400" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" class="sm:max-w-[525px]">
      <SheetHeader>
        <SheetTitle>New Campaign</SheetTitle>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <form class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Campaign</FormLabel>
              <FormControl>
                <Input type="text" placeholder="campaign" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <draggable
            v-model="messages"
            :disabled="!enabled"
            class="list-group"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <div>{{ element.name }}</div>
            </template>
          </draggable>

          <div>
            <FieldArray v-slot="{ fields, push, remove }" name="message_ids">
              <div v-for="(field, index) in fields" :key="`message_ids-${field.key}`">
                <FormField v-slot="{ componentField }" :name="`message_ids[${index}].id`">
                  <FormItem>
                    <FormLabel :class="cn(index !== 0 && 'sr-only')">
                      Messages
                    </FormLabel>
                    <div class="border rounded-md px-2 py-1">
                      <div class="flex justify-end gap-2 items-center">
                        <Badge>1</Badge>
                        <FormControl>
                          <Select v-bind="componentField">
                            <SelectTrigger class="h-7">
                              <SelectValue placeholder="Select a message" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem
                                  v-for="message in messages"
                                  :value="message.id"
                                >
                                  <p>{{ message.name }}</p>
                                  <p class="text-xs text-gray-600">
                                    {{ message.content }}
                                  </p>
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <Button
                          class="text-muted-foreground"
                          variant="ghost"
                          size="icon"
                          @click="remove(index)"
                        >
                          <Icon name="radix-icons:trash" class="w-5 h-5" />
                        </Button>
                      </div>
                      <!-- <FormDescription>
                        Add messages to your campaign.
                      </FormDescription> -->
                    </div>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                class="mt-2 w-28 text-xs"
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
          <FormField v-slot="{ componentField }" name="group_id">
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
                    <SelectItem v-for="group in groups" :value="group.id">
                      {{ group.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="gateway_id">
            <FormItem>
              <FormLabel>API Gateway</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select API Gateway" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="api in apiGateways" :value="api.id">
                      {{ api.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="sender_id" v-model="sender_id">
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
                    <SelectItem v-for="sender_id in sender_ids" :value="sender_id.id">
                      {{ sender_id.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="rand_sid_len"
            v-if="sender_id == 'RANDOM_SID'"
          >
            <FormItem>
              <FormLabel>Randomly Set</FormLabel>
              <div class="grid grid-cols-2 items-center gap-2">
                <FormControl>
                  <Input type="number" v-bind="componentField" />
                </FormControl>
                <FormDescription> Digits Sender ID </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
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
              <FormLabel>Send to seed every</FormLabel>
              <div class="grid grid-cols-2 items-center gap-2">
                <FormControl>
                  <Input type="number" placeholder="0" v-bind="componentField" />
                </FormControl>
                <FormDescription class="w-36"> SMS </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex justify-start gap-2">
            <Button type="submit"> Send </Button>
            <Button type="button" variant="outline" @click="resetForm">
              Reset form
            </Button>
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
import { formatRelative, subDays } from "date-fns";
const { toast } = useToast();
import * as z from "zod";
import { cn } from "@/lib/utils";
// import draggable from "vuedraggable";
import { storeToRefs } from "pinia";
let id = 1;

const enabled = ref(true);
const dragging = ref(false);

const list = ref([
  { name: "John 1", id: 0 },
  { name: "Joao 2", id: 1 },
  { name: "Jean 3", id: 2 },
]);

const traitForm = useTraitFormStore();
const { messages, groups, sender_ids } = storeToRefs(traitForm);

watchEffect(() => traitForm.getMessages());
watchEffect(() => traitForm.getGroups());
watchEffect(() => traitForm.getApiGateways());
watchEffect(() => traitForm.getSettings());

// const messages = computed(() => traitForm.messages);

const latest_message = computed(() => traitForm.messages);
// const groups = computed(() => traitForm.groups);
const apiGateways = computed(() => traitForm.apiGateways);
const default_gateway = computed(() => traitForm.settings?.default_gateway);
// const sender_ids = computed(() => traitForm.sender_ids);
const sender_id = ref<string>("RANDOM_SID");

const form = ref({
  name: "Campiagn " + formatRelative(subDays(new Date(), 3), new Date()),
  message_ids: latest_message.value,
  msg_rotation: "round_robin",
  sender_id: sender_id,
  rand_sid_len: 3,
  gateway_id: default_gateway,
  seeding_number: "+88512772882,+88515831198",
  seeding_every: 10,
});

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2, {
        message: "Campaign must be at least 2 characters.",
      })
      .max(50, {
        message: "Campaign must not be longer than 30 characters.",
      }),
    message_ids: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    ),
    group_id: z.number({
      required_error: "Please select an Sender ID.",
    }),
    msg_rotation: z.string({
      required_error: "Please select an msg rotation.",
    }),
    gateway_id: z.number(),
    sender_id: z.string(),
    rand_sid_len: z
      .number()
      .min(2, {
        message: "RAMD SID must be at least 2 digits.",
      })
      .max(9, {
        message: "RAMD SID must not be longer than 9 digits.",
      })
      .optional(),
    seeding_number: z.string().optional(),
    seeding_every: z
      .number({
        required_error: "Seeding Every needs to input number.",
      })
      .optional(),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: form.value,
});
const emit = defineEmits(["onSubmit", "onClose", "onSend"]);
const onSubmit = handleSubmit((values) => {
  let form = {
    name: values.name,
    message_ids: values.message_ids.map((message) => message.id),
    msg_rotation: values.msg_rotation,
    sender_id: values.sender_id,
    group_id: [values.group_id],
    rand_sid_len: values.rand_sid_len ?? 0,
    seeding_number: values.seeding_number,
    seeding_every: values.seeding_every,
  };
  emit("onSubmit", form);
});
</script>
