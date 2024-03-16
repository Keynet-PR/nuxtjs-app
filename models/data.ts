import { h } from "vue";
import { Icon } from "#components";

const Cog6Tooth = h(Icon, { name: "heroicons:cog-6-tooth" });
const CheckCircledIcon = h(Icon, { name: "radix-icons:check-circled" });
const CrossCircledIcon = h(Icon, { name: "radix-icons:cross-circled" });
const CheckBadgeIcon = h(Icon, { name: "heroicons:check-badge" });
const EyeSlashIcon = h(Icon, { name: "heroicons:eye-slash" });

export const statuses = [
  {
    value: "Active",
    label: "Active",
    icon: h(CheckBadgeIcon),
  },
  {
    value: "Inactive",
    label: "Inactive",
    icon: h(EyeSlashIcon),
  },
  {
    value: "Suspended",
    label: "Suspended",
    icon: h(CrossCircledIcon),
  },
  {
    value: "Deleted",
    label: "Deleted",
    icon: h(CheckCircledIcon),
  },
];

export const roles = [
  {
    label: "Client",
    value: "Client",
    icon: h(Cog6Tooth),
  },
  {
    label: "Editor",
    value: "Editor",
    icon: h(Cog6Tooth),
  },
  {
    label: "Administrator",
    value: "Administrator",
    icon: h(Cog6Tooth),
  },
  {
    label: "Super Admin",
    value: "Super Admin",
    icon: h(Cog6Tooth),
  },
];

export const gateways = {
  Gateway: [
    {
      id: "1",
      name: "1s2u - 0.0500",
    },
    {
      id: "2",
      name: "khmer - 0.0500",
    },
  ],
  "Android Gateway": [
    {
      id: "3",
      name: "test",
    },
    {
      id: "4",
      name: "test android",
    },
  ],
};

export const select2_numbers = [
  {
    code: "0123456789",
    label: "0123456789",
  },
  {
    code: "7531555111",
    label: "7531555111",
  },
  {
    code: "8824243333",
    label: "8824243333",
  },
];

export const sms_gateways = [
  {
    id: "App\\Services\\Gateways\\OneSecToYou",
    name: "OneSecToYou",
  },
  {
    id: "App\\Services\\Gateways\\SkyLine",
    name: "SkyLine",
  },
  {
    id: "App\\Services\\Gateways\\Log",
    name: "Log (debug only)",
  },
  {
    id: "App\\Services\\Gateways\\PlasgateSmpp",
    name: "Plasgate SMPP",
  },
];

export const config_gateways = [
  {
    id: "allow_custom_sid",
    label: "Allow Custom SID",
  },
  {
    id: "smpp",
    label: "SMPP",
  },
  {
    id: "one_way_sms",
    label: "One Way Sms",
  },
] as const;

export const providers = [
  {
    id: "App\\Services\\Gateways\\Twilio",
    name: "Twilio",
  },
] as const;

export const numbers = [
  {
    id: "1",
    name: "+88512772882",
  },
  {
    id: "2",
    name: "+885969156896",
  },
  {
    id: "3",
    name: "+88515831198",
  },
];

export const delivery_statuses = [
  {
    code: "1",
    label: "Sent",
  },
  {
    code: "3",
    label: "Delivered",
  },
  {
    code: "2",
    label: "Failed",
  },
  {
    code: "8",
    label: "Pending",
  },
  {
    code: "6",
    label: "Rejected",
  },
  {
    code: "5",
    label: "Expired",
  },
  {
    code: "4",
    label: "Undelivered",
  },
];

export const dnsReportTypes = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "AAAA",
    label: "AAAA",
  },
  {
    value: "CNAME",
    label: "CNAME",
  },
  {
    value: "TXT",
    label: "TXT",
  },
  {
    value: "SRV",
    label: "SRV",
  },
  {
    value: "LOC",
    label: "LOC",
  },

  {
    value: "MX",
    label: "MX",
  },

  {
    value: "NS",
    label: "NS",
  },

  {
    value: "SPF",
    label: "SPF",
  },
  {
    value: "CERT",
    label: "CERT",
  },
  {
    value: "DNSKEY",
    label: "DNSKEY",
  },

  {
    value: "DS",
    label: "DS",
  },

  {
    value: "NAPTR",
    label: "NAPTR",
  },

  {
    value: "SMIMEA",
    label: "SMIMEA",
  },
  {
    value: "SSHFP",
    label: "SSHFP",
  },
  {
    value: "TLSA",
    label: "TLSA",
  },
  {
    value: "URI",
    label: "URI",
  },
];

export const recurrys = [
  {
    value: "hourly",
    label: "Hourly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
];

export const sending_units = [
  {
    value: "s",
    label: "Seconds",
  },
  {
    value: "m",
    label: "Minute",
  },
  {
    value: "h",
    label: "Hour",
  },
];

export const user_statuses = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 0,
    name: "Inactive",
  },
  {
    id: -2,
    name: "Suspended",
  },
];

export const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;