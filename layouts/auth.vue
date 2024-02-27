<template>
  <main class="h-screen w-screen lg:grid lg:grid-cols-2 lg:justify-between">
    <div class="hidden h-full bg-zinc-900 md:block">
      <div class="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div class="absolute inset-0 bg-zinc-900" />
        <div class="relative z-20 flex items-center text-lg font-medium">
          <AppLogo /> {{ $t("app_title") }}
        </div>
        <div class="relative z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-lg">
              &ldquo;Get the cheapest and the most affordable pricing with no setup fees or
              chargers,<br />
              no monthly or recurring fees, and no expiry date.&rdquo;
            </p>
            <footer class="text-sm">{{ $t("app_title") }}</footer>
          </blockquote>
        </div>
      </div>
    </div>
    <div class="flex h-full flex-col items-center justify-between bg-gray-50">
      <div class="flex w-full justify-between p-4">
        <div class="src-only"></div>
        <div>
          <Select v-model="language" @update:modelValue="hangeChange">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem v-for="(item, index) in languages" :key="index" :value="item.value">
                  {{ item.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="w-full px-12 lg:w-1/2">
        <slot />
        <div class="lg:p-8">
          <div class="mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
            <p class="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our
              <NuxtLink to="/terms" class="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </NuxtLink>
              and
              <NuxtLink to="/privacy" class="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </NuxtLink>
              .
            </p>
          </div>
        </div>
      </div>
      <!-- sr-only -->
      <div></div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const { locale, locales, setLocale } = useI18n();
  const languages = locales.value.map((item: any) => ({
    label: item.name,
    value: item.code,
  }));
  const { t } = useI18n();
  const language = ref("en");
  const hangeChange = () => {
    setLocale(language.value);
  };
</script>
