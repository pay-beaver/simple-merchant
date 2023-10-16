export type SubscriptionStatus =
  | "terminated"
  | "expired"
  | "pending"
  | "active";

export interface Subscription {
  isActive: boolean;
  subscriptionId: string;
  startTimestamp: number;
  nextPaymentAt: number;
}
