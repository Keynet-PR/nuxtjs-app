<template>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">Password Reset</h1>
    <p class="text-sm text-muted-foreground">Enter password To reset your account.</p>
  </div>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Password </Label>
          <Input
            v-model="form.password"
            placeholder="Password"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="password confirmation"> Password Confirmation </Label>
          <Input
            v-model="form.password_confirmation"
            placeholder="Password Confirmation"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          <span v-if="isLoading">Please wait</span>
          <span v-else>Reset </span>
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <Mail class="mr-2 h-4 w-4" /> Sign in with Gmail
    </Button>
  </div>
</template>
<script lang="ts" setup>
  import { Loader2, Mail } from "lucide-vue-next";
  import { useToast } from "@/components/ui/toast/use-toast";
  import { cn } from "@/lib/utils";
  import { useAuthStore } from "~/stores/useAuthStore";
  import { definePageMeta } from "#imports";

  const route = useRoute();

  const isLoading = ref(false);
  const auth = useAuthStore();
  const { toast } = useToast();

  const form = ref({
    token: route.params._token,
    email: route.query.email,
    password: "",
    password_confirmation: "",
  });

  async function onSubmit(event: Event) {
    event.preventDefault();
    isLoading.value = true;

    const { error, data } = await auth.passwordReset(form.value);
    if (!error.value) {
      isLoading.value = false;
      toast({
        description: data.value?.status,
      });
      navigateTo("/login", { replace: true });
    } else {
      isLoading.value = false;
      toast({
        description: error.value?.data?.message ?? "connection refused",
        variant: "destructive",
      });
    }
  }
  definePageMeta({
    middleware: ["guest"],
    layout: "auth",
  });
  useHead({
    title: "Password Reset",
    meta: [{ name: "description", content: "My amazing site." }],
  });
</script>
