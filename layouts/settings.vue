<template>
  <div class="h-screen">
    <div class="flex h-full flex-col">
      <AppHeader />
      <div class="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar />
        <main class="min-w-0 flex-1 xl:flex">
          <div class="w-full space-y-6 p-10 pb-16 md:block">
            <div class="space-y-0.5">
              <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
              <p class="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <Separator class="my-6" />
            <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside class="-mx-4 lg:w-1/5">
                <AppSidebarSetting />
              </aside>
              <div class="flex-1 lg:max-w-2xl">
                <div class="space-y-6">
                  <slot />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template> 

