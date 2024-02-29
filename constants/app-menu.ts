export const profileMenuOptions = [
  {
    name: "Profile",
    icon: "heroicons:question-mark-circle",
    path: "/settings/profile",
  },
  {
    name: "Billing",
    icon: "heroicons:currency-dollar",
    path: "/settings/billing",
  },
  {
    name: "Account",
    icon: "heroicons:cog-8-tooth",
    path: "/settings/account",
  },
  { divider: true },
];

export const menu = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "heroicons:home",
    path: "/",
  },
  {
    id: "subscribers",
    name: "Subscribers",
    icon: "heroicons:user-group",
    path: "/subscribers",
  },
  {
    name: "Keywords",
    icon: "heroicons:key",
    path: "/msg-keywords",
  },
  {
    id: "messaging",
    name: "Messaging",
    icon: "heroicons:envelope-open",
    items: [
      { name: "Messages", path: "/messaging/messages" },
      { name: "Campaigns", path: "/messaging/campaigns" },
    ],
  },

  {
    id: "inbox",
    name: "Inbox",
    icon: "heroicons:chat-bubble-bottom-center-text",
    path: "/inbox",
  },
  // {
  //   name: 'Auto Responder',
  //   icon: 'heroicons:rocket-launch',
  //   path: '/autoresponders',
  // },
  {
    id: "report",
    name: "Report",
    icon: "heroicons:chart-bar",
    path: "/report/subscribers",
  },
  {
    name: "settings",
    icon: "heroicons:cog-8-tooth",
    path: "/settings",
  },
  {
    id: "devices",
    name: "Devices",
    icon: "heroicons:device-phone-mobile",
    path: "/devices",
  },
  {
    id: "billing",
    name: "Billing",
    icon: "heroicons:currency-dollar",
    items: [
      { name: "Overview", path: "/billing/overview" },
      { name: "Usage", path: "/billing/usage" },
      { name: "Payment History", path: "/billing/payment-history" },
    ],
  },
  {
    id: "api-gateways",
    name: "API Gateways",
    icon: "heroicons:cube",
    items: [
      { name: "Accounts", path: "/api-gateways/accounts" },
      { name: "Gateways", path: "/api-gateways/gateways" },
    ],
  },
  {
    id: "system",
    name: "System",
    icon: "heroicons:circle-stack",
    slug: "system",
    open: true,
    items: [
      { name: "Users", path: "/system/users" },
      { name: "Roles", path: "/system/roles" },
      { name: "Sms Gateways", path: "/system/sms-gateways" },
      { name: "Subscribers", path: "/system/subscribers" },
      { name: "settings", path: "/system/settings" },
      { name: "Domains", path: "/system/domains" },
      { name: "Redeem Codes", path: "/system/redeem-codes" },
      { name: "Subscription Plans", path: "/system/subscription-plans" },
      { name: "Subscriptions", path: "/system/subscriptions" },
      { name: "Delivery Logs", path: "/system/delivery-logs" },
    ],
  },
];

export const sidebarNavItems = [
  {
    name: "Profile",
    path: "/settings/profile",
  },
  {
    name: "Account",
    path: "/settings/account",
  },
  {
    name: "Billing",
    path: "/settings/billing",
  },
  {
    name: "Appearance",
    path: "/settings/appearance",
  },
  {
    name: "Notifications",
    path: "/settings/notifications",
  },
  {
    name: "Display",
    path: "/settings/display-form",
  },
];

export const tabsReport = [
  {
    name: "Subscribers",
    path: "/report/subscribers",
  },
  {
    name: "Messages",
    path: "/report/messages",
  },
  {
    name: "Send Logs",
    path: "/report/send-logs",
  },
  {
    name: "Reply Logs",
    path: "/report/reply-logs",
  },
  {
    name: "Received Logs",
    path: "/report/received-logs",
  },
  {
    name: "Import Queue",
    path: "/report/import-queue",
  },
  {
    name: "Export Queue",
    path: "/report/export-queue",
  },
];
