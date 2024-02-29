<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
        <Icon name="heroicons:qr-code" class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Download Sms Gateway App</DialogTitle>
        <DialogDescription>
          Anyone will be able to download sms gateway app this.
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <img src="/download-sms-gateway-app.png" alt="download sms gateway-app" />
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup></script>

<style></style>
