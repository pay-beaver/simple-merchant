import {
  MyMerchantAddress,
  ServerUrl,
} from "./constants";
import { Subscription } from "./types";

export async function getSubscriptionsByUserId(
  userId: string
): Promise<Subscription[]> {
  const response = await fetch(
    `${ServerUrl}/subscriptions/merchant/${MyMerchantAddress}/userid/${userId}`
  );

  if (response.status === 404) return [];

  const result: any[] = await response.json();

  return result.map((rawSub) => ({
    isActive: rawSub.is_active,
    subscriptionId: rawSub.subscription_id,
    startTimestamp: rawSub.start_ts,
    nextPaymentAt: rawSub.next_payment_at,
  }));
}
