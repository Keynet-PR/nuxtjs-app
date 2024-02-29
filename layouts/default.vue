<template>
  <div class="h-screen">
    <div class="flex h-full flex-col">
      <AppHeader />
      <div class="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar />
        <main class="min-w-0 flex-1 xl:flex">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
