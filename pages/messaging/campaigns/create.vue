<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="mx-3 mb-3 flex items-center justify-between" ref="create_campaign">
      <div class="flex flex-1 items-center space-x-2">
        <Card class="card-campaign w-full">
          <CardHeader class="flex-row">
            <AlignJustify class="mr-2" />
            New Campaign
          </CardHeader>
          <CardContent>
            <form class="max-w-4xl" @submit="onSubmit">
              <div class="mb-5">
                <label for="campaign-name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Campaign
                  Name</label>
                <input v-model="form.name" type="text" id="campaign-name" name="name"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              </div>
              <div class="mb-5">
                <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Message</label>
                <div id="sortableCards">
                  <div class="card card-button w-25 d-inline-flex">
                    <div class="card-body">
                      <MessageDialog @select-message="selectMessage" />
                      <draggable :list="selected_messages" :disabled="!enabled" item-key="id" class="list-message-group"
                        ghost-class="ghost" :empty-insert-threshold="100" @start="dragging = true" @end="updateItemOrder">
                        <template #item="{ element }">
                          <div
                            class="message-item relative flex w-96 flex-col rounded-xl border border-solid border-gray-300 bg-white bg-clip-border text-gray-700 shadow-md">
                            <div class="p-6">
                              <h5
                                class="text-blue-gray-900 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
                                {{ element.name }}
                              </h5>
                              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                {{ element.content }}
                              </p>
                            </div>
                            <div class="flex p-6 pt-0">
                              <span
                                class="stt mr-3 flex rounded-full bg-indigo-500 px-2 py-1 text-xl font-bold uppercase text-white">{{
                                  element.order_num }}</span>
                              <button @click="removeMessage(element.id)"
                                class="text-red ml-auto select-none rounded-lg text-center align-middle font-sans font-bold uppercase transition-all active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <Trash2 class="text-red-500" />
                              </button>
                            </div>
                          </div>
                        </template>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <label for="footer" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Footer</label>
                <input v-model="form.footer" type="text" id="footer" name="footer" placeholder="Enter unsubscribe footer"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              </div>
              <div class="mb-5">
                <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Message Rotation</label>
                <Select v-model="form.msg_rotation">
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select message rotation" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="round_robin">Round Robin</SelectItem>
                    <SelectItem value="sequential">Sequential</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="mb-5">
                <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Send To</label>
                <vSelect v-model="form.group_id" multiple :options="group_source" :reduce="(group) => group.code" />
              </div>
              <div class="mb-5">
                <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Gateway</label>
                <Select v-model="form.gateway">
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select gateway" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup v-for="(gateway_items, group_label) in gateways">
                      <SelectLabel class="text-mauve11 px-[25px] text-sm leading-[25px]">
                        {{ group_label }}
                      </SelectLabel>
                      <SelectItem v-for="gateway in gateway_items" :value="gateway.id">
                        {{ gateway.name }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="mb-5">
                <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Sender ID</label>
                <Select v-model="form.sender_id">
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select Sender ID" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Starbuck">Brand Name (Starbuck)</SelectItem>
                    <SelectItem value="RANDOM_SID">Random RSID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="mb-5">
                <label for="seeding_number"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Seeding</label>
                <input v-model="form.seeding_number" type="text" id="seeding_number" name="seeding_number"
                  placeholder="Enter phone number(s), separated by comma"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              </div>
              <div class="mb-5 flex items-center">
                <label for="seeding_every" class="block text-sm font-medium text-gray-900 dark:text-white">Send to seed
                  every</label>
                <input v-model="form.seeding_every" type="text" id="seeding_every" name="seeding_every"
                  class="w-100 ml-2 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
                <label class="ml-2 block text-sm font-medium text-gray-900 dark:text-white">SMS</label>
              </div>
              <div class="mt-3 flex flex-col space-y-2 sm:flex-row sm:justify-start sm:space-x-2 sm:space-y-0">
                <Button type="submit" :disabled="campaignStore.isLoading">
                  <Loader2 v-if="campaignStore.isLoading" class="mr-2 h-5 w-5 animate-spin text-white" />
                  <span v-if="campaignStore.isLoading">Sending</span>
                  <span v-else>Send</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import draggable from "vuedraggable";
let order_num = 0;
let message_id_arr = [];

export default {
  order: 0,
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      selected_messages: [],
      dragging: false,
    };
  },
  methods: {
    selectMessage: function (message) {
      let item = { id: message.id, name: message.name, content: message.content };
      if (!containsObject(item, this.selected_messages, "id")) {
        item["order_num"] = ++order_num;
        message_id_arr.push(item.id);
        this.selected_messages.push(item);
      }
    },
    removeMessage: function (id) {
      this.selected_messages = this.selected_messages.filter((obj) => obj.id !== id);
      this.updateItemOrder();
    },
    updateItemOrder: function () {
      message_id_arr = [];
      var items = this.selected_messages.map(function (item, index) {
        order_num = index + 1;
        item.order_num = order_num;
        message_id_arr.push(item.id);
        return { item: item, order: index };
      });
    },
  },
};

function containsObject(obj, list, field) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i][field] === obj[field]) {
      return true;
    }
  }

  return false;
}
</script>
<script lang="ts" setup>
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import { AlignJustify, Trash2, Loader2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref } from "vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MessageDialog from "@/components/message/dialog.vue";
// import vSelect from "vue-select";
import { gateways } from "@/models/data";

definePageMeta({
  breadcrumb: "Campaigns",
  middleware: ["auth"],
});

const { breadcrumbs } = useBreadcrumbs();
const campaignStore = useCampaignStore();
const traitForm = useTraitFormStore();
watchEffect(async () => await traitForm.getGroups());
const subscribers = computed(() => traitForm.groups);

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

const onSubmit = async (event: Event) => {
  event.preventDefault();
  form.value.messages = message_id_arr;
  await campaignStore.create(form.value);
};

let group_source = ref([]);
subscribers.value.forEach(function (subscriber) {
  group_source.value.push({
    code: subscriber.id,
    label: subscriber.name,
  });
});
</script>
<style>
.vs__dropdown-toggle {
  height: 40px;
}

.vs__deselect {
  margin-left: 7px;
}

.list-message-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.stt {
  height: 40px;
  width: 40px;
  line-height: 16px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
