import { string, z } from "zod";

export const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  group_id: z.number(),
  contacts: z.number(),
  client: z.string(),
  created_at: z.date(),
});
export type Group = z.infer<typeof groupSchema>;
export const unsubscriberSchema = z.object({
  id: z.number(),
  client_id: z.string(),
  phone: z.string(),
  created_at: z.date(),
});
export type Unsubscriber = z.infer<typeof unsubscriberSchema>;

export const contactSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  group_id: z.number(),
  phone: z.string(),
  email: z.string(),
});
export type Contact = z.infer<typeof contactSchema>;

export const msgKeywordSchema = z.object({
  id: z.number(),
  name: z.string(),
  group_id: z.number(),
  group_name: z.string(),
  auto_confirm_status: z.boolean(),
  confirm_message: z.string(),
});
export type MsgKeyword = z.infer<typeof msgKeywordSchema>;

export const deviceSchema = z.object({
  id: z.number(),
  device_id: z.string(),
  name: z.string(),
  phone: z.string(),
  gateway_group: z.string(),
  created_at: z.date(),
  active: z.boolean(),
});
export type Device = z.infer<typeof deviceSchema>;

export const androidGatewaySchema = z.object({
  id: z.number(),
  name: z.string(),
  gateway_id: z.string(),
  gateway_group: z.string(),
  send_cross_carrier: z.boolean(),
  devices_count: z.number(),
  created_at: z.date(),
});
export type AndroidGateway = z.infer<typeof androidGatewaySchema>;

export const messageSchema = z.object({
  id: z.number(),
  name: z.string(),
  content: z.string(),
  status: z.boolean(),
  created_at: z.date(),
});
export type Message = z.infer<typeof messageSchema>;

export const smsGatewaySchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  sender: z.string(),
  max_length_unicode: z.number(),
  username: z.string(),
  password: z.string(),
  max_length_ascii: z.number(),
  cost: z.number(),
  smpp: z.boolean(),
  allow_custom_sid: z.boolean(),
  one_way_sms: z.boolean(),
  bill_except: z.array(z.string()),
});

export type SmsGateway = z.infer<typeof smsGatewaySchema>;

export const apiAccountSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  created_at: z.string(),
  sender: z.string(),
});
export type ApiAccount = z.infer<typeof apiAccountSchema>;

export const apiGatewaySchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.date(),
  sender: z.string(),
  numbers: z.array(z.string()),
  one_way_sms: z.boolean(),
  sending_speed: z.array(z.string()),
});

export type ApiGateway = z.infer<typeof apiGatewaySchema>;

export const userSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  status: z.string(),
  status_icon: z.string(),
  status_label: z.string(),
  role_name: z.string(),
  brand_name: z.string(),
  company: z.string(),
  address: z.string(),
  avatar_url: z.string(),
  balance: z.number(),
  email_verified_at: z.date(),
});
export type User = z.infer<typeof userSchema>;

export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  permissions: z.object({}),
});
export type Role = z.infer<typeof roleSchema>;

export const statusSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Status = z.infer<typeof statusSchema>;

export const permissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  guard_name: z.string(),
});
export type Permission = z.infer<typeof permissionSchema>;

export const operatorSchema = z.object({
  id: z.number(),
  country_code: z.string(),
  name: z.string(),
  prefixes: z.array(z.string()),
  digits: z.array(z.string()),
  color: z.string(),
});
export type Operator = z.infer<typeof operatorSchema>;

export const globalBanListSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  added: z.string(),
});
export type GlobalBanList = z.infer<typeof globalBanListSchema>;

export const transltionSchema = z.object({
  id: z.number(),
  group: z.string(),
  key: z.string(),
  english: z.string(),
  khmer: z.string(),
  chinese: z.string(),
});
export type Translation = z.infer<typeof transltionSchema>;

export const domainSchema = z.object({
  id: z.string(),
  name: z.string(),
  name_servers: z.object({}),
  status: z.string(),
  type: z.string(),
});
export type Domain = z.infer<typeof domainSchema>;

export const dnsRecordSchema = z.object({
  id: z.string(),
  zone_id: z.string(),
  zone_name: z.string(),
  type: z.string({}),
  content: z.string(),
  proxiable: z.boolean(),
  proxied: z.boolean(),
  ttl: z.number(),
  locked: z.boolean(),
});
export type DnsRecord = z.infer<typeof dnsRecordSchema>;

export const redeemCodeSchema = z.object({
  id: z.number(),
  code: z.string(),
  redeemer: z.string(),
  amount: z.number().multipleOf(0.01),
  expiration_date: z.date(),
  redeemed_at: z.date(),
});
export type RedeemCode = z.infer<typeof redeemCodeSchema>;

export const subscriptionPlanSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  msg_quota: z.number(),
  sending_speed: z.string(),
  recurry: z.string(),
  created_at: z.date(),
  over_quota_price: z.object({}),
  quota_price: z.object({}),
});
export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>;

export const subscriptionSchema = z.object({
  id: z.number(),
  client: z.string(),
  plan: z.string(),
  charged: z.number().multipleOf(0.01),
  started_at: z.date(),
});
export type Subscription = z.infer<typeof subscriptionSchema>;

export const DeliveryLogSchema = z.object({
  id: z.number(),
  client: z.string(),
  gateway: z.string(),
  created_at: z.date(),
  recipient: z.string(),
  quantity: z.number(),
  sender: z.string(),
  campaign: z.string(),
  cost: z.number(),
  status: z.number(),
});
export type DeliveryLog = z.infer<typeof DeliveryLogSchema>;
